import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store.ts';
import { createNewGame } from '../model/api.ts';

const Lobby: React.FC = () => {
  const navigate = useNavigate();
  const player = useSelector((state: RootState) => state.player.player);
  const [numberOfPlayers, setNumberOfPlayers] = useState(2);

  const handleNewGame = async () => {
    if (player) {
      const newGame = await createNewGame(numberOfPlayers, player);
      navigate(`/pending/${newGame.id}`);
    } else {
      navigate('/login');
    }
  };

  return (
    <div>
      <h1>Lobby</h1>
      {player ? (
        <>
          <label>
            Number of players:
            <input
              type="number"
              min="2"
              value={numberOfPlayers}
              onChange={(e) => setNumberOfPlayers(parseInt(e.target.value))}
            />
          </label>
          <button onClick={handleNewGame}>Create Game</button>
        </>
      ) : (
        <p>You need to log in to create a game.</p>
      )}
    </div>
  );
};

export default Lobby;
