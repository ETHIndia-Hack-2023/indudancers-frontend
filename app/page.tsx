import GameCanvas from '@/components/canvas/game-canvas'
import GameUpperSection from '@/components/canvas/game-upper-section'
import Chat from '@/components/chat/chat'
import Navbar from '@/components/structure/navbar'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen gap-3">
      <Navbar></Navbar>
      <div className="flex flex-row justify-start w-full gap-5 max-h-1/2">
        <div className="flex flex-col flex-[3] rounded-xl gap-5">
          <div className="upper">
            <GameUpperSection></GameUpperSection>
          </div>
          <div className="flex-1">
            <GameCanvas></GameCanvas>
          </div>
        </div>
        <div className="flex-[1] rounded-xl">
          <Chat />
        </div>
      </div>
    </main>
  )
}
