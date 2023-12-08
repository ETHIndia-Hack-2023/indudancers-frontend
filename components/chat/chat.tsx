'use client'

import React from 'react'
import ChatMessages from './chat-messages'
import SendMessageButton from './send-btn'

type Props = {}

export default function Chat({}: Props) {
  return (
    <div className="flex flex-col min-w-[300px] min-h-[600px] bg-cyan-400 rounded-2xl p-5">
      <div>Chat</div>
      <div className="flex-1 h-full m-5">
        <ChatMessages></ChatMessages>
      </div>
      <div className="flex gap-5">
        <input></input>
        <div className="mt-auto">
          <SendMessageButton message="saasdsad"></SendMessageButton>
        </div>
      </div>
    </div>
  )
}
