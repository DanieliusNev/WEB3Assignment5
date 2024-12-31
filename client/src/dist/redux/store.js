import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './slices/playerSlice';
import pendingGamesReducer from './slices/pendingGamesSlice';
import ongoingGamesReducer from './slices/ongoingGamesSlice';
const store = configureStore({
    reducer: {
        player: playerReducer,
        pendingGames: pendingGamesReducer,
        ongoingGames: ongoingGamesReducer,
    },
});
export default store;
