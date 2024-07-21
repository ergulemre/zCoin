import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WebSocketState, WebSocketMessage } from './types';

// Define initial state
const initialState: WebSocketState = {
  prices: {},
  visibleSymbols: [],
  error: '',
};

// Create a slice of the store
const websocketSlice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    websocketConnect: (state) => {
      // Logic to handle websocket connection initiation
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    websocketDisconnect: (state) => {},
    websocketError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    updateCoinSymbols: (state, action: PayloadAction<string[]>) => {
      state.visibleSymbols = action.payload;
    },
    websocketMessage: (state, action: PayloadAction<WebSocketMessage>) => {
      const { s, p } = action.payload;
      state.prices[s] = p; // Update the price for the given symbol
    },
  },
});

export const {
  websocketConnect,
  websocketDisconnect,
  updateCoinSymbols,
  websocketMessage,
  websocketError,
} = websocketSlice.actions;

export default websocketSlice.reducer;
