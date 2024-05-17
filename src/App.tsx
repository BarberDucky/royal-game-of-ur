import React, { useState } from 'react';
import './App.css';
import Die from './components/Die';
import Board from './components/Board';
import Player from './components/Player';
import { Game, GameState } from './model/Game';

function App() {

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
    return <Die key={index} sides={die} rollHandler={rollHandler} size={100}></Die>
  })

  const player1Component = <Player bankHandler={bankHandler} name={game.player1.name} color={game.player1.color} stonesCount={game.player1.stonesCount}></Player>
  const player2Component = <Player bankHandler={bankHandler} name={game.player2.name} color={game.player2.color} stonesCount={game.player2.stonesCount}></Player>

  const status = game.canRoll
    ? `ROLL! PLAYER ${game.currentPlayer}`
    : game.canMove
      ? `MOVE! PLAYER ${game.currentPlayer}`
      : `I DONT KNOW?!?! PLAYER ${game.currentPlayer}`

  return (
    <div className="App">
      <span style={{ fontSize: 50 }}>{status}</span><br></br>
      {diceComponents}
      <Board tiles={game.board} tileHandler={tileHandler}></Board>
      {game.currentPlayer == 1 ? player1Component : player2Component}
    </div>
  );
}

export default App;
