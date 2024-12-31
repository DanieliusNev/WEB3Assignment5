import React from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../redux/slices/ongoingGamesSlice';

interface ScoreCardProps {
  game: any;
  player: string;
  enabled: boolean;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ game, player, enabled }) => {
  const dispatch = useDispatch();

  const handleRegister = (key: string) => {
    if (enabled) {
      dispatch(register({ gameId: game.id, slot: key, player }));
    }
  };

  return (
    <div className="score">
      <table className="scorecard">
        <thead>
          <tr className="section_header">
            <th colSpan={game.players.length + 2}>Upper Section</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Type</td>
            <td>Target</td>
            {game.players.map((player: string, index: number) => (
              <td key={index}>{player}</td>
            ))}
          </tr>
          {game.upper_sections.map((val: any, idx: number) => (
            <tr key={idx}>
              <td>{val.type}</td>
              <td>{val.target}</td>
              {game.players.map((p: string, index: number) => (
                <td
                  key={index}
                  onClick={() => handleRegister(val.type)}
                  className={
                    enabled && game.playerInTurn === index ? 'activeplayer' : ''
                  }
                >
                  {val.scores[p] ?? ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreCard;
