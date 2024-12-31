import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Lobby from './Lobby.tsx';
import Login from './Login.tsx';
import Pending from './Pending.tsx';
import Game from './Game.tsx';

const App: React.FC = () => {
  return (
    <div id="app">
      <header>
        <h1>Yahtzee</h1>
        <nav>
          <Link to="/">Lobby</Link>
          <Link to="/login">Login</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Lobby />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pending/:id" element={<Pending />} />
          <Route path="/game/:id" element={<Game />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
