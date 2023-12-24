import { create } from 'zustand'

export type ModalType = 'auth' | 'uploadSong'
interface ModalStore {
  type: ModalType | null
  isOpen: boolean
  onOpen: (type: ModalType) => void
  onClose: () => void
}

const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  onOpen: (type) => set({ type, isOpen: true }),
  onClose: () => set({ isOpen: false })
}))

export default useModal
