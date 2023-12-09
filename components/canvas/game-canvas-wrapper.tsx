'use client'

import React from 'react'
import GameCanvas from './game-canvas'
import Loader from '../ui/loaders/loader'
import useDancerFloorRead from '@/hooks/useDanceFloorRead'

type Props = {}

export default function GameCanvasWrapper({}: Props) {
  console.log('SUPER GET DATA')

  const { isLoading, floorData } = useDancerFloorRead()

  if (isLoading) {
    return <Loader></Loader>
  }

  console.log(floorData)

  return <GameCanvas danceFloor={floorData}></GameCanvas>
}
