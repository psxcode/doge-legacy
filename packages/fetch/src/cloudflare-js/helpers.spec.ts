import { expect } from 'chai'
import {
  evalChallenge,
  getChallengeId, getChallengeMethod, getChallengePass, isJsChallenge,
  modifyChallengeMethod
} from './helpers'

const jschlVc = '3d82bdba5ecd9e7620b75e9edff1213d'
const pass = '1513593747.084-w+EhjeUrks'
const form = `
<form id="challenge-form" action="/cdn-cgi/l/chk_jschl" method="get">
  <input type="hidden" name="jschl_vc" value="${jschlVc}"/>
  <input type="hidden" name="pass" value="${pass}"/>
  <input type="hidden" id="jschl-answer" name="jschl_answer"/>
</form>
`
const challengeMethodRaw = `(function(){
var a = function() {try{return !!window.addEventListener} catch(e) {return !1} },
b = function(b, c) {a() ? document.addEventListener("DOMContentLoaded", b, c) : document.attachEvent("onreadystatechange", b)};
b(function(){
var a = document.getElementById('cf-content');a.style.display = 'block';
setTimeout(function(){
var s,t,o,p,b,r,e,a,k,i,n,g,f, ZsFepQr={"Fn":+((!+[]+!![]+!![]+[])+(!+[]+!![]+!![]+!![]+!![]+!![]+!![]+!![]))};
t = document.createElement('div');
t.innerHTML="<a href='/'>x</a>";
t = t.firstChild.href;r = t.match(/https?:\\/\\//)[0];
t = t.substr(r.length); t = t.substr(0,t.length-1);
a = document.getElementById('jschl-answer');
f = document.getElementById('challenge-form');
;ZsFepQr.Fn*=!+[]+!![]+!![];a.value = parseInt(ZsFepQr.Fn, 10) + t.length; '; 121'
f.action += location.hash;
f.submit();
}, 4000);
}, false);
})();`

const challengeMethodExtracted = `var s,t,o,p,b,r,e,a,k,i,n,g,f, ZsFepQr={"Fn":+((!+[]+!![]+!![]+[])+(!+[]+!![]+!![]+!![]+!![]+!![]+!![]+!![]))};
t = document.createElement('div');
t.innerHTML="<a href='/'>x</a>";
t = t.firstChild.href;r = t.match(/https?:\\/\\//)[0];
t = t.substr(r.length); t = t.substr(0,t.length-1);
a = document.getElementById('jschl-answer');
f = document.getElementById('challenge-form');
;ZsFepQr.Fn*=!+[]+!![]+!![];a.value = parseInt(ZsFepQr.Fn, 10) + t.length; '; 121'`

const challengeMethodModified = `var s,t,o,p,b,r,e,a,k,i,n,g,f, ZsFepQr={"Fn":+((!+[]+!![]+!![]+[])+(!+[]+!![]+!![]+!![]+!![]+!![]+!![]+!![]))};
;ZsFepQr.Fn*=!+[]+!![]+!![];parseInt(ZsFepQr.Fn, 10) `

describe('[ helpers ]', () => {

  describe('[ helpers / isJsChallenge ]', () => {
    it('should return true if challenge found', () => {
      expect(isJsChallenge(challengeMethodRaw)).eq(true)
    })
  })

  describe('[ helpers / getChallengeId ]', () => {
    it('should find jschl_vc', () => {
      expect(getChallengeId(form)).eq(jschlVc)
    })
  })

  describe('[ helpers / getChallengePass ]', () => {
    it('should find pass', () => {
      expect(getChallengePass(form)).eq(pass)
    })
  })

  describe('[ helpers / getChallengeMethod ]', () => {
    it('should find challenge method', () => {
      expect(getChallengeMethod(challengeMethodRaw)).eq(challengeMethodExtracted)
    })
  })

  describe('[ helpers / modifyChallengeMethod ]', () => {
    it('should modify challenge method', () => {
      expect(modifyChallengeMethod(challengeMethodExtracted)).eq(challengeMethodModified)
    })
  })

  describe('[ helpers / evalChallenge ]', () => {
    it('should execute challenge method', () => {
      expect(evalChallenge(challengeMethodModified)).eq(114)
    })
  })
})
