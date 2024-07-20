import {
  call,
  put,
  take,
  all,
  fork,
  takeLatest,
  select,
} from 'redux-saga/effects';
import { eventChannel, EventChannel } from 'redux-saga';
import {
  websocketConnect,
  websocketMessage,
  websocketDisconnect,
  websocketError,
} from '../features/websocket/websocketSlice';
import { fetchCoins } from '../features/coin/coinSlice';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createWebSocketChannel(symbols: string[]): EventChannel<any> {
  const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbols}`);

  return eventChannel((emitter) => {
    ws.onmessage = (event: MessageEvent) => {
      // Cast event to MessageEvent to access data
      emitter(JSON.parse(event.data));
    };

    ws.onerror = (error: Event) => {
      emitter(new Error((error as ErrorEvent).message));
    };

    ws.onclose = () => {
      emitter(new Event('close'));
    };

    return () => {
      ws.close();
    };
  });
}

function* handleWebSocketConnect() {
  try {
    // Fetch the coins first
    yield put(fetchCoins());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const coins: any = yield take(fetchCoins.fulfilled);
    // Extract symbols and construct the WebSocket endpoint
    let symbols = coins.payload
      .map((coin) => `${coin.symbol.toLowerCase()}usdt@trade`)
      .join('/');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let channel: EventChannel<any> = yield call(
      createWebSocketChannel,
      symbols
    );

    while (true) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = yield take(channel as EventChannel<any>);
      if (data instanceof Error) {
        yield put(websocketError(data.message));
      } else {
        const { visibleSymbols } = yield select((state) => state.websocket);

        if (visibleSymbols.length > 0) {
          symbols = visibleSymbols
            .map((symbol) => `${symbol.toLowerCase()}@trade`)
            .join('/');
          channel = yield call(createWebSocketChannel, symbols);
        }
      }
      yield put(websocketMessage(data));
    }
  } catch (error) {
    yield put(
      websocketError('An error occurred while handling WebSocket messages')
    );
  }
}

function* watchWebSocket() {
  yield takeLatest(websocketConnect.type, handleWebSocketConnect);
  yield takeLatest(websocketDisconnect.type, function* () {
    // Handle WebSocket disconnection
    // Logic to close the WebSocket connection can be added here
  });
}

export function* websocketSaga() {
  yield all([fork(watchWebSocket)]);
}
