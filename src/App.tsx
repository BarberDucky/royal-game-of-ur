import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Die from './components/Die';
import { getRandomBool } from './model/utils';
import Board, { Tile } from './components/Board';
import Player from './components/Player';

function App() {

  const [dice, setDice] = useState([false, false, false, false]);
  const [board, setBoard] = useState([
    Tile.Empty,
    Tile.Empty,
    Tile.Empty,
    Tile.Empty,
    Tile.Empty,
    Tile.Empty,
    Tile.Empty,
    Tile.Empty,
  ])
  const [canRoll, setCanRoll] = useState(true)
  const [canMove, setCanMove] = useState(false)
  const [currentPlayer, setCurrentPlayer] = useState(1)
  const [player1, setPlayer1] = useState({
    name: '1',
    color: 'red',
    stonesCount: 2,
  })
  const [player2, setPlayer2] = useState({
    name: '2',
    color: 'blue',
    stonesCount: 2,
  })


  function rollHandler () {
    if (canRoll) {
      console.log('rolled')
      setCanRoll(false)
      setCanMove(true)
      setDice((prevState) => {
        return prevState.map(die => getRandomBool())
      })
    }
  }

  function bankHandler() {
    if (canMove) {

      const player = currentPlayer == 1 ? player1 : player2
      const playerTile = currentPlayer == 1 ? Tile.Player1 : Tile.Player2
      const opponentTile = playerTile == Tile.Player1 ? Tile.Player2 : Tile.Player1
      let opponentStones = currentPlayer == 1 ? player2.stonesCount : player1.stonesCount
      const steps = dice.reduce((acc, curr) => curr ? acc + 1 : acc, 0)
      const targetTile = board[steps]

      if (player.stonesCount < 1) {
        console.error('no more stones in the bank')
        return
      }

      if (targetTile == playerTile) {
        console.log('cant move to occupied tile')
        return
      }

      if (targetTile == opponentTile) {
        opponentStones++
      }

      if (currentPlayer == 1) {
        setPlayer1(prevState => {return {...prevState, stonesCount: prevState.stonesCount - 1}})
        setPlayer2(prevState => {return {...prevState, stonesCount: opponentStones}})
      } else {
        setPlayer2(prevState => {return {...prevState, stonesCount: prevState.stonesCount - 1}})
        setPlayer1(prevState => {return {...prevState, stonesCount: opponentStones}})
      }

      setBoard(prevState => {
        return prevState.map((tile, index) => index == steps ? playerTile : tile)
      })

      setCanMove(false)
      setCanRoll(true)
      setCurrentPlayer((prevState) => {
        return prevState == 1 ? 2 : 1
      })
    }
  }

  function tileHandler(tileId: number) {
    if (canMove) {
      const player = currentPlayer == 1 ? player1 : player2
      const playerTile = currentPlayer == 1 ? Tile.Player1 : Tile.Player2
      const opponentTile = playerTile == Tile.Player1 ? Tile.Player2 : Tile.Player1
      let opponentStones = currentPlayer == 1 ? player2.stonesCount : player1.stonesCount
      const steps = dice.reduce((acc, curr) => curr ? acc + 1 : acc, 0)
      const targetTile = board[steps + tileId]
      const selectedTile = board[tileId]!

      const tilesOnBoard = board.reduce((acc, curr) => curr == playerTile ? acc + 1 : acc, 0)

      if (selectedTile != playerTile) {
        console.log('you cant move this')
        return
      }

      if (tileId + steps > board.length) {
        console.log('cant move, not exactly to end', steps)
        return
      }

      if (targetTile == playerTile) {
        console.log('cant move to occupied tile', steps)
        return
      }

      if (player.stonesCount == 0 && tileId + steps == board.length && tilesOnBoard == 0) {
        alert(`Player ${player.name} wins!`);
      }


      if (targetTile == opponentTile) {
        opponentStones++
      }

      if (currentPlayer == 1) {
        setPlayer2(prevState => {return {...prevState, stonesCount: opponentStones}})
      } else {
        setPlayer1(prevState => {return {...prevState, stonesCount: opponentStones}})
      }

      setBoard(prevState => {
        return prevState.map((tile, index) => {
          if (index == tileId) {
            return Tile.Empty
          } else if (index == steps + tileId) {
            return playerTile
          } else {
            return tile
          }
        })
      })

      setCanMove(false)
      setCanRoll(true)
      setCurrentPlayer((prevState) => {
        return prevState == 1 ? 2 : 1
      })
    }
  }

  const diceComponents = dice.map((die, index) => {
    return <Die key={index} value={die} rollHandler={rollHandler}></Die>
  }) 

  const player1Component = <Player bankHandler={bankHandler} name={player1.name} color={player1.color} stonesCount={player1.stonesCount}></Player>
  const player2Component = <Player bankHandler={bankHandler} name={player2.name} color={player2.color} stonesCount={player2.stonesCount}></Player>

  return (
    <div className="App">
      {diceComponents}
      <Board tiles={board} tileHandler={tileHandler}></Board>
      {currentPlayer == 1 ? player1Component : player2Component}
    </div>
  );
}

export default App;
