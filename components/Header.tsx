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
import { cn } from '@/utils/cn'

import Button from './Button'
import useModal from '@/hooks/useModalStore'

interface HeaderProps {
  children: React.ReactNode
  className?: string
}

const Header = ({ children, className }: HeaderProps) => {
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
    <div
      className={cn(
        `
    h-fit
    bg-gradient-to-b
    from-emerald-800
    p-6
  `,
        className
      )}
    >
      <div
        className="
          w-full
          mb-4
          flex
          items-center
          justify-between
        "
      >
        <div
          className="
            hidden
            md:flex
            gap-x-2
            items-center
          "
        >
          <button
            onClick={() => router.back()}
            className="
              rounded-full
              bg-neutral-800
              flex
              items-center
              justify-center
              hover:opacity-75
              transition
            "
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>
          <button
            onClick={() => router.forward()}
            className="
              rounded-full
              bg-neutral-800
              flex
              items-center
              justify-center
              hover:opacity-75
              transition
            "
          >
            <RxCaretRight className="text-white" size={35} />
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
        <div
          className="
            flex
            justify-between
            items-center
            gap-x-4
          "
        >
          {user ? (
            <div className="flex gap-x-4 items-center">
              <Button
                onClick={handleLogout}
                disabled={isLoading}
                className="bg-white px-6 py-1"
              >
                Logout
              </Button>
              <Button
                onClick={() => router.push('/account')}
                className="bg-white p-2"
              >
                <FaUserAlt size={18} />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={() => onOpen('signUp')}
                  className="
                    bg-transparent
                    text-neutral-300
                    font-medium
                  "
                >
                  Sign up
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => onOpen('signIn')}
                  className="
                    bg-white
                    px-6
                    py-1
                  "
                >
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  )
}

export default Header
