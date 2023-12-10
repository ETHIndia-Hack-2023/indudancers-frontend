//@ts-nocheck

import { encodeMessage, decodeMessage, message } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'
import type { Codec } from 'protons-runtime'

export interface UserMusicEvent {
  timestamp: bigint
  musicOffset: bigint
  address: string
  musicLink: string
}

export namespace UserMusicEvent {
  let _codec: Codec<UserMusicEvent>

  export const codec = (): Codec<UserMusicEvent> => {
    if (_codec == null) {
      _codec = message<UserMusicEvent>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if (opts.writeDefaults === true || obj.timestamp !== 0n) {
          w.uint32(8)
          w.int64(obj.timestamp)
        }

        if (opts.writeDefaults === true || obj.musicOffset !== 0n) {
          w.uint32(16)
          w.int64(obj.musicOffset)
        }

        if (opts.writeDefaults === true || obj.address !== '') {
          w.uint32(26)
          w.string(obj.address)
        }

        if (opts.writeDefaults === true || obj.musicLink !== '') {
          w.uint32(34)
          w.string(obj.musicLink)
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length) => {
        const obj: any = {
          timestamp: 0n,
          musicOffset: 0n,
          address: '',
          musicLink: ''
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1:
              obj.timestamp = reader.int64()
              break
            case 2:
              obj.musicOffset = reader.int64()
              break
            case 3:
              obj.address = reader.string()
              break
            case 4:
              obj.musicLink = reader.string()
              break
            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return obj
      })
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
