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
import useDacnerFloorRead from '@/hooks/useDanceFloorRead'
import { DanceFloorData } from '@/types/game-types'
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

  return (
    <Stage>
      <Container x={startingPoint.x} y={startingPoint.y}>
        <IndiDancer x={0} y={0} />
        <IndiDancer
          x={150 + getRndInteger(minRnd, maxRnd)}
          y={0 + getRndInteger(minRnd, maxRnd)}
        />
        <IndiDancer
          x={300 + getRndInteger(minRnd, maxRnd)}
          y={0 + getRndInteger(minRnd, maxRnd)}
        />
        <IndiDancer
          x={0 + getRndInteger(minRnd, maxRnd)}
          y={100 + getRndInteger(minRnd, maxRnd)}
        />
        <IndiDancer
          x={150 + getRndInteger(minRnd, maxRnd)}
          y={100 + getRndInteger(minRnd, maxRnd)}
        />
        <IndiDancer
          x={300 + getRndInteger(minRnd, maxRnd)}
          y={100 + getRndInteger(minRnd, maxRnd)}
        />
        <IndiDancer
          x={0 + getRndInteger(minRnd, maxRnd)}
          y={200 + getRndInteger(minRnd, maxRnd)}
        />
        <IndiDancer
          x={150 + getRndInteger(minRnd, maxRnd)}
          y={200 + getRndInteger(minRnd, maxRnd)}
        />
        <IndiDancer
          x={300 + getRndInteger(minRnd, maxRnd)}
          y={200 + getRndInteger(minRnd, maxRnd)}
        />
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
  console.log('123123')

  const alienImages = ['dance_1.png', 'dance_2.png']
  const textureArray: PIXI.Texture[] = []

  for (let i = 0; i < 2; i++) {
    const texture = PIXI.Texture.from(alienImages[i])
    textureArray.push(texture)
  }

  console.log(textureArray)

  const [width, height] = [500, 500]

  return (
    <Container x={x} y={y} scale={10}>
      <AnimatedSprite
        animationSpeed={0.1}
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
