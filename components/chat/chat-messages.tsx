'use client'

import React from 'react'
import Message, { MessageProps } from './message'

type Props = {}

export default function ChatMessages({}: Props) {
  const messages: MessageProps[] = [
    {
      isClientUser: true,
      nickname: 'abc',
      text: ' asdasdasd',
      timestamp: new Date(),
    },
    {
      isClientUser: false,
      nickname: 'aaaa',
      text: 'asdasdasd',
      timestamp: new Date(),
    },
  ]

  const messageComponents = messages.map((p, i) => {
    return <Message key={i} {...p}></Message>
  })

  return <div className="h-full bg-fuchsia-400">{messageComponents}</div>
}
