/* tslint:disable comment-format */
import { ResponseInit } from 'node-fetch'
///<reference types="node-fetch" />

declare module 'node-fetch' {
  export interface ResponseInit {
    url?: string
  }
}
