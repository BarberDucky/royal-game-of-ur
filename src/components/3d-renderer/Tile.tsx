import * as THREE from 'three'
import { ThreeElements } from "@react-three/fiber"
import { useGLTF } from '@react-three/drei'
import { useRef, useState } from 'react'
import { TileData } from '../../model/Game'
import Stone from './Stone'

export interface TileProps {
  tileId: number
  tile: TileData
  canMoveStone: boolean
  onClick: () => void
}

function Tile(props: ThreeElements['group'] & TileProps) {
  const { nodes, materials } = useGLTF('./models/ur-no-bump-tint.glb')
  const meshRef = useRef<THREE.Mesh>(null!)

  const zeroPadding = props.tileId < 10 ? '0' : ''
  const nodeId = 'Tile0' + zeroPadding + props.tileId

  let tileCenter = new THREE.Vector3()
  meshRef.current?.geometry.boundingBox?.getCenter(tileCenter)
  const playableHeight = props.canMoveStone ? 1 : 0
  tileCenter.setY(tileCenter.getComponent(1) + 0.25 + playableHeight)

  function createStoneComponent() {
    const stone = props.tile.stone
    if (stone == 'black') {
      return <Stone color="black" onClick={() => props.onClick()} position={tileCenter}></Stone>
    } else if (stone == 'white') {
      return <Stone color="white" onClick={() => props.onClick()} position={tileCenter}></Stone>
    } else {
      return null
    }
  }

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={meshRef}
        geometry={(nodes[nodeId] as THREE.Mesh).geometry}
        material={materials['Material.001']}
      />
      {createStoneComponent()}
    </group>
  )
}

export default Tile