'use client'

import React from 'react'
import { Button } from '@/components/ui/button'

type Props = {
  onClick: () => void
  message: string
}

export default function SendMessageButton({ message, onClick }: Props) {
  return (
    <Button variant={'default'} onClick={() => onClick()}>
      Send message
    </Button>
  )
}
