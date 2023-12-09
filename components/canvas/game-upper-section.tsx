import React from 'react'
import { Button } from '@/components/ui/button'

type Props = {}

export default function GameUpperSection({}: Props) {
  return (
    <div className="flex justify-start gap-5">
      <Button>Buy dance floor</Button>
      <Button>Buy dancer</Button>
    </div>
  )
}
