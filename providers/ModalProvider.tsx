'use client'

import { useEffect, useState } from 'react'

import Modal from '@/components/Modal'
import AuthModal from '@/components/AuthModal'

const ModalProvider = () => {
  const [isMounter, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounter) return null

  return (
    <>
      <AuthModal />
    </>
  )
}

export default ModalProvider
