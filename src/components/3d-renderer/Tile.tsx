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
  const [isSelected, setIsSelected] = useState(false)
  const groupRef = useRef<THREE.Mesh>(null!)

  const selectedTileMaterial = (materials['Material.001'].clone() as THREE.MeshStandardMaterial)
  selectedTileMaterial.color = new THREE.Color(0xd0d0d0)

  const zeroPadding = props.tileId < 10 ? '0' : ''
  const nodeId = 'Tile0' + zeroPadding + props.tileId

  let tileCenter = new THREE.Vector3()
  groupRef.current?.geometry.boundingBox?.getCenter(tileCenter)
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
        ref={groupRef}
        onPointerOver={() => setIsSelected(true)}
        onPointerOut={() => setIsSelected(false)}
        geometry={(nodes[nodeId] as THREE.Mesh).geometry}
        material={
          isSelected
            ? selectedTileMaterial
            : materials['Material.001']
        }
      />
      {createStoneComponent()}
    </group>
  )
}

export default Tile