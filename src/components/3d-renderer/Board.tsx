import * as THREE from 'three'
import { ThreeElements } from "@react-three/fiber"
import { useGLTF } from '@react-three/drei'
import { Mesh } from 'three'
import Tile from './Tile'
import { TileData } from '../../model/Game'

export interface BoardProps {
  tiles: Readonly<Array<TileData>>
  tileHandler: (tileId: number) => void
  canMoveStoneOnTile: (tileId: number) => boolean
}

function Board(props: ThreeElements['group'] & BoardProps) {
  const { nodes, materials } = useGLTF('./models/ur-no-bump-tint.glb')

  const tileComponents = props.tiles.map((tile, index) => {
    return <Tile
      key={index}
      tile={tile}
      tileId={index}
      canMoveStone={props.canMoveStoneOnTile(index)}
      onClick={() => props.tileHandler(index)}
    />
  })

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        geometry={(nodes.Board as Mesh).geometry}
        material={materials['Material.001']}
      />
      {tileComponents}
    </group>
  )
}

export default Board