import Tile, { TileData } from "./Tile"

interface BoardProps {
    tiles: Readonly<Array<TileData>>
    tileHandler: (tileId: number) => void
}

function Board(props: BoardProps) {

    const layout = [
        0,  1,  2,  3,          6,  7,
        8,  9,  10, 11, 12, 13, 14, 15,
        16, 17, 18, 19,         22, 23,
    ]

    const padding = 5
    const tileSize = 100

    const tileComponents = props.tiles
        .map((tile, index) => {
            const tilePosition = layout[index]
            return <div
                key={index}
                style={{
                    position: "absolute",
                    top: `${Math.floor(tilePosition / 8) * (tileSize + padding)}px`,
                    left: `${tilePosition % 8 * (tileSize + padding)}px`
                }}>
                <Tile
                    size={100}
                    tile={tile}
                    onClick={() => props.tileHandler(index)}
                ></Tile>
            </div>
        })

    return (
        <div
            style={{
                position: "relative",
                marginTop: "20px",
            }}
        >
            {tileComponents}
        </div>
    )
}

export default Board