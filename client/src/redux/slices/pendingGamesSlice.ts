import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IndexedYahtzeeSpecs } from '../../model/game';

interface PendingGamesState {
  games: IndexedYahtzeeSpecs[];
}

const initialState: PendingGamesState = {
  games: [],
};

const pendingGamesSlice = createSlice({
  name: 'pendingGames',
  initialState,
  reducers: {
    setGames(state, action: PayloadAction<IndexedYahtzeeSpecs[]>) {
      state.games = action.payload;
    },
    addGame(state, action: PayloadAction<IndexedYahtzeeSpecs>) {
      state.games.push(action.payload);
    },
    updateGame(state, action: PayloadAction<IndexedYahtzeeSpecs>) {
      const index = state.games.findIndex(game => game.id === action.payload.id);
      if (index !== -1) {
        state.games[index] = action.payload;
      }
    },
    removeGame(state, action: PayloadAction<number>) {
      state.games = state.games.filter(game => game.id !== action.payload);
    },
  },
});

export const { setGames, addGame, updateGame, removeGame } = pendingGamesSlice.actions;

export default pendingGamesSlice.reducer;
