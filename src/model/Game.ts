import { getRandomInt } from "./utils"

export enum TileType {
  Standard = 'Standard',
  Rosette = 'Rosette'
}

export interface TileData {
  tileType: TileType
  stone: StoneColor | null
}

export type StoneColor = keyof typeof colorScheme

export const colorScheme = {
  black: { fill: 'black', dots: 'white' },
  white: { fill: 'white', dots: 'black' },
}

function t(): TileData {
  return { tileType: TileType.Standard, stone: null }
}

function r(): TileData {
  return { tileType: TileType.Rosette, stone: null }
}

export interface PlayerState {
  name: string
  color: "black" | "white"
  stonesCount: number
  boardPath: number[]
}

export interface GameState {
  dice: number[][]
  board: TileData[]
  canRoll: boolean
  canMove: boolean
  currentPlayer: number
  player1: PlayerState
  player2: PlayerState
}

export class Game {

  private dice!: number[][]
  private board!: TileData[]
  private canRoll!: boolean
  private canMove!: boolean
  private currentPlayer!: number
  private player1!: PlayerState
  private player2!: PlayerState

  public constructor(
  ) {
    this.resetState()
  }

  public getState() {
    return {
      dice: this.dice,
      board: this.board,
      canRoll: this.canRoll,
      canMove: this.canMove,
      currentPlayer: this.currentPlayer,
      player1: this.player1,
      player2: this.player2,
    }
  }

  private canMoveFromBank(steps: number): boolean {
    const player = this.currentPlayer == 1 ? this.player1 : this.player2
    const playerTile = this.currentPlayer == 1 ? 'black' : 'white'
    const playerPathIndex = player.boardPath[steps - 1]
    const targetTile = this.board[playerPathIndex]

    if (
      player.stonesCount < 1 ||
      targetTile.stone == playerTile
    ) {
      return false
    }

    return true
  }

  private canMoveStoneFromBoard(tileId: number, steps: number): boolean {
    const player = this.currentPlayer == 1 ? this.player1 : this.player2
    const playerTile = this.currentPlayer == 1 ? 'black' : 'white'
    const currentPlayerPathIndex = player.boardPath.findIndex(tile => tile == tileId)
    const playerPathIndex = player.boardPath[steps + currentPlayerPathIndex]

    if (steps + currentPlayerPathIndex > player.boardPath.length) {
      return false
    }

    const targetTile = this.board[playerPathIndex]
    const selectedTile = this.board[tileId]

    if (
      steps + currentPlayerPathIndex > player.boardPath.length ||
      selectedTile.stone != playerTile ||
      (targetTile != null && targetTile.stone == playerTile)
    ) {
      return false
    }

    return true
  }

  private canMoveFromBoard(steps: number): boolean {
    let canMove = false
    for (let i = 0; i < this.board.length; i++) {
      canMove ||= this.canMoveStoneFromBoard(i, steps)
    }
    return canMove
  }

  private resetState() {
    this.dice = [[0, 1], [1, 3], [2, 3], [0, 2]]
    this.board = [
      r(), t(), t(), t(), r(), t(),
      t(), t(), t(), r(), t(), t(), t(), t(),
      r(), t(), t(), t(), r(), t(),
    ]
    this.canRoll = true
    this.canMove = false
    this.currentPlayer = 1
    this.player1 = {
      name: '1',
      color: 'black' as StoneColor,
      stonesCount: 2,
      boardPath: [17, 16, 15, 14, 6, 7, 8, 9, 10, 11, 12, 13, 19, 18],
    }
    this.player2 = {
      name: '2',
      color: 'white' as StoneColor,
      stonesCount: 2,
      boardPath: [3, 2, 1, 0, 6, 7, 8, 9, 10, 11, 12, 13, 5, 4],
    }
  }

