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

const SignUpModal = () => {
  const supabaseClient = useSupabaseClient()
  const router = useRouter()
  const { session } = useSessionContext()
  const { isOpen, onClose, type } = useModal((state) => state)

  const isModalOpen = isOpen && type === 'signUp'

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
      title="Create an account"
      description="Sign up to upload your own songs and enjoy the good music"
      isOpen={isModalOpen}
      onChange={onChange}
    >
      <Auth
        view="sign_up"
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

export default SignUpModal
