import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Game: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const ongoingGames = useSelector((state: RootState) => state.ongoingGames.games);
  const game = ongoingGames.find((g) => g.id === parseInt(id || '', 10));

  if (!game) {
    return <p>Game not found or no longer active.</p>;
  }

  return (
    <div>
      <h1>Game #{game.id}</h1>
      <p>Players: {game.players.join(', ')}</p>
      <p>Current Turn: {game.players[game.playerInTurn]}</p>
      {/* Additional game-specific details go here */}
    </div>
  );
};

export default Game;
