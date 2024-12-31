import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './slices/playerSlice.ts';
import pendingGamesReducer from './slices/pendingGamesSlice.ts';
import ongoingGamesReducer from './slices/ongoingGamesSlice.ts';

const store = configureStore({
  reducer: {
    player: playerReducer,
    pendingGames: pendingGamesReducer,
    ongoingGames: ongoingGamesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
