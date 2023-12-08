'use client'

import React, { useEffect, useState } from 'react'
import ChatMessages from './chat-messages'
import SendMessageButton from './send-btn'
import { Input } from '../ui/input'

type Props = {}

export default function Chat({}: Props) {
  const inputRef = React.createRef<HTMLInputElement>()
  const [sendState, setSendState] = useState(false)

  function onSendAction() {
    alert('send message with: ' + inputRef.current?.value)
    inputRef.current!.value = ''
    setSendState(!sendState)
  }

  return (
    <div className="flex flex-col flex-1 max-h-full bg-cyan-400 rounded-2xl">
      <div>Chat</div>
      <div className="flex-1 m-5 overflow-scroll">
        <ChatMessages></ChatMessages>
      </div>
      <div className="flex gap-5">
        <Input
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSendAction()
            }
          }}
        ></Input>
        <div className="">
          <SendMessageButton
            onClick={onSendAction}
            message="saasdsad"
          ></SendMessageButton>
        </div>
      </div>
    </div>
  )
}
