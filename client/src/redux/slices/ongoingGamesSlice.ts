import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IndexedYahtzee } from '../../model/game';

interface OngoingGamesState {
  games: IndexedYahtzee[];
}

const initialState: OngoingGamesState = {
  games: [],
};

const ongoingGamesSlice = createSlice({
  name: 'ongoingGames',
  initialState,
  reducers: {
    setGames(state, action: PayloadAction<IndexedYahtzee[]>) {
      state.games = action.payload;
    },
    addGame(state, action: PayloadAction<IndexedYahtzee>) {
      state.games.push(action.payload);
    },
    updateGame(state, action: PayloadAction<IndexedYahtzee>) {
      const index = state.games.findIndex(game => game.id === action.payload.id);
      if (index !== -1) {
        state.games[index] = action.payload;
      }
    },
    removeGame(state, action: PayloadAction<number>) {
      state.games = state.games.filter(game => game.id !== action.payload);
    },
    reroll(state, action: PayloadAction<{ gameId: number; held: number[]; player: string }>) {
      const game = state.games.find(game => game.id === action.payload.gameId);
      if (game && game.players[game.playerInTurn] === action.payload.player) {
        // Simulate reroll logic by only changing dice not held
        game.roll = game.roll.map((die, idx) =>
          action.payload.held.includes(idx)
            ? die
            : (Math.floor(Math.random() * 6) + 1) as 1 | 2 | 3 | 4 | 5 | 6
        );
        game.rolls_left -= 1; // Decrease the number of rolls left
      }
    }
    ,
    register(state, action: PayloadAction<{ gameId: number; slot: string; player: string }>) {
      const game = state.games.find(game => game.id === action.payload.gameId);
      if (game && game.players[game.playerInTurn] === action.payload.player) {
        // Simulate registering a score (placeholder logic)
        const currentPlayerIndex = game.playerInTurn;

        if (game.upper_sections[currentPlayerIndex].scores[action.payload.slot] === undefined) {
          game.upper_sections[currentPlayerIndex].scores[action.payload.slot] = 10; // Example static score
        }

        // Move to the next player
        game.playerInTurn = (game.playerInTurn + 1) % game.players.length;
        game.roll = [1, 1, 1, 1, 1]; // Reset dice roll
        game.rolls_left = 3; // Reset rolls left
      }
    },
  },
});

export const { setGames, addGame, updateGame, removeGame, reroll, register } = ongoingGamesSlice.actions;

export default ongoingGamesSlice.reducer;
