import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setPlayer } from '../redux/slices/playerSlice.ts';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(setPlayer(username));
    const pendingGame = searchParams.get('pending');
    const ongoingGame = searchParams.get('game');
    if (pendingGame) navigate(`/pending/${pendingGame}`);
    else if (ongoingGame) navigate(`/game/${ongoingGame}`);
    else navigate('/');
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleLogin} disabled={!username}>
        Login
      </button>
    </div>
  );
};

export default Login;
