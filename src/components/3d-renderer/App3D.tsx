import React, { useRef, useState } from 'react';
import './App3D.css';
import { Game, GameState } from '../../model/Game';
import { Canvas, useFrame } from '@react-three/fiber';
import Board from './Board';
import { OrbitControls, useGLTF } from '@react-three/drei';
import Die from './Die';
import Player from './Player';
import { DoubleSide, Group, Vector3 } from 'three';
import ResponsiveCamera from './ResponsiveCamera';
import AnimationDriver from './AnimationDriver';

function App3D() {

  const [gameObj, setGameObj] = useState<Game>(new Game())
  const [game, setGame] = useState<GameState>(gameObj.getState())

  const sceneRef = useRef<Group>(null!)

  function rollHandler() {
    gameObj.rollHandler()
    setGame(prevState => ({
      ...prevState,
      ...gameObj.getState(),
    }))
  }

  function bankHandler(color: 'black' | 'white') {
    const currentPlayerColor = game.currentPlayer == 1 ? 'black' : 'white'
    if (color != currentPlayerColor) {
      return
    }

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
    const position = [-3 + index * 2, 1, 0]

    return <Die
      key={index}
      sides={die}
      onClick={rollHandler}
      position={position as unknown as Vector3}
      castShadow
      canRoll={game.canRoll}
    >
    </Die>
  })

  const status = game.canRoll
    ? `ROLL PLAYER ${game.currentPlayer}`
    : game.canMove
      ? `MOVE PLAYER ${game.currentPlayer} BY ${gameObj.getSteps()}`
      : `I DONT KNOW?!?! PLAYER ${game.currentPlayer}`

  const canMoveFromBank = gameObj.canMoveStonesFromBank()

  return (
    <div className="App3D">
      <Canvas
        camera={{ position: [-10, 8, -10] }} orthographic
        shadows >
        <color attach="background" args={[0, 0, 0]} />
        <ambientLight intensity={1} />
        <pointLight position={[0, 7, -2]} decay={1} intensity={15} castShadow />

        <group 
        ref={sceneRef}
        position={[0, 0, 0]}
        >
          <mesh position={[0, -0.5, 0]} receiveShadow>
            <boxGeometry args={[20, 1, 20]} />
            <meshStandardMaterial color="lightgray" />
          </mesh>

          <group position={[1, 0, 5]}>
            {diceComponents}
          </group>
          <Board
            canMoveStoneOnTile={(tileId: number) => gameObj.canMoveStoneFromTile(tileId)}
            position={[0, 0, 0]}
            tiles={game.board}
            tileHandler={tileHandler}
            castShadow
          />
          <Player
            position={[-5, 0, -6]}
            bankHandler={bankHandler}
            name={game.player1.name}
            color={game.player1.color}
            stonesCount={game.player1.stonesCount}
            canMoveStones={canMoveFromBank && game.currentPlayer == 1}
          />
          <Player
            position={[5, 0, -6]}
            bankHandler={bankHandler}
            name={game.player2.name}
            color={game.player2.color}
            stonesCount={game.player2.stonesCount}
            canMoveStones={canMoveFromBank && game.currentPlayer == 2}
          />
        </group>

        <AnimationDriver sceneRef={sceneRef}/>
        <ResponsiveCamera />
      </Canvas>
    </div>
  );
}
useGLTF.preload('/ur-no-bump-tint.glb')

export default App3D;
