'use client'

import React, { createRef, useState } from 'react'
import { MUSIC_SOURCES, orZero } from './audio-section'
import { useContentPair, useLightPush, useWaku } from '@waku/react'

import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { LightNode, PageDirection, createDecoder } from '@waku/sdk'
import { getLastUrlPart } from './game-canvas-wrapper'
import { useMessages, useNodePeers, usePeers } from '../chat/hooks'

type Props = {
  address: string
}

export default function AudioSectionListener({ address }: Props) {
  if (address == null) {
    return <></>
  }

  console.log(address)

  const [musicId, setMusicId] = useState('1')

  const player = createRef()
  const musicSource = MUSIC_SOURCES.get(musicId)

  const { node } = useWaku<LightNode>()

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

  const startTime = new Date()
  // Only retrieve a week of history
  startTime.setTime(Date.now() - 1000 * 60 * 60 * 24 * 7)
  const endTime = new Date()

  const contentTopic = `/music/event/1`

  const decoder = createDecoder(contentTopic)
  const [messages, pushLocalMessages] = useMessages({
    node,
    decoder,
    options: {
      pageSize: 5,
      pageDirection: PageDirection.FORWARD,
      timeFilter: {
        startTime,
        endTime,
      },
    },
  })

  if (lightPushPeersLength == 0) {
    return <p>Loading </p>
  }

  console.log('READING MESSAGES FOR AUDIO')
  console.log(messages)

  return (
    <AudioPlayer
      ref={player}
      className="max-w-xs rounded-xl bg-cyan-500"
      loop
      hasDefaultKeyBindings={false}
      showJumpControls={false}
      showSkipControls={false}
      showFilledVolume={false}
      showFilledProgress={false}
      src={musicSource}
      onPlay={(e) => console.log('onPlay')}
    />
  )
}
