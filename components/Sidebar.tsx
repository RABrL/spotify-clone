'use client'

import { HiHome } from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi'

import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import Box from './Box'
import SidebarItem from './SidebarItem'
import Library from './Library'
import { Song } from '@/types'

interface SidebarProps {
  children: React.ReactNode
  songs: Song[]
}

const Sidebar = ({ children, songs }: SidebarProps) => {
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
    <div className="flex h-full p-2 gap-x-2">
      <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px]">
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
      <main className="h-full flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}

export default Sidebar
