import { create } from 'zustand';
import type { Market } from '../types/market.ts';

interface MarketState {
  markets: Market[];
  loading: boolean;
  error: string | null;
  fetchMarkets: () => void;
}

export const useMarketStore = create<MarketState>((set) => ({
  markets: [],
  loading: false,
  error: null,
  fetchMarkets: () => {
    set({ loading: true });
    // Simulate fetching data (replace with API/blockchain call later)
    const mockMarkets: Market[] = [
      {
        id: '1',
        title: 'Will Bitcoin reach $100K by Dec 2025?',
        endDate: new Date('2025-12-31').getTime(),
        tonPool: 500,
        usdtPool: 1000,
      },
      {
        id: '2',
        title: 'Will Team A win the championship?',
        endDate: new Date('2025-06-30').getTime(),
        tonPool: 200,
        usdtPool: 750,
      },
    ];
    setTimeout(() => {
      // Simulate network delay
      set({ markets: mockMarkets, loading: false });
    }, 1000);
  },
}));