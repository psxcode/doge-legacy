

function checkForErrors (error: any, body: string) {
  let match: any

  // Pure request error (bad connection, wrong url, etc)
  if (error) {
    return { errorType: 0, error: error }
  }

  // Finding captcha
  if (body.indexOf('why_captcha') !== -1 || /cdn-cgi\/l\/chk_captcha/i.test(body)) {
    return { errorType: 1 }
  }

  // trying to find '<span class="cf-error-code">1006</span>'
  match = body.match(/<\w+\s+class="cf-error-code">(.*)<\/\w+>/i)

  if (match) {
    return { errorType: 2, error: parseInt(match[1], 10) }
  }

  return false
}

function giveResults (options, error: any, response, body, callback) {
  if (typeof options.realEncoding === 'string') {
    callback(error, response, body.toString(options.realEncoding))
  } else {
    callback(error, response, body)
  }
}

function setCookieAndReload (response, body, options, callback) {
  var challenge = body.match(/S='([^']+)'/)
  var makeRequest = requestMethod(options.method)

  if (!challenge) {
    return callback({ errorType: 3, error: 'I cant extract cookie generation code from page' }, body, response)
  }

  var base64EncodedCode = challenge[1]
  var cookieSettingCode = new Buffer(base64EncodedCode, 'base64').toString('ascii')

  var sandbox = {
    location: {
      reload: function () {
      }
    },
    document: {}
  }
  vm.runInNewContext(cookieSettingCode, sandbox)
  try {
    jar.setCookie(sandbox.document.cookie, response.request.uri.href, { ignoreError: true })
  } catch (err) {
    return callback({ errorType: 3, error: 'Error occurred during evaluation: ' + err.message }, body, response)
  }

  makeRequest(options, function (error, response, body) {
    if (error) {
      return callback({ errorType: 0, error: error }, response, body)
    }
    giveResults(options, error, response, body, callback)
  })
}

function performRequest (options, callback) {
  var method

  makeRequest(options, function (error, response, body) {
    var validationError
    var stringBody

    stringBody = body.toString('utf8')

    // If body contains specified string, solve challenge
    if (stringBody.indexOf('a = document.getElementById(\'jschl-answer\');') !== -1) {
      setTimeout(function () {
        return solveChallenge(response, stringBody, options, callback)
      }, Timeout)
    } else if (stringBody.indexOf('You are being redirected') !== -1 ||
      stringBody.indexOf('sucuri_cloudproxy_js') !== -1) {
      setCookieAndReload(response, stringBody, options, callback)
    } else {
      // All is good
      giveResults(options, error, response, body, callback)
    }
  })
}

function solveChallenge(response, body, options, callback) {
  var challenge = body.match(/name="jschl_vc" value="(\w+)"/),
    host = response.request.host,
    makeRequest = requestMethod(options.method),
    jsChlVc,
    answerResponse,
    answerUrl;

  if (!challenge) {
    return callback({errorType: 3, error: 'I cant extract challengeId (jschl_vc) from page'}, body, response);
  }

  jsChlVc = challenge[1];

  challenge = body.match(/getElementById\('cf-content'\)[\s\S]+?setTimeout.+?\r?\n([\s\S]+?a\.value =.+?)\r?\n/i);

  if (!challenge) {
    return callback({errorType: 3, error: 'I cant extract method from setTimeOut wrapper'}, body, response);
  }

  challenge_pass = body.match(/name="pass" value="(.+?)"/)[1];

  challenge = challenge[1];

  challenge = challenge.replace(/a\.value =(.+?) \+ .+?;/i, '$1');

  challenge = challenge.replace(/\s{3,}[a-z](?: = |\.).+/g, '');
  challenge = challenge.replace(/'; \d+'/g, '');

  try {
    answerResponse = {
      'jschl_vc': jsChlVc,
      'jschl_answer': (eval(challenge) + response.request.host.length),
      'pass': challenge_pass
    };
  } catch (err) {
    return callback({errorType: 3, error: 'Error occurred during evaluation: ' +  err.message}, body, response);
  }

  answerUrl = response.request.uri.protocol + '//' + host + '/cdn-cgi/l/chk_jschl';

  options.headers['Referer'] = response.request.uri.href; // Original url should be placed as referer
  options.url = answerUrl;
  options.qs = answerResponse;

  // Make request with answer
  makeRequest(options, function(error, response, body) {
    if(error) {
      return callback({ errorType: 0, error: error }, response, body);
    }

    if(response.statusCode === 302) { //occurrs when posting. request is supposed to auto-follow these
      //by default, but for some reason it's not
      options.url = response.headers.location;
      delete options.qs;
      makeRequest(options, function(error, response, body) {
        giveResults(options, error, response, body, callback);
      });
    } else {
      giveResults(options, error, response, body, callback);
    }
  });
}
