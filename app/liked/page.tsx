import Image from 'next/image'

import getLikedSongs from '@/actions/getLikedSongs'
import Box from '@/components/Box'
import Header from '@/components/Header'

import LikedContent from './components/LikedContent'

export const revalidate = 0

const Liked = async () => {
  const songs = await getLikedSongs()
  return (
    <Box
      className="
        h-full
        overflow-hidden
        overflow-y-auto
      "
    >
      <Header>
        <div className="mt-20">
          <div
            className="
              flex
              flex-col
              md:flex-row
              items-center
              gap-x-5
            "
          >
            <div
              className="
                relative
                w-32
                h-32
                lg:h-44
                lg:w-44
              "
            >
              <Image
                fill
                src="/images/liked.png"
                className="object-cover"
                alt="Liked Playlist"
              />
            </div>
            <div
              className="
                flex
                flex-col
                gap-y-2
                mt-4
                md:mt-0
              "
            >
              <p className="hidden md:block font-semibold text-md">Playlist</p>
              <h1
                className="
                  text-4xl
                  sm:text-5xl
                  lg:text-7xl
                  font-bold
                  text-white
                "
              >
                Liked Songs
              </h1>
            </div>
          </div>
        </div>
      </Header>
      <LikedContent songs={songs} />
    </Box>
  )
}

export default Liked
