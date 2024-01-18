'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import Input from '@/components/Input'
import useDebounce from '@/hooks/useDebounce'
import qs from 'query-string'

const SearchInput = () => {
  const router = useRouter()
  const [value, setValue] = useState('')
  const debouncedValue = useDebounce<string>(value, 500)

  useEffect(() => {
    const query = {
      title: debouncedValue
    }
    const url = qs.stringifyUrl({ url: '/search', query })

    router.push(url)
  }, [debouncedValue, router])

  return (
    <Input
      className="
        font-normal
        bg-[#242424]
        border-0
        rounded-[500px]
        text-white
        h-12
        px-8
        py-[6px]
        w-full
        overflow-ellipsis
      "
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="What do you want to listen to?"
    />
  )
}

export default SearchInput
