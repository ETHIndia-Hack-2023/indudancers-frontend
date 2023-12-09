'use client'

import GameCanvasWrapper from '@/components/canvas/game-canvas-wrapper'
import Chat from '@/components/chat/chat'
import Navbar from '@/components/structure/navbar'
import { DancerProvider } from '@/hooks/useDanceContext'

export default function Home() {
  if (typeof window == 'undefined') {
    return <></>
  }

  return (
    <main className="flex flex-col items-center min-h-screen max-h-screen gap-3">
      <Navbar></Navbar>
      <div className="flex flex-row justify-start w-full gap-5 max-h-1/2">
        <div className="flex flex-col flex-[3] rounded-xl gap-5">
          <DancerProvider>
            <div className="upper"></div>
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
