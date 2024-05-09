import Tile, { TileData } from "./Tile"

interface BoardProps {
    tiles: Readonly<Array<TileData>>
    tileHandler: (tileId: number) => void
}

function Board(props: BoardProps) {

    const tileComponents = props.tiles
        .map((tile, index) => {
            return <Tile
                key={index}
                size={100}
                tile={tile}
                onClick={() => props.tileHandler(index)}
            ></Tile>
        })

    return (
        <div
            style={{
                marginTop: '20px'
            }}
        >
            {tileComponents}
        </div>
    )
}

export default Board