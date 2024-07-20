// store.ts
import { configureStore } from '@reduxjs/toolkit';
import coinReducer from './features/coin/coinSlice'; // Adjust path as needed
import websocketReducer from './features/websocket/websocketSlice'; // Adjust path as needed
import createSagaMiddleware from 'redux-saga';
import { websocketSaga } from './sagas/websocketSaga'; // Adjust path as needed

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    coin: coinReducer,
    websocket: websocketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(websocketSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
