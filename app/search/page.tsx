import getSongsbyTitle from '@/actions/getSongsByTitle'
import Box from '@/components/Box'
import Header from '@/components/Header'

import SearchInput from './components/SearchInput'
import SearchContent from './components/SearchContent'

interface SearchProps {
  searchParams: {
    title: string
  }
}

const Search = async ({ searchParams: { title } }: SearchProps) => {
  const songs = await getSongsbyTitle(title)
  return (
    <Box
      className="
        h-full
        overflow-hidden
        overflow-y-auto
      "
    >
      <Header className="from-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1
            className="
              text-white
              text-3xl
              font-semibold
            "
          >
            Search
          </h1>
          <SearchInput />
        </div>
      </Header>
      <SearchContent songs={songs} />
    </Box>
  )
}

export default Search
