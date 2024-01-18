import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import './globals.css'

import SupabaseProvider from '@/providers/SupabaseProvider'
import ToasterProvider from '@/providers/ToasterProvider'
import UserProvider from '@/providers/UserProvider'
import ModalProvider from '@/providers/ModalProvider'

import getSongsByUserId from '@/actions/getSongsByUserId'

import Player from '@/components/Player'
import Main from '@/components/Main'

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spotify Clone',
  description:
    'A Spotify clone built with Next.js and Tailwind CSS. For fun and learning.z'
}

export const revalidate = 0

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const userSongs = await getSongsByUserId()
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Main songs={userSongs}>{children}</Main>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
