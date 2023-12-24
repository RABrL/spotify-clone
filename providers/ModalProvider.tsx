'use client'

import { useEffect, useState } from 'react'

import UploadModal from '@/components/modals/UploadModal'
import SignInModal from '@/components/modals/SignInModal'
import SignUpModal from '@/components/modals/SignUpModal'

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <>
      <SignInModal />
      <SignUpModal />
      <UploadModal />
    </>
  )
}

export default ModalProvider