  private getRandomDiceState() {
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

  private getDiceValueFromState(diceState: number[]) {
    return diceState.includes(3)
  }

  public getSteps() {
    const steps = this.dice.reduce((acc, curr) => this.getDiceValueFromState(curr) ? acc + 1 : acc, 0)
    return steps
  }

  public rollHandler() {
    if (this.canRoll) {

      const newDice = this.dice.map(() => this.getRandomDiceState())
      const steps = newDice.reduce((acc, curr) => this.getDiceValueFromState(curr) ? acc + 1 : acc, 0)

      this.dice = newDice

      if (steps < 1) {
        this.currentPlayer = this.currentPlayer == 1 ? 2 : 1

      } else {
        const validMovesExist = this.canMoveFromBank(steps) || this.canMoveFromBoard(steps)

        if (validMovesExist) {
          this.canRoll = false
          this.canMove = true
        } else {
          this.currentPlayer = this.currentPlayer == 1 ? 2 : 1
        }
      }
    }
  }

  public bankHandler() {
    if (this.canMove) {
      const player = this.currentPlayer == 1 ? this.player1 : this.player2
      const playerTile = this.currentPlayer == 1 ? 'black' : 'white'
      const opponentTile = playerTile == 'black' ? 'white' : 'black'
      let opponentStones = this.currentPlayer == 1 ? this.player2.stonesCount : this.player1.stonesCount
      const steps = this.dice.reduce((acc, curr) => this.getDiceValueFromState(curr) ? acc + 1 : acc, 0)
      const playerPathIndex = player.boardPath[steps - 1]
      const targetTile = this.board[playerPathIndex]

      if (!this.canMoveFromBank(steps)) {
        return
      }

      if (targetTile != null && targetTile.stone == opponentTile) {
        opponentStones++
      }

      if (this.currentPlayer == 1) {
        this.player1 = { ...this.player1, stonesCount: this.player1.stonesCount - 1 }
        this.player2 = { ...this.player2, stonesCount: opponentStones }
      } else {
        this.player2 = { ...this.player2, stonesCount: this.player2.stonesCount - 1 }
        this.player1 = { ...this.player1, stonesCount: opponentStones }
      }

      this.board = this.board.map((tile, index) => index == playerPathIndex ? { tileType: tile.tileType, stone: playerTile } : tile)

      this.canMove = false
      this.canRoll = true

      if (targetTile == null || targetTile.tileType != TileType.Rosette) {
        this.currentPlayer = this.currentPlayer == 1 ? 2 : 1
      }
    }
  }

  public tileHandler(tileId: number) {
    if (this.canMove) {
      const player = this.currentPlayer == 1 ? this.player1 : this.player2
      const playerTile = this.currentPlayer == 1 ? 'black' : 'white'
      const opponentTile = playerTile == 'black' ? 'white' : 'black'
      let opponentStones = this.currentPlayer == 1 ? this.player2.stonesCount : this.player1.stonesCount
      const steps = this.dice.reduce((acc, curr) => this.getDiceValueFromState(curr) ? acc + 1 : acc, 0)
      const currentPlayerPathIndex = player.boardPath.findIndex(tile => tile == tileId)
      const playerPathIndex = player.boardPath[steps + currentPlayerPathIndex]

      if (steps + currentPlayerPathIndex > player.boardPath.length) {
        return false
      }

      const targetTile = this.board[playerPathIndex]

      const tilesOnBoard = this.board.reduce((acc, curr) => curr.stone == playerTile ? acc + 1 : acc, 0)

      if (!this.canMoveStoneFromBoard(tileId, steps)) {
        return
      }

      if (player.stonesCount == 0 && steps + currentPlayerPathIndex == player.boardPath.length && tilesOnBoard == 1) {
        alert(`Player ${player.name} wins!`);
        this.resetState()
        return
      }

      if (targetTile != null && targetTile.stone == opponentTile) {
        opponentStones++
      }

      if (this.currentPlayer == 1) {
        this.player2 = { ...this.player2, stonesCount: opponentStones }
      } else {
        this.player1 = { ...this.player1, stonesCount: opponentStones }
      }

      this.board = this.board.map((tile, index) => {
        if (index == tileId) {
          return { tileType: tile.tileType, stone: null }
        } else if (index == playerPathIndex) {
          return { tileType: tile.tileType, stone: playerTile }
        } else {
          return tile
        }
      })

      this.canMove = false
      this.canRoll = true
      if (targetTile == null || targetTile.tileType != TileType.Rosette) {
        this.currentPlayer = this.currentPlayer == 1 ? 2 : 1
      }
    }
  }

}