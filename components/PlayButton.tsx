import { FaPlay } from 'react-icons/fa'

const PlayButton = () => {
  return (
    <button
      className="
        transition
        ease-out
        duration-300
        opacity-0
        rounded-full
        flex
        items-center
        bg-green-500
        p-4
        drop-shadow-md
        translate
        translate-y-1/4
        group-hover:opacity-100
        group-hover:translate-y-0
        hover:scale-105
        hover:duration-0
      "
    >
      <FaPlay className="text-black" />
    </button>
  )
}

export default PlayButton
