import useLoadImage from '@/hooks/useLoadImage'
import { Song } from '@/types'
import Image from 'next/image'

interface MediaItemProps {
  song: Song
  onClick: (id: number) => void
}

const MediaItem = ({ onClick, song }: MediaItemProps) => {
  const imageUrl = useLoadImage(song)

  const handleClick = () => {
    if (onClick) {
      return onClick(song.id)
    }

    // Default turn on player
  }
  return (
    <button
      onClick={handleClick}
      className="
      flex
      items-center
      gap-x-3
      cursor-pointer
      hover:bg-neutral-800/50
      w-full
      p-2
      rounded-md
    "
    >
      <div
        className="
        relative
        rounded-md
        min-h-[48px]
        min-w-[48px]
        overflow-hidden
      "
      >
        <Image
          fill
          src={imageUrl || '/images/liked.png'}
          alt={`Cover for ${song.title}`}
          className="object-cover"
        />
      </div>
      <div
        className="
          flex
          flex-col
          gap-y-1
          overflow-hidden
          text-start
        "
      >
        <p className="text-white truncate">{song.title}</p>
        <p className="text-neutral-400 text-sm truncate">{song.author}</p>
      </div>
    </button>
  )
}

export default MediaItem
