'use client'

import * as PIXI from 'pixi.js'
import {
  Stage,
  Container,
  AnimatedSprite,
  Sprite,
  Text,
  useApp,
  useTick,
} from '@pixi/react'
import { useEffect, useMemo, useState } from 'react'
import { useDancerContext } from '@/hooks/useDanceContext'
import useDancerFloorRead from '@/hooks/useDanceFloorRead'
import { DanceFloorData, hasOnCell } from '@/types/game-types'
import { useIteration } from '@/hooks/useIteration'

PIXI.settings.RESOLUTION = window.devicePixelRatio
PIXI.BaseTexture.defaultOptions.scaleMode = 0

export type GameCanvasProps = {
  danceFloor: DanceFloorData
}

export default function GameCanvas({ danceFloor }: GameCanvasProps) {
  const startingPoint = { x: 250, y: 200 }
  const minRnd = -10
  const maxRnd = 10

  const dancerProps: IndiDancerProps[] = [
    { x: 0, y: 0 },
    { x: 150, y: 0 },
    { x: 300, y: 0 },
    { x: 0, y: 150 },
    { x: 150, y: 150 },
    { x: 300, y: 150 },
    { x: 0, y: 300 },
    { x: 150, y: 300 },
    { x: 300, y: 300 },
  ]

  const dancerr = dancerProps.map((i, e) => {
    const x = e % 3
    const y = Math.trunc(e / 3)

    console.log(`dancers: ${x}:${y}`)

    if (!hasOnCell(x, y, danceFloor.dancers)) {
      return <></>
    }

    console.log('FOUND BOUGHT!!!!')

    return (
      <IndiDancer
        x={i.x + getRndInteger(minRnd, maxRnd)}
        y={i.y + getRndInteger(minRnd, maxRnd)}
        key={`${x}:${y}`}
      />
    )
  })

  return (
    <Stage>
      <Container x={startingPoint.x} y={startingPoint.y}>
        {dancerr}
      </Container>
    </Stage>
  )
}

function getRndInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min
}

type IndiDancerProps = {
  x: number
  y: number
}

const IndiDancer = ({ x, y }: IndiDancerProps) => {
  const alienImages = ['dance_1.png', 'dance_2.png']
  const textureArray: PIXI.Texture[] = []

  for (let i = 0; i < 2; i++) {
    const texture = PIXI.Texture.from(alienImages[i])
    textureArray.push(texture)
  }

  return (
    <Container x={x} y={y} scale={10}>
      <AnimatedSprite
        animationSpeed={(Math.random() + 0.1) * 0.4}
        currentFrame={Math.round(Math.random())}
        isPlaying={true}
        textures={textureArray}
        anchor={0.5}
      />
    </Container>
  )
}

const DanceFloor = () => {
  const [width, height] = [500, 500]

  return <Container></Container>
}
