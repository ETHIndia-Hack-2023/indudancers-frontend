import GameCanvas from '@/components/canvas/game-canvas'
import Chat from '@/components/chat/chat'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex flex-row items-center justify-between min-h-screen p-24">
      <div className="flex-[3]">
        <GameCanvas></GameCanvas>
      </div>
      <div className="flex-[1]">
        <Chat />
      </div>
    </main>
  )
}
