'use client'

import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { useRouter } from 'next/navigation'
import { BiSearch } from 'react-icons/bi'
import { HiHome } from 'react-icons/hi'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { FaUserAlt } from 'react-icons/fa'
import toast from 'react-hot-toast'
import { useState } from 'react'

import { useUser } from '@/hooks/useUser'

import Button from './Button'
import useModal from '@/hooks/useModalStore'

interface HeaderProps {
  children: React.ReactNode
}

const Header = ({ children }: HeaderProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const onOpen = useModal((state) => state.onOpen)
  const router = useRouter()
  const supabaseClient = useSupabaseClient()
  const { user } = useUser()

  const handleLogout = async () => {
    setIsLoading(true)
    const { error } = await supabaseClient.auth.signOut()
    // reset any playing songs

    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Logged out!')
      router.refresh()
    }
    setIsLoading(false)
  }

  return (
    <header
      className="h-16 flex justify-between g-2 px-5 py-4 absolute w-full items-center"
      style={{ contain: 'content' }}
    >
      <div
        className="
            hidden
            md:flex
            gap-2
          "
      >
        <button
          aria-label="Go Back"
          onClick={() => router.back()}
          className="
                inline-flex
                h-8
                w-8
                relative
                text-white
                cursor-pointer
                justify-center
                items-center
                bg-black/70
                border-none
                rounded-full
              "
        >
          <RxCaretLeft size={35} />
        </button>
        <button
          aria-label="Go Forward"
          onClick={() => router.forward()}
          className="
                inline-flex
                h-8
                w-8
                relative
                text-white
                cursor-pointer
                justify-center
                items-center
                bg-black/70
                border-none
                rounded-full
              "
        >
          <RxCaretRight size={35} />
        </button>
      </div>
      <div className="flex md:hidden gap-x-2 items-center">
        <button
          onClick={() => router.push('/')}
          className="
              rounded-full
              p-2
              bg-white
              flex
              items-center
              justify-center
              cursor-pointer
              hover:opacity-75
              transition
              "
        >
          <HiHome className="text-black" size={20} />
        </button>
        <button
          onClick={() => router.push('/search')}
          className="
              rounded-full
              p-2
              bg-white
              flex
              items-center
              cursor-pointer
              justify-center
              hover:opacity-75
              transition
            "
        >
          <BiSearch className="text-black" size={20} />
        </button>
      </div>
      <div className="grow min-w-0 pointer-events-none">
        <div className="flex gap-2 pointer-events-none items-center">
          {children}
        </div>
      </div>
      <div className="flex flex-nowrap flex-row items-center">
        {user ? (
          <div className="flex gap-x-2 items-center">
            <Button
              onClick={handleLogout}
              disabled={isLoading}
              className="bg-white md:px-8 md:py-2 py-1 px-5 text-nowrap md:min-h-[48px]"
            >
              Log out
            </Button>
            <Button
              onClick={() => router.push('/account')}
              className="bg-white p-2 md:p-3 md:min-h-[48px]"
            >
              <FaUserAlt size={18} />
            </Button>
          </div>
        ) : (
          <>
            <Button
              onClick={() => onOpen('signUp')}
              className="
                inline-flex
                items-center
                justify-center
                bg-transparent
                border-0
                cursor-pointer
                relative
                text-center
                no-underline
                normal-case
                select-none
                align-middle
                text-[#a7a7a7]
                transform-gpu
                py-2
                pr-8
                pl-2
                text-nowrap
                hover:text-white
                hover:scale-105
                duration-75
                min-h-[48px]
              "
            >
              Sign up
            </Button>
            <Button
              onClick={() => onOpen('signIn')}
              className="
                inline-block
                items-center
                justify-center
                bg-white
                border-0
                cursor-pointer
                relative
                text-center
                text-black
                no-underline
                normal-case
                select-none
                align-middle
                transform-gpu
                px-8
                py-2
                min-h-[48px]
                hover:scale-105
                duration-75
              "
            >
              Log in
            </Button>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
