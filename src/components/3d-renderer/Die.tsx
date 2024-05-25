import * as THREE from 'three'
import { ThreeElements } from "@react-three/fiber"
import { useGLTF } from '@react-three/drei'

export interface DieProps {
  sides: number[]
}

function Die(props: ThreeElements['group'] & DieProps) {
  const { nodes, materials } = useGLTF('./models/ur-no-bump-tint.glb')

  const { sides } = props

  const verticalFlip = sides.includes(3) ? 0 : 1
  const sideVertex = sides.includes(3)
    ? sides.filter(side => side != 3)[0]
    : sides[0]

  return (
    <group
      {...props}
      dispose={null}
      rotation={[0, 2.0944 * sideVertex, 3.14 * verticalFlip]}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Solid001 as THREE.Mesh).geometry}
        material={materials['Material.002']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Solid001_1 as THREE.Mesh).geometry}
        material={materials['Material.003']}
      />
    </group>
  )
}

export default Die