import { Request, RequestInit, Response } from 'node-fetch'
import { pipe } from '@doge/helpers'
import { fetchGet } from '@doge/fetch'

export const request = pipe(fetchGet)
