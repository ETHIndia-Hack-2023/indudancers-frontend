'use client'

//@ts-nocheck

import { encodeMessage, decodeMessage, message } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'
import type { Codec } from 'protons-runtime'

export interface UserMusicEvent {
  address: string
  musicLink: string
  timestamp: string
  musicOffset: string
}

export namespace UserMusicEvent {
  let _codec: Codec<UserMusicEvent>

  export const codec = (): Codec<UserMusicEvent> => {
    if (_codec == null) {
      _codec = message<UserMusicEvent>(
        (obj, w, opts = {}) => {
          if (opts.lengthDelimited !== false) {
            w.fork()
          }

          if (opts.writeDefaults === true || obj.address !== '') {
            w.uint32(10)
            w.string(obj.address)
          }

          if (opts.writeDefaults === true || obj.musicLink !== '') {
            w.uint32(18)
            w.string(obj.musicLink)
          }

          if (opts.writeDefaults === true || obj.timestamp !== '') {
            w.uint32(26)
            w.string(obj.timestamp)
          }

          if (opts.writeDefaults === true || obj.musicOffset !== '') {
            w.uint32(34)
            w.string(obj.musicOffset)
          }

          if (opts.lengthDelimited !== false) {
            w.ldelim()
          }
        },
        (reader, length) => {
          const obj: any = {
            address: '',
            musicLink: '',
            timestamp: '',
            musicOffset: '',
          }

          const end = length == null ? reader.len : reader.pos + length

          while (reader.pos < end) {
            const tag = reader.uint32()

            switch (tag >>> 3) {
              case 1:
                obj.address = reader.string()
                break
              case 2:
                obj.musicLink = reader.string()
                break
              case 3:
                obj.timestamp = reader.string()
                break
              case 4:
                obj.musicOffset = reader.string()
                break
              default:
                reader.skipType(tag & 7)
                break
            }
          }

          return obj
        }
      )
    }

    return _codec
  }

  export const encode = (obj: UserMusicEvent): Uint8Array => {
    return encodeMessage(obj, UserMusicEvent.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): UserMusicEvent => {
    return decodeMessage(buf, UserMusicEvent.codec())
  }
}
