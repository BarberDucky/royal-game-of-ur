import { StoneColor } from "./Stone"

export enum TileType {
    Standard = 'Standard',
    Special = 'Special'
} 

export interface Tile {
    tileType: TileType
    stone: StoneColor | null
}

const TileToColorMap: Record<TileType, string> = {
    [TileType.Standard]: 'black',
    [TileType.Special]: 'red',
}

interface BoardProps {
    tiles: Readonly<Array<Tile>>
    tileHandler: (tileId: number) => void
}

function Board(props: BoardProps) {

    const tileComponents = props.tiles
    .map((tile, index) => {
        return <div
            key={index}
            style={{
                width: '50px',
                height: '50px',
                border: `solid ${TileToColorMap[tile.tileType]}`,
                borderRadius: '50px',
                backgroundColor: tile.stone ?? 'lightgray',
            }}
            onClick={() => props.tileHandler(index)}
        ></div>
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