import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    games: [],
};
const ongoingGamesSlice = createSlice({
    name: 'ongoingGames',
    initialState,
    reducers: {
        setGames(state, action) {
            state.games = action.payload;
        },
        addGame(state, action) {
            state.games.push(action.payload);
        },
        updateGame(state, action) {
            const index = state.games.findIndex(game => game.id === action.payload.id);
            if (index !== -1) {
                state.games[index] = action.payload;
            }
        },
        removeGame(state, action) {
            state.games = state.games.filter(game => game.id !== action.payload);
        },
    },
});
export const { setGames, addGame, updateGame, removeGame } = ongoingGamesSlice.actions;
export default ongoingGamesSlice.reducer;
