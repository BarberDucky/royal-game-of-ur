import * as THREE from 'three'
import { ThreeElements, useFrame } from "@react-three/fiber"
import { useGLTF } from '@react-three/drei'
import { StoneColor } from '../../model/Game'
import { useState } from 'react'

export interface StoneProps {
  color: StoneColor
  isActive: boolean
}

function Stone(props: ThreeElements['group'] & StoneProps) {
  const { nodes, materials } = useGLTF('./models/ur-no-bump-tint.glb')
  const [verticalOffset, setVerticalOffset] = useState(0)

  useFrame(({ clock }) => {
    if (props.isActive) {
      const floatOffset = (Math.sin(clock.elapsedTime * 2) + 1) / 4
      setVerticalOffset(floatOffset)
    } else {
      setVerticalOffset(0)
    }
  })
  
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
      <group position={[0, verticalOffset, 0]}>
        {stoneComponent}
      </group>
    </group>
  )
}

export default Stone