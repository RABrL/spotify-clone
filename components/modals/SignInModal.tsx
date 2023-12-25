'use client'

import {
  useSessionContext,
  useSupabaseClient
} from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

import Modal from './Modal'
import useModal from '@/hooks/useModalStore'

const SignInModal = () => {
  const supabaseClient = useSupabaseClient()
  const router = useRouter()
  const { session } = useSessionContext()
  const { isOpen, onClose, type } = useModal((state) => state)

  const isModalOpen = isOpen && type === 'signIn'

  useEffect(() => {
    if (session) {
      router.refresh()
      onClose()
    }
  }, [session, router, onClose])

  const onChange = (open: boolean) => {
    if (!open) onClose()
  }

  return (
    <Modal
      title="Welcome back"
      description="Login to your account"
      isOpen={isModalOpen}
      onChange={onChange}
    >
      <Auth
      localization={{variables:{}}}
        theme="dark"
        magicLink
        providers={['github']}
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#404040',
                brandAccent: '#22c55e'
              }
            }
          }
        }}
      />
    </Modal>
  )
}

export default SignInModal
