import { Song } from '@/types'

import usePlayer from './usePlayer'
import useModal from './useModalStore'
import { useUser } from './useUser'

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer()
  const { user } = useUser()
  const onOpen = useModal((state) => state.onOpen)

  const onPlay = (id: number) => {
    if (!user) {
      return onOpen('signIn')
    }

    player.setActiveId(id)
    player.setIds(songs.map((song) => song.id))
  }

  return onPlay
}

export default useOnPlay
