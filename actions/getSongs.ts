import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import { Song } from '@/types'
import { Database } from '@/types/supabase'

const getSongs = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient<Database>({ cookies })

  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.log(error)
  }

  return (data as any) || []
}

export default getSongs
