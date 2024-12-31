import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { reroll } from '../redux/slices/ongoingGamesSlice';

interface DiceRollProps {
  game: {
    id: number;
    rolls_left: number;
    roll: number[];
    players: string[];
    playerInTurn: number;
  };
  player: string;
  enabled: boolean;
}

const DiceRoll: React.FC<DiceRollProps> = ({ game, player, enabled }) => {
  const dispatch = useDispatch();
  const [held, setHeld] = useState<boolean[]>([false, false, false, false, false]);

  useEffect(() => {
    if (game.rolls_left === 0) {
      setHeld([false, false, false, false, false]);
    }
  }, [game.rolls_left]);

  const rerollDice = () => {
    const heldIndices = held
      .map((isHeld, idx) => (isHeld ? idx : undefined))
      .filter((idx): idx is number => idx !== undefined);
    dispatch(reroll({ gameId: game.id, held: heldIndices, player }));
  };

  return (
    <div className="dice">
      {!enabled && <div className="diceheader">{game.players[game.playerInTurn]} is playing</div>}
      {game.roll.map((die, idx) => (
        <div key={idx} className={`die die${die}`}>
          {die}
          {enabled && game.rolls_left > 0 && (
            <input
              type="checkbox"
              checked={held[idx]}
              onChange={() => {
                const updatedHeld = [...held];
                updatedHeld[idx] = !updatedHeld[idx];
                setHeld(updatedHeld);
              }}
            />
          )}
        </div>
      ))}
      {enabled && game.rolls_left > 0 && (
        <button onClick={rerollDice} className="reroll">
          Re-roll
        </button>
      )}
    </div>
  );
};

export default DiceRoll;
