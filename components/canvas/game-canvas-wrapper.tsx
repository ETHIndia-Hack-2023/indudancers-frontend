import useDacnerFloorRead from '@/hooks/useDanceFloorRead'
import React from 'react'
import GameCanvas from './game-canvas'

type Props = {}

export default function GameCanvasWrapper({}: Props) {
  console.log('SUPER GET DATA')

  const d = useDacnerFloorRead()

  console.log(d)

  return <GameCanvas danceFloor={d}></GameCanvas>
}
