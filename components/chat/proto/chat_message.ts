//@ts-nocheck
import { encodeMessage, decodeMessage, message } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'
import type { Codec } from 'protons-runtime'

export interface ChatMessage {
  timestamp: bigint
  nick: string
  address: string
  payload: Uint8Array
}

export namespace ChatMessage {
  let _codec: Codec<ChatMessage>

  export const codec = (): Codec<ChatMessage> => {
    if (_codec == null) {
      _codec = message<ChatMessage>(
        (obj, w, opts = {}) => {
          if (opts.lengthDelimited !== false) {
            w.fork()
          }

          if (opts.writeDefaults === true || obj.timestamp !== 0n) {
            w.uint32(8)
            w.uint64(obj.timestamp)
          }

          if (opts.writeDefaults === true || obj.nick !== '') {
            w.uint32(18)
            w.string(obj.nick)
          }

          if (opts.writeDefaults === true || obj.address !== '') {
            w.uint32(26)
            w.string(obj.address)
          }

          if (
            opts.writeDefaults === true ||
            (obj.payload != null && obj.payload.byteLength > 0)
          ) {
            w.uint32(34)
            w.bytes(obj.payload)
          }

          if (opts.lengthDelimited !== false) {
            w.ldelim()
          }
        },
        (reader, length) => {
          const obj: any = {
            timestamp: 0n,
            nick: '',
            address: '',
            payload: new Uint8Array(0),
          }

          const end = length == null ? reader.len : reader.pos + length

          while (reader.pos < end) {
            const tag = reader.uint32()

            switch (tag >>> 3) {
              case 1:
                obj.timestamp = reader.uint64()
                break
              case 2:
                obj.nick = reader.string()
                break
              case 3:
                obj.address = reader.string()
                break
              case 4:
                obj.payload = reader.bytes()
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

  export const encode = (obj: ChatMessage): Uint8Array => {
    return encodeMessage(obj, ChatMessage.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): ChatMessage => {
    return decodeMessage(buf, ChatMessage.codec())
  }
}
