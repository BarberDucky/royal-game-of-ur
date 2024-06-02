import * as THREE from 'three'
import { ThreeElements } from "@react-three/fiber"
import { useGLTF } from '@react-three/drei'
import { StoneColor } from '../../model/Game'

export interface StoneProps {
  color: StoneColor
}

function Stone(props: ThreeElements['group'] & StoneProps) {
  const { nodes, materials } = useGLTF('./models/ur-no-bump-tint.glb')

  const stoneComponent = props.color == 'black'
    ? <mesh
      castShadow
      geometry={(nodes.BlackStone as THREE.Mesh).geometry}
      material={materials.Material}
      scale={[1.296, 1.781, 1.193]}
    />
    : <mesh
      castShadow
      geometry={(nodes.WhiteStone as THREE.Mesh).geometry}
      material={(nodes.WhiteStone as THREE.Mesh).material}
      scale={[1.296, 1.781, 1.193]}
    />

  return (
    <group {...props} dispose={null}>
      {stoneComponent}
    </group>
  )
}

export default Stone