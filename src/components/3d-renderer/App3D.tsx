import React, { useState } from 'react';
import './App3D.css';
import { Game, GameState } from '../../model/Game';

function App3D() {

  const [gameObj, setGameObj] = useState<Game>(new Game())
  const [game, setGame] = useState<GameState>(gameObj.getState())

  return (
    <div className="App3D">
      <span style={{ fontSize: 50 }}>3D RENDERER</span>
    </div>
  );
}

export default App3D;
