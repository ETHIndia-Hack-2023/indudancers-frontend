'use client'

import { useEffect, useRef } from 'react'
import { Message } from './Message'
import type { ChatListProps } from './types'
import Loader from '../ui/loaders/loader'
import { useAccount, useWalletClient } from 'wagmi'
import Link from 'next/link'

export default function ChatList(props: ChatListProps) {
  const { address, connector, isConnected } = useAccount()

  const renderedMessages = props.messages.array.map((message) => (
    <div
      key={
        message.nick +
        message.payloadAsUtf8 +
        message.timestamp.valueOf() +
        message.sentTimestamp?.valueOf()
      }
      className="flex flex-col p-2 border-b border-gray-200"
    >
      <span className="text-sm text-white">
        <a href={`/users/${message.address}`}>{message.nick}</a>
      </span>
      <span className="text-sm text-white">{formatDisplayDate(message)}</span>
      <p className="text-white">{message.payloadAsUtf8}</p>
    </div>
  ))

  if (props.isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Loader />
      </div>
    )
  }

  return (
    <div className="overflow-y-scroll flex-1 h-full items-start max-h-[70vh] min-h-[70vh] ">
      {renderedMessages}
      <AlwaysScrollToBottom messages={props.messages.array} />
      {!isConnected ? <h1>Please, login to use the chat</h1> : <></>}
    </div>
  )
}

function formatDisplayDate(message: Message): string {
  return message.timestamp.toLocaleString([], {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
  })
}

const AlwaysScrollToBottom = (props: { messages: Message[] }) => {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.scrollIntoView()
    }
  }, [props.messages])

  return <div ref={elementRef} />
}
