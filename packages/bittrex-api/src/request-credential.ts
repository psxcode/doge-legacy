import { Request, RequestInit, Response } from 'node-fetch'
import { compose } from '@doge/helpers'
import { fetchGet, fetchApikey } from '@doge/fetch'
import { nonce } from './nonce'
import { fetchApisign } from '../../fetch/src'
import { hash } from './hash'
import { ICredentialApiInit } from './types'

export const request = (opts: ICredentialApiInit) =>
  compose(fetchGet, fetchApikey(opts.apikey, nonce), fetchApisign(hash(opts.apisecret)))
