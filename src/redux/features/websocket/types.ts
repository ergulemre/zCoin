// src/features/websocket/types.ts

export interface WebSocketMessage {
  s: string; // Symbol
  p: number; // Price
}

export interface WebSocketState {
  prices: Record<string, number>;
  error: string;
  visibleSymbols: string[];
}
