import { createStore } from 'zustand/vanilla'

export type CounterState = {
  nftCount: number
}

export type CounterActions = {
  incrementCount: () => void
}

export type CounterStore = CounterState & CounterActions

export const defaultInitState: CounterState = {
    nftCount: 0,
}

export const createCounterStore = (
  initState: CounterState = defaultInitState,
) => {
  return createStore<CounterStore>()((set) => ({
    ...initState,
    incrementCount: () => set((state) => ({ nftCount: state.nftCount + 1 })),
  }))
}