'use client'

import { MyUserContextprovider } from '@/hooks/useUser'

interface UserProviderProps {
  children: React.ReactNode
}

const UserProvider = ({ children }: UserProviderProps) => {
  return <MyUserContextprovider>{children}</MyUserContextprovider>
}

export default UserProvider
