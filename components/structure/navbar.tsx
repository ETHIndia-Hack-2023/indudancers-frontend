import React from 'react'
import Profile from '@/components/profile/profile'

type Props = {}

export default function Navbar({}: Props) {
  return (
    <div className="sticky flex w-full p-2 mb-5 bg-red-500 top-2 min-h-min rounded-xl">
      Navbar
      <div className="ml-auto">
        <Profile></Profile>
      </div>
    </div>
  )
}
