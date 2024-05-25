import React, { useState } from 'react';
import './App3D.css';
import { Game, GameState } from '../../model/Game';
import { Canvas } from '@react-three/fiber';
import Board from './Board';
import { OrbitControls, useGLTF } from '@react-three/drei';
import Die from './Die';
import Player from './Player';

function App3D() {

  const [gameObj, setGameObj] = useState<Game>(new Game())
  const [game, setGame] = useState<GameState>(gameObj.getState())

  function rollHandler() {
    gameObj.rollHandler()
    setGame(prevState => ({
      ...prevState,
      ...gameObj.getState(),
    }))
  }

  function bankHandler() {
    gameObj.bankHandler()
    setGame(prevState => ({
      ...prevState,
      ...gameObj.getState(),
    }))
  }

  function tileHandler(tileId: number) {
    gameObj.tileHandler(tileId)
    setGame(prevState => ({
      ...prevState,
      ...gameObj.getState(),
    }))
  }

  const diceComponents = game.dice.map((die, index) => {
    return <Die
      key={index}
      sides={die}
      onClick={rollHandler}
      position={[-3 + index * 2, -1, -7]}
    >
    </Die>
  })

  const player1Component = <Player bankHandler={bankHandler} name={game.player1.name} color={game.player1.color} stonesCount={game.player1.stonesCount}></Player>
  const player2Component = <Player bankHandler={bankHandler} name={game.player2.name} color={game.player2.color} stonesCount={game.player2.stonesCount}></Player>

  const status = game.canRoll
    ? `ROLL PLAYER ${game.currentPlayer}`
    : game.canMove
      ? `MOVE PLAYER ${game.currentPlayer} BY ${gameObj.getSteps()}`
      : `I DONT KNOW?!?! PLAYER ${game.currentPlayer}`

  return (
    <div className="App3D">
      <Canvas camera={{ position: [0, 19, 1] }} >
        <color attach="background" args={[0.1, 0.1, 0.1]} />
        <ambientLight intensity={1} />
        <pointLight position={[0, 7, -6]} decay={1} intensity={20} />
        {diceComponents}
        <Board tiles={game.board} tileHandler={tileHandler}></Board>
        {game.currentPlayer == 1 ? player1Component : player2Component}
        <OrbitControls />
      </Canvas>
      <span style={{
        position: 'fixed',
        top: 50,
        left: 0,
        width: '100vw',
        textAlign: 'center',
        fontSize: 50,
        color: 'white',
      }}>{status}</span>
    </div>
  );
}
useGLTF.preload('/ur-no-bump-tint.glb')

export default App3D;
