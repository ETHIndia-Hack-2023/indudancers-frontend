'use client'

import React from 'react'
import { Button } from '@/components/ui/button'

type Props = {
  message: string
}

export default function SendMessageButton({ message }: Props) {
  function onClick() {
    alert('sended message' + message)
  }

  return (
    <Button variant={'default'} onClick={() => onClick()}>
      Send message
    </Button>
  )
}
