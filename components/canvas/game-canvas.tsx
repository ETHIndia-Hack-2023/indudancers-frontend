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

PIXI.settings.RESOLUTION = window.devicePixelRatio
PIXI.BaseTexture.defaultOptions.scaleMode = 0

export default function GameCanvas() {
  const blurFilter = useMemo(() => new PIXI.BlurFilter(4), [])

  return (
    <Stage>
      <IndiDancer />
      <Sprite
        image="/dancer_1.gif"
        x={500}
        y={300}
        scale={10}
        anchor={{ x: 0.5, y: 0.5 }}
      />
      <Sprite
        image="/dancer_1.gif"
        x={600}
        y={300}
        scale={10}
        anchor={{ x: 0.5, y: 0.5 }}
      />
      <Sprite
        image="/dancer_1.gif"
        x={300}
        y={400}
        scale={10}
        anchor={{ x: 0.5, y: 0.5 }}
      />
      <Sprite
        image="/dancer_1.gif"
        x={300}
        y={500}
        scale={10}
        anchor={{ x: 0.5, y: 0.5 }}
      />
      <Sprite
        image="/dancer_1.gif"
        x={600}
        y={300}
        scale={10}
        anchor={{ x: 0.5, y: 0.5 }}
      />
      <Container x={400} y={330}>
        <Text
          text="Hello World"
          anchor={{ x: 0.5, y: 0.5 }}
          filters={[blurFilter]}
        />
      </Container>
    </Stage>
  )
}

const IndiDancer = () => {
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
    <Container x={width} y={height} scale={10}>
      <AnimatedSprite
        animationSpeed={0.1}
        isPlaying={true}
        textures={textureArray}
        anchor={0.5}
      />
    </Container>
  )
}
