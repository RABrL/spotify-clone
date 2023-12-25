import { Song } from '@/types'
import { Database } from '@/types/supabase'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

const useLoadImage = (song: Song) => {
  const supabaseClient = useSupabaseClient<Database>()

  if (!song || song == null) {
    return null
  }

  const { data: imageData } = supabaseClient.storage
    .from('images')
    .getPublicUrl(song.image_path)

  return imageData.publicUrl
}

export default useLoadImage
