import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    player: undefined,
};
const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setPlayer(state, action) {
            state.player = action.payload;
        },
        clearPlayer(state) {
            state.player = undefined;
        },
    },
});
export const { setPlayer, clearPlayer } = playerSlice.actions;
export default playerSlice.reducer;
