import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store.ts';
import { joinGame } from '../model/api.ts';

const Pending: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const player = useSelector((state: RootState) => state.player.player);
  const pendingGames = useSelector((state: RootState) => state.pendingGames.games);
  const game = pendingGames.find((g) => g.id === parseInt(id || '', 10));

  const handleJoin = async () => {
    if (game && player) {
      await joinGame(game.id, player);
      navigate(`/game/${game.id}`);
    }
  };

  if (!game) {
    return <p>Game not found or no longer pending.</p>;
  }

  return (
    <div>
      <h1>Game #{game.id}</h1>
      <p>Creator: {game.creator}</p>
      <p>Players: {game.players.join(', ')}</p>
      <p>Available Seats: {(game.number_of_players ?? 2) - game.players.length}</p>
      {player && game.players.indexOf(player) === -1 && (
        <button onClick={handleJoin}>Join Game</button>
      )}
    </div>
  );
};

export default Pending;
