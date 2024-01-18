'use client'

import { HiHome } from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

import { Song } from '@/types'

import Box from './Box'
import SidebarItem from './SidebarItem'
import Library from './Library'

interface SidebarProps {
  songs: Song[]
}

const Sidebar = ({ songs }: SidebarProps) => {
  const pathname = usePathname()

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: 'Home',
        active: pathname !== '/search',
        href: '/'
      },
      {
        icon: BiSearch,
        label: 'Search',
        active: pathname === '/search',
        href: '/search'
      }
    ],
    [pathname]
  )

  return (
    <div
      className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] min-h-0 left-sidebar"
    >
      <Box>
        <div
          className="
            flex 
            flex-col 
            gap-y-4 
            px-5 
            py-4
          "
        >
          {routes.map((item) => (
            <SidebarItem key={item.label} {...item} />
          ))}
        </div>
      </Box>
      <Box className="overflow-y-auto h-full">
        <Library songs={songs} />
      </Box>
    </div>
  )
}

export default Sidebar
