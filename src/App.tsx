import React, { useState } from 'react';
import './App.css';
import Die from './components/Die';
import { getRandomInt } from './model/utils';
import Board from './components/Board';
import Player from './components/Player';
import { StoneColor } from './components/Stone';
import { TileData, TileType } from './components/Tile';

function App() {

  const [dice, setDice] = useState<Array<Array<number>>>([[0, 1], [1, 3], [2, 3], [0, 2]]);
  const [board, setBoard] = useState<Array<TileData>>([
    { tileType: TileType.Standard, stone: null },
    { tileType: TileType.Standard, stone: null },
    { tileType: TileType.Standard, stone: null },
    { tileType: TileType.Special, stone: null },
    { tileType: TileType.Standard, stone: null },
    { tileType: TileType.Standard, stone: null },
    { tileType: TileType.Standard, stone: null },
    { tileType: TileType.Standard, stone: null },
  ])
  const [canRoll, setCanRoll] = useState(true)
  const [canMove, setCanMove] = useState(false)
  const [currentPlayer, setCurrentPlayer] = useState(1)
  const [player1, setPlayer1] = useState({
    name: '1',
    color: 'black' as StoneColor,
    stonesCount: 2,
  })
  const [player2, setPlayer2] = useState({
    name: '2',
    color: 'white' as StoneColor,
    stonesCount: 2,
  })


  function getRandomDiceState() {
    const diceStates = [
      [0, 1],
      [0, 2],
      [0, 3],
      [1, 2],
      [1, 3],
      [2, 3],
    ]

    return diceStates[getRandomInt(diceStates.length)]
  }

  function getDiceValueFromState(diceState: number[]) {
    return diceState.includes(3)
  }

  function canMoveFromBank(steps: number): boolean {
    const player = currentPlayer == 1 ? player1 : player2
    const playerTile = currentPlayer == 1 ? 'black' : 'white'
    const targetTile = board[steps - 1]

    if (
      player.stonesCount < 1 ||
      targetTile.stone == playerTile
    ) {
      return false
    }

    return true
  }

  function canMoveStoneFromBoard(tileId: number, steps: number): boolean {
    const playerTile = currentPlayer == 1 ? 'black' : 'white'
    const targetTile = board[steps + tileId]
    const selectedTile = board[tileId]

    if (
      tileId + steps > board.length ||
      selectedTile.stone != playerTile ||
      (targetTile != null && targetTile.stone == playerTile)
    ) {
      return false
    }

    return true
  }

  function canMoveFromBoard(steps: number): boolean {
    let canMove = false
    for (let i = 0; i < board.length; i++) {
      canMove ||= canMoveStoneFromBoard(i, steps)
    }
    return canMove
  }

  function resetState() {
    setDice([[0, 1], [1, 3], [2, 3], [0, 2]])
    setBoard([
      { tileType: TileType.Standard, stone: null },
      { tileType: TileType.Standard, stone: null },
      { tileType: TileType.Standard, stone: null },
      { tileType: TileType.Special, stone: null },
      { tileType: TileType.Standard, stone: null },
      { tileType: TileType.Standard, stone: null },
      { tileType: TileType.Standard, stone: null },
      { tileType: TileType.Standard, stone: null },
    ])
    setCanRoll(true)
    setCanMove(false)
    setCurrentPlayer(1)
    setPlayer1({
      name: '1',
      color: 'black' as StoneColor,
      stonesCount: 2,
    })
    setPlayer2({
      name: '2',
      color: 'white' as StoneColor,
      stonesCount: 2,
    })
  }

  function rollHandler() {
    if (canRoll) {

      const newDice = dice.map(() => getRandomDiceState())
      const steps = newDice.reduce((acc, curr) => getDiceValueFromState(curr) ? acc + 1 : acc, 0)

      setDice(newDice)

      if (steps < 1) {
        setCurrentPlayer((prevState) => {
          return prevState == 1 ? 2 : 1
        })
      } else {
        const validMovesExist = canMoveFromBank(steps) || canMoveFromBoard(steps)

        if (validMovesExist) {
          setCanRoll(false)
          setCanMove(true)
        } else {
          setCurrentPlayer((prevState) => {
            return prevState == 1 ? 2 : 1
          })
        }
      }
    }
  }

  function bankHandler() {
    if (canMove) {

      const playerTile = currentPlayer == 1 ? 'black' : 'white'
      const opponentTile = playerTile == 'black' ? 'white' : 'black'
      let opponentStones = currentPlayer == 1 ? player2.stonesCount : player1.stonesCount
      const steps = dice.reduce((acc, curr) => getDiceValueFromState(curr) ? acc + 1 : acc, 0)
      const targetTile = board[steps - 1]

      if (!canMoveFromBank(steps)) {
        return
      }

      if (targetTile != null && targetTile.stone == opponentTile) {
        opponentStones++
      }

      if (currentPlayer == 1) {
        setPlayer1(prevState => { return { ...prevState, stonesCount: prevState.stonesCount - 1 } })
        setPlayer2(prevState => { return { ...prevState, stonesCount: opponentStones } })
      } else {
        setPlayer2(prevState => { return { ...prevState, stonesCount: prevState.stonesCount - 1 } })
        setPlayer1(prevState => { return { ...prevState, stonesCount: opponentStones } })
      }

      setBoard(prevState => {
        return prevState.map((tile, index) => index == steps - 1 ? { tileType: tile.tileType, stone: playerTile } : tile)
      })

      setCanMove(false)
      setCanRoll(true)

      if (targetTile == null || targetTile.tileType != TileType.Special) {
        setCurrentPlayer((prevState) => {
          return prevState == 1 ? 2 : 1
        })
      }
    }
  }

  function tileHandler(tileId: number) {
    if (canMove) {
      const player = currentPlayer == 1 ? player1 : player2
      const playerTile = currentPlayer == 1 ? 'black' : 'white'
      const opponentTile = playerTile == 'black' ? 'white' : 'black'
      let opponentStones = currentPlayer == 1 ? player2.stonesCount : player1.stonesCount
      const steps = dice.reduce((acc, curr) => getDiceValueFromState(curr) ? acc + 1 : acc, 0)
      const targetTile = board[steps + tileId]

      const tilesOnBoard = board.reduce((acc, curr) => curr.stone == playerTile ? acc + 1 : acc, 0)

      if (!canMoveStoneFromBoard(tileId, steps)) {
        return
      }

      if (player.stonesCount == 0 && tileId + steps == board.length && tilesOnBoard == 1) {
        alert(`Player ${player.name} wins!`);
        resetState()
        return
      }

      if (targetTile != null && targetTile.stone == opponentTile) {
        opponentStones++
      }

      if (currentPlayer == 1) {
        setPlayer2(prevState => { return { ...prevState, stonesCount: opponentStones } })
      } else {
        setPlayer1(prevState => { return { ...prevState, stonesCount: opponentStones } })
      }

      setBoard(prevState => {
        return prevState.map((tile, index) => {
          if (index == tileId) {
            return { tileType: tile.tileType, stone: null }
          } else if (index == steps + tileId) {
            return { tileType: tile.tileType, stone: playerTile }
          } else {
            return tile
          }
        })
      })

      setCanMove(false)
      setCanRoll(true)
      if (targetTile == null || targetTile.tileType != TileType.Special) {
        setCurrentPlayer((prevState) => {
          return prevState == 1 ? 2 : 1
        })
      }
    }
  }

  const diceComponents = dice.map((die, index) => {
    return <Die key={index} sides={die} rollHandler={rollHandler} size={100}></Die>
  })

  const player1Component = <Player bankHandler={bankHandler} name={player1.name} color={player1.color} stonesCount={player1.stonesCount}></Player>
  const player2Component = <Player bankHandler={bankHandler} name={player2.name} color={player2.color} stonesCount={player2.stonesCount}></Player>

  const status = canRoll
    ? `ROLL! PLAYER ${currentPlayer}`
    : canMove
      ? `MOVE! PLAYER ${currentPlayer}`
      : `I DONT KNOW?!?! PLAYER ${currentPlayer}`

  return (
    <div className="App">
      <span style={{ fontSize: 50 }}>{status}</span><br></br>
      {diceComponents}
      <Board tiles={board} tileHandler={tileHandler}></Board>
      {currentPlayer == 1 ? player1Component : player2Component}
    </div>
  );
}

export default App;
