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
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="What do you want to listen to?"
    />
  )
}

export default SearchInput
