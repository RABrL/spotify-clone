import { create } from 'zustand'

interface PlayerStore {
  ids: number[]
  activeId?: number
  setActiveId: (id: number) => void
  setIds: (ids: number[]) => void
  reset: () => void
}

const usePlayer = create<PlayerStore>((set) => ({
  ids: [],
  activeId: undefined,
  setActiveId: (id) => set({ activeId: id }),
  setIds: (ids) => set({ ids: ids }),
  reset: () => set({ ids: [], activeId: undefined })
}))

export default usePlayer


