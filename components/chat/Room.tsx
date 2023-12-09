import type { LightNode } from '@waku/interfaces'
import ChatList from './ChatList'
import MessageInput from './MessageInput'
import { useWaku, useContentPair, useLightPush } from '@waku/react'
import { ChatMessage } from './chat_message'
import { useNodePeers, usePeers } from './hooks'
import type { RoomProps } from './types'

export default function Room(props: RoomProps) {
  const { node } = useWaku<LightNode>()
  const { encoder } = useContentPair()
  const { push: onPush } = useLightPush({ node, encoder })

  // const {
  //   connectedBootstrapPeers,
  //   connectedPeerExchangePeers,
  //   discoveredBootstrapPeers,
  //   discoveredPeerExchangePeers,
  // } = useNodePeers(node)
  // const { allConnected, storePeers, filterPeers, lightPushPeers } = usePeers({
  //   node,
  // })

  const onSend = async (text: string) => {
    if (!onPush || !text) {
      return
    }

    if (text.startsWith('/')) {
      props.commandHandler(text)
    } else {
      const timestamp = new Date()
      const chatMessage = ChatMessage.fromUtf8String(
        timestamp,
        props.nick,
        text
      )
      const payload = chatMessage.encode()

      await onPush({ payload, timestamp })
    }
  }

  // const allConnectedLength = orZero(allConnected?.length)
  // const lightPushPeersLength = orZero(lightPushPeers?.length)
  // const filterPeersLength = orZero(filterPeers?.length)
  // const storePeersLength = orZero(storePeers?.length)

  console.log('AAAA')

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center bg-gray-800 text-white p-4">
        <div>Room</div>
      </div>
      <ChatList messages={props.messages} />
      <MessageInput hasLightPushPeers={true} sendMessage={onSend} />
    </div>
  )
}

function orZero(value: undefined | number): number {
  return value || 0
}
