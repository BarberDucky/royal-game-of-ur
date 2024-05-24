import * as THREE from 'three'
import { ThreeElements } from "@react-three/fiber"

export interface BoardProps {
    model: THREE.Object3D<THREE.Object3DEventMap>
} 

function Board(props: ThreeElements['mesh'] & BoardProps) {
    return (
        <mesh {...props}>
            <primitive object={props.model} />
        </mesh>
    )
}

export default Board