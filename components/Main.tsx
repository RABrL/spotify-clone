'use client'

import { Song } from '@/types'

import Player from './Player'
import Sidebar from './Sidebar'
import { useRouter } from 'next/navigation'
import Header from './Header'

interface MainProps {
  children: React.ReactNode
  songs: Song[]
}

const Main = ({ children, songs }: MainProps) => {
  const router = useRouter()
  return (
    <div
      data-right-sidebar-hidden
      className="grid grid-cols-[auto_1fr] grid-rows-[1fr_auto] h-full min-h-full w-full p-2 gap-2 layout"
    >
      <Sidebar songs={songs} />
      <Player />
      <div className="main-view bg-[#121212] h-full flex-1 overflow-hidden relative">
        <Header />
        <div>{children}</div>
      </div>
      <div className="right-sidebar" />
    </div>
  )
}

export default Main
