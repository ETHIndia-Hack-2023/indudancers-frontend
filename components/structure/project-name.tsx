'use client'

import Link from 'next/link'
import React from 'react'

type Props = {}

export default function ProjectName({}: Props) {
  return (
    <div>
      <Link href="/" className="font-bold">
        DanceHeroes
      </Link>
    </div>
  )
}
