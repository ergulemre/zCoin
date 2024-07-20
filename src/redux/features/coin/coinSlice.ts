import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the type for a coin
interface Coin {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
}

// Define the type for the state
interface CoinsState {
  coins: Coin[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CoinsState = {
  coins: [],
  status: 'idle',
};

// Define an async thunk for fetching coins
export const fetchCoins = createAsyncThunk('coins/fetchCoins', async () => {
  const response = await axios.get(
    'https://api.coingecko.com/api/v3/coins/markets',
    {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 100,
        page: 1,
      },
    }
  );
  return response.data;
});

// Create a slice for coins
const coinsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCoins.fulfilled, (state, action: PayloadAction<Coin[]>) => {
        state.coins = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchCoins.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default coinsSlice.reducer;
