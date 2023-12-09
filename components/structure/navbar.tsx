import React from 'react'
import Profile from '@/components/profile/profile'
import ProjectName from './project-name'
import Link from 'next/link'
import { SketchLogoIcon, ThickArrowUpIcon } from '@radix-ui/react-icons'

type Props = {}

export default function Navbar({}: Props) {
  return (
    <div className="sticky flex w-full items-center pl-6 pr-6 p-2 mb-5 bg-accent-one top-2 min-h-min rounded-3xl gap-10 shadow-2xl shadow-[6px_6px_0px_0px_rgba(200,142,60)]">
      <ProjectName />
      <Link
        href="/leaderboard"
        className="flex items-center gap-2 hover:bg-accent-one_darker rounded-full p-2"
      >
        <ThickArrowUpIcon />
        Leaderboard
      </Link>
      <Link href="/marketplace" className="flex items-center gap-2">
        <SketchLogoIcon />
        Marketplace
      </Link>
      <div className="ml-auto">
        <Profile></Profile>
      </div>
    </div>
  )
}
