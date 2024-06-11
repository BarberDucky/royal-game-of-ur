import * as THREE from 'three'
import { ThreeElements, useFrame } from "@react-three/fiber"
import { useGLTF } from '@react-three/drei'
import { useState } from 'react'

export interface DieProps {
  sides: number[]
  canRoll: boolean
}

function Die(props: ThreeElements['group'] & DieProps) {
  const { nodes, materials } = useGLTF('./models/ur-no-bump-tint.glb')
  const [verticalOffset, setVerticalOffset] = useState(0)

  useFrame(({ clock }) => {
    if (props.canRoll) {
      const floatOffset = (Math.sin(clock.elapsedTime * 2) + 1) / 4
      setVerticalOffset(floatOffset)
    } else {
      setVerticalOffset(0)
    }
  })

  const { sides } = props

  const verticalFlip = sides.includes(3) ? 0 : 1
  const sideVertex = sides.includes(3)
    ? sides.filter(side => side != 3)[0]
    : sides[0]

  return (
    <group
      {...props}
      dispose={null}
    >
      <group
        rotation={[0, 2.0944 * sideVertex, 3.14 * verticalFlip]}
        position={[0, verticalOffset, 0]}
      >
        <mesh
          castShadow
          geometry={(nodes.Solid001 as THREE.Mesh).geometry}
          material={materials['Material.002']}
        />
        <mesh
          castShadow
          geometry={(nodes.Solid001_1 as THREE.Mesh).geometry}
          material={materials['Material.003']}
        />
      </group>
    </group>
  )
}

export default Die