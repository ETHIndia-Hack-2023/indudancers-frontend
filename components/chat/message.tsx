'use client'

import React from 'react'

export type MessageProps = {
  text: string
  nickname: string
  isClientUser: boolean
  timestamp: Date
}

export default function Message({
  text,
  nickname,
  isClientUser,
  timestamp,
}: MessageProps) {
  return (
    <div className={`${isClientUser ? 'bg-red-600' : 'bg-slate-500'}`}>
      <div>
        @{nickname} - {timestamp.toString()}
      </div>
      <div>{text}</div>
    </div>
  )
}
