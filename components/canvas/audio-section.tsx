import { useContentPair, useLightPush, useWaku } from '@waku/react'
import React, { createRef, useState } from 'react'
import { useNodePeers, usePeers } from '../chat/hooks'
import { createEncoder, createDecoder } from '@waku/sdk'
import { MusicMessage } from '../chat/music_message'

import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { LightNode } from '@waku/sdk'

export const MUSIC_SOURCES = new Map([
  [
    '1',
    'https://gateway.lighthouse.storage/ipfs/QmPbVM5hKEGNsRngmpx1XqyT2ZeuDn3UpZSSwof9hqqvtk',
  ],
  [
    '2',
    'https://gateway.lighthouse.storage/ipfs/QmfXURf26bP1P3mB5YkC71e7EgXQJgoSBPog4kDbzWmr5x',
  ],
  ['3', 'bobby hadz'],
  ['4', 'bobby hadz'],
])

type Props = {
  address: string
}

export default function AudioSection({ address }: Props) {
  if (address == null) {
    return <></>
  }

  const [musicId, setMusicId] = useState('1')

  const player = createRef()
  const musicSource = MUSIC_SOURCES.get(musicId)

  const contentTopic = `/music/event/${address}`

  const { node } = useWaku<LightNode>()
  const encoder = createEncoder({ contentTopic })
  const decoder = createDecoder(contentTopic)
  const { push: onPush } = useLightPush({ node, encoder })

  const {
    connectedBootstrapPeers,
    connectedPeerExchangePeers,
    discoveredBootstrapPeers,
    discoveredPeerExchangePeers,
  } = useNodePeers(node)
  const { allConnected, storePeers, filterPeers, lightPushPeers } = usePeers({
    node,
  })

  const lightPushPeersLength = orZero(lightPushPeers?.length)

  if (onPush === undefined) {
    return <p>Loading </p>
  }

  if (lightPushPeersLength == 0) {
    return <p>Loading </p>
  }

  const onSend = async () => {
    if (!onPush) {
      return
    }

    try {
      console.log('PUSH')
      console.log(player.current.audio.current)
      console.log(address)
      const musicOffset = 1
      const timestamp = new Date()
      const chatMessage = MusicMessage.fromUtf8String(
        timestamp,
        musicSource as string,
        address,
        musicOffset
      )

      const payload = chatMessage.encode()

      await onPush({ payload, timestamp })
    } catch (e) {
      console.log('ERROR: ' + e)
    }
  }

  return (
    <div>
      <Select
        onValueChange={(e) => {
          console.log(e)
          setMusicId(e)
          onSend()
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Song" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Avicii - Levels</SelectItem>
          <SelectItem value="2">Gangnam Style</SelectItem>
          <SelectItem value="3">System</SelectItem>
          <SelectItem value="4">System</SelectItem>
        </SelectContent>
      </Select>
      <AudioPlayer
        ref={player}
        className="max-w-xs rounded-xl bg-cyan-500"
        autoPlay
        loop
        hasDefaultKeyBindings={false}
        showJumpControls={false}
        showSkipControls={false}
        showFilledVolume={false}
        showFilledProgress={false}
        src={musicSource}
        onPlay={(e) => console.log('onPlay')}
      />
    </div>
  )
}

export function orZero(value: undefined | number): number {
  return value || 0
}
