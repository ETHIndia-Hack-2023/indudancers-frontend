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

export type GameCanvasProps = {
  danceFloor: DanceFloorData
}

const danceImages = [
  'https://gateway.lighthouse.storage/ipfs/QmcFAWmNvakmtadqqPNAojfy2aLQHYTnfUwLCNBiWoWBsm',
  'https://gateway.lighthouse.storage/ipfs/QmZQd2pYtztQQ2FFegDxzu8XDTbXm8XAoJHWYccSrpGoiq',
]
const textureArray: PIXI.Texture[] = []

export default function GameCanvas({ danceFloor }: GameCanvasProps) {
  useEffect(() => {
    PIXI.settings.RESOLUTION = window.devicePixelRatio
    PIXI.BaseTexture.defaultOptions.scaleMode = 0
    for (let i = 0; i < 2; i++) {
      console.log('LOADING FILE')
      const texture = PIXI.Texture.from(danceImages[i])
      textureArray.push(texture)
    }
  }, [])
  const startingPoint = { x: 250, y: 200 }
  const minRnd = -10
  const maxRnd = 10

  const dancerProps: HeroDancerProps[] = [
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
      <DanceHero
        x={i.x + getRndInteger(minRnd, maxRnd)}
        y={i.y + getRndInteger(minRnd, maxRnd)}
        key={`${x}:${y}`}
      />
    )
  })

  console.log('RENDEING THE STAGE!!!!!!!!!!')
  console.log(danceFloor)

  return (
    <Stage className="rounded-3xl" options={{ backgroundAlpha: 0.3 }}>
      <Container x={startingPoint.x} y={startingPoint.y}>
        {dancerr}
      </Container>
    </Stage>
  )
}

function getRndInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min
}

type HeroDancerProps = {
  x: number
  y: number
}

const DanceHero = ({ x, y }: HeroDancerProps) => {
  const [animDance, setAnimDance] = useState(true)

  // const alienImages = ['dance_1.png', 'dance_2.png']
  // const textureArray: PIXI.Texture[] = []

  // for (let i = 0; i < 2; i++) {
  //   const texture = PIXI.Texture.from(alienImages[i])
  //   textureArray.push(texture)
  // }

  // console.log(textureArray)

  return (
    <Container
      x={x + getRndInteger(-10, 10)}
      y={y + getRndInteger(-10, 10)}
      scale={10}
    >
      <AnimatedSprite
        animationSpeed={0.1}
        currentFrame={Math.round(Math.random())}
        isPlaying={true}
        textures={textureArray}
        anchor={0.5}
        onLoop={() => {
          setAnimDance(!animDance)
        }}
      />
    </Container>
  )
}

const DanceFloor = () => {
  const [width, height] = [500, 500]

  return <Container></Container>
}
