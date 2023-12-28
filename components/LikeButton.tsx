'use client'

import { useSessionContext } from '@supabase/auth-helpers-react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import useModal from '@/hooks/useModalStore'
import { useUser } from '@/hooks/useUser'
import { cn } from '@/utils/cn'

import toast from 'react-hot-toast'

interface LikeButtonProps {
  songId: number
}

const LikeButton = ({ songId }: LikeButtonProps) => {
  const router = useRouter()
  const { supabaseClient } = useSessionContext()

  const onOpen = useModal((state) => state.onOpen)
  const { user } = useUser()

  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    if (!user?.id) return

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from('liked_songs')
        .select('*')
        .eq('user_id', user?.id)
        .eq('song_id', songId)
        .single()

      if (!error && data) {
        setIsLiked(true)
      }
    }

    fetchData()
  }, [user?.id, songId, supabaseClient])

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart

  const handleLike = async () => {
    if (!user) {
      return onOpen('signIn')
    }
    if (isLiked) {
      const { error } = await supabaseClient
        .from('liked_songs')
        .delete()
        .eq('user_id', user?.id)
        .eq('song_id', songId)

      if (error) {
        return toast.error(error.message)
      }
      setIsLiked(false)
      toast.success('Removed from Liked Songs')
      router.refresh()
      return
    }

    const { error } = await supabaseClient.from('liked_songs').insert({
      user_id: user?.id,
      song_id: songId
    })

    if (error) {
      return toast.error(error.message)
    }
    setIsLiked(true)
    toast.success('Added to Liked Songs')
    router.refresh()
  }

  return (
    <button
      onClick={handleLike}
      className={cn(
        `
        hover:opacity-75
        transition
      `,
        isLiked && 'text-green-500 hover:text-green-400'
      )}
    >
      <Icon color={isLiked ? '·22c55e' : 'white'} size={25} />
    </button>
  )
}

export default LikeButton
