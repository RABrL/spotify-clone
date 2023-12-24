'use client'

import { TbPlaylist } from 'react-icons/tb'
import { AiOutlinePlus } from 'react-icons/ai'

import { useUser } from '@/hooks/useUser'
import useModal from '@/hooks/useModalStore'

const Library = () => {
  const onOpen = useModal((state) => state.onOpen)
  const { user } = useUser()
  const onClick = () => {
    if (!user) return onOpen('signIn')

    // TODO: Check for subscription
    return onOpen('uploadSong')
  }
  return (
    <div className="flex flex-col">
      <div
        className="
        flex
        items-center
        justify-between
        px-5
        pt-4
      "
      >
        <div
          className="
          inline-flex
          items-center
          gap-x-2
        "
        >
          <TbPlaylist className="text-neutral-400" size={26} />
          <p
            className="
            text-neutral-400
            font-medium
            text-md
            select-none
          "
          >
            Your Library
          </p>
        </div>
        <AiOutlinePlus
          onClick={onClick}
          className="
            text-neutral-400 
            cursor-pointer 
            hover:text-white 
            transition
          "
          size={26}
        />
      </div>
      <div
        className="
          flex
          flex-col
          gap-y-2
          mt-4
          px-3
        "
      >
        List of Songs
      </div>
    </div>
  )
}

export default Library
