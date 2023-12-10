'use client'

import GameCanvasWrapper from '@/components/canvas/game-canvas-wrapper'
import Chat from '@/components/chat/chat'
import Navbar from '@/components/structure/navbar'
import { DancerProvider } from '@/hooks/useDanceContext'
import { useAccount } from 'wagmi'

export default function Home() {
  console.log('SUPER GET DATA')
  let val: string | null = null

  if (window.location.href.includes('users')) {
    val = getLastUrlPart(window.location.href)!
    console.log(val)
  }

  return (
    <main className="flex flex-col items-center min-h-screen max-h-screen gap-3">
      <Navbar></Navbar>
      <div className="flex flex-row justify-start w-full gap-5 max-h-1/2">
        <div className="flex flex-col flex-[3] rounded-xl gap-5">
          <DancerProvider>
            <div className="upper">
              <AudioSectionListener
                address={val as string}
              ></AudioSectionListener>
            </div>
            <div className="flex-1">
              <GameCanvasWrapper />
            </div>
          </DancerProvider>
        </div>
        <div className="flex-[1] rounded-xl">
          <Chat />
        </div>
      </div>
    </main>
  )
}
