'use client'

import React, { useEffect } from 'react'
import GameCanvas from './game-canvas'
import Loader from '../ui/loaders/loader'
import useDancerFloorRead from '@/hooks/useDanceFloorRead'

type Props = {}

export default function GameCanvasWrapper({}: Props) {
  console.log('SUPER GET DATA')
  let val: string | null = null

  useEffect(() => {
    if (window.location.href.includes('users')) {
      val = getLastUrlPart(window.location.href)!
      console.log(val)
    }
  
  }, [])


  const { isLoading, floorData } = useDancerFloorRead(val)

  if (isLoading) {
    return <Loader></Loader>
  }

  console.log('FLOOR DATA'!!!)
  console.log(floorData)

  return <GameCanvas danceFloor={floorData}></GameCanvas>
}

export function getLastUrlPart(url: string) {
  const parts = url.split('/')
  return parts.at(-1)
}
