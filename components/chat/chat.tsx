'use client'

import handleCommand from './command'
import Room from './Room'
import { Message } from './Message'
import { PageDirection, LightNode } from '@waku/interfaces'

import { useWaku, useContentPair } from '@waku/react'

import { useMessages, usePersistentNick } from './hooks'
import { useAccount, useConnect } from 'wagmi'

const startTime = new Date()
// Only retrieve a week of history
startTime.setTime(Date.now() - 1000 * 60 * 60 * 24 * 7)
const endTime = new Date()

export default function Chat() {
  const { node } = useWaku<LightNode>()
  const { decoder } = useContentPair()
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

  const { address, connector, isConnected } = useAccount()
  const [nick, setNick] = usePersistentNick()

  const onCommand = (text: string): void => {
    handleCommand(text, node, setNick).then(({ command, response }) => {
      const commandMessages = response.map((msg) => {
        return Message.fromUtf8String(command, msg, address as string)
      })
      pushLocalMessages(commandMessages)
    })
  }

  return (
    <div className="chat-app h-full w-full">
      <Room
        nick={nick}
        address={address as string}
        messages={messages}
        commandHandler={onCommand}
      />
    </div>
  )
}
