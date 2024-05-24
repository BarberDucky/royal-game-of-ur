import React, { useRef, useState } from 'react';
import './App3D.css';
import { Game, GameState } from '../../model/Game';
import { Canvas, ThreeElements, useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three'
import Board from './Board';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

function App3D() {

  const [gameObj, setGameObj] = useState<Game>(new Game())
  const [game, setGame] = useState<GameState>(gameObj.getState())

  const gltf = useLoader(GLTFLoader, './models/ur-no-bump.glb')
  const boardModel = gltf.scene.children[0]

  return (
    <div className="App3D">
      <Canvas camera={{ position: [0, 19, 18] }} >
        <color attach="background" args={[0.005, 0.005, 0.005]} />
        <ambientLight intensity={1} />
        <pointLight position={[0, 5, 0]} decay={0} intensity={3} />
        <Board model={boardModel} position={[2.5, 0, 1]}/>
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App3D;
