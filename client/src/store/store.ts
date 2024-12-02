import { create } from 'zustand';

interface GameState {
  points: number;
  totalFlushes: number;
  lastFlushTimestamp: number | null;
  comboStreak: number;
  lastComboTime: number | null;

  // Setters
  setPoints: (points: number) => void;
  setTotalFlushes: (totalFlushes: number) => void;
  setLastFlushTimestamp: (timestamp: number) => void;
  setComboStreak: (streak: number) => void;
  setLastComboTime: (time: number) => void;
}

const useGameStore = create<GameState>((set) => ({
  points: 0,
  totalFlushes: 0,
  lastFlushTimestamp: null,
  comboStreak: 0,
  lastComboTime: null,

  setPoints: (points) => set(() => ({ points })),
  setTotalFlushes: (totalFlushes) => set(() => ({ totalFlushes })),
  setLastFlushTimestamp: (timestamp) => set(() => ({ lastFlushTimestamp: timestamp })),
  setComboStreak: (streak) => set(() => ({ comboStreak: streak })),
  setLastComboTime: (time) => set(() => ({ lastComboTime: time })),
}));

export const gameStore = useGameStore.getState; // Access store instance directly
export default useGameStore;
