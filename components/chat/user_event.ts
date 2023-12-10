import { utf8ToBytes, bytesToUtf8 } from '@waku/sdk'
import * as proto from './proto/user_events'

/**
 * ChatMessage is used by the various show case waku apps that demonstrates
 * waku used as the network layer for chat group applications.
 *
 * This is included to help building PoC and MVPs. Apps that aim to be
 * production ready should use a more appropriate data structure.
 */
export class UserEvent {
  public constructor(public proto: proto.UserMusicEvent) {}

  /**
   * Create Chat Message with a utf-8 string as payload.
   */

  static fromUtf8String(
    timestamp: number,
    musicOffset: number,
    address: string,
    musicLink: string
  ): UserEvent {
    return new UserEvent({
      musicLink: musicLink,
      timestamp: BigInt(timestamp),
      address: address,
      musicOffset: BigInt(musicOffset),
    })
  }

  /**
   * Decode a protobuf payload to a ChatMessage.
   * @param bytes The payload to decode.
   */
  static decode(bytes: Uint8Array): UserEvent {
    const protoMsg = proto.UserMusicEvent.decode(bytes)
    return new UserEvent(protoMsg)
  }

  /**
   * Encode this ChatMessage to a byte array, to be used as a protobuf payload.
   * @returns The encoded payload.
   */
  encode(): Uint8Array {
    return proto.UserMusicEvent.encode(this.proto)
  }

  get timestamp(): Date {
    return new Date(Number(BigInt(this.proto.timestamp)))
  }

  get musicOffset(): number {
    return Number(BigInt(this.proto.musicOffset))
  }

  get userAddress(): string {
    return this.proto.address
  }

  get musicLink(): string {
    return this.proto.musicLink
  }
}
