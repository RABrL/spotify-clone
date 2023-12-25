'use client'

import Image from 'next/image'

import useLoadImage from '@/hooks/useLoadImage'
import { Song } from '@/types'

import PlayButton from './PlayButton'

interface SongItemProps {
  song: Song
  onClick: (id: number) => void
}

const SongItem = ({ song, onClick }: SongItemProps) => {
  const imagePath = useLoadImage(song)
  return (
    <button
      onClick={() => onClick(song.id)}
      className="
        relative
        group
        flex
        flex-col
        items-center
        justify-center
        rounded-md
        overflow-hidden
        gap-x-4
        bg-neutral-400/5
        cursor-pointer
        hover:bg-neutral-400/10
        transition
        duration-300
        p-4
      "
    >
      <div
        className="
          relative
          aspect-square
          w-full
          h-full
          rounded-md
          overflow-hidden
        "
      >
        <Image
          className="object-cover"
          src={imagePath || '/images/liked.png'}
          fill
          alt={`Cover of ${song.title}`}
        />
      </div>
      <div
        className="
          flex
          flex-col
          w-full
          pt-4
          gap-y-1
          text-start
        "
      >
        <p className="font-semibold truncate w-full">{song.title}</p>
        <p
          className="
            text-neutral-400
            text-sm
            pb-4
            w-full
            truncate
          "
        >
          By {song.author}
        </p>
      </div>
      <div
        className="
          absolute
          bottom-[114px]
          right-5
        "
      >
        <PlayButton />
      </div>
    </button>
  )
}

export default SongItem
