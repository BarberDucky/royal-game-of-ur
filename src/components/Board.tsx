export enum Tile {
    Empty = 'Empty',
    Player1 = 'Player1',
    Player2 = 'Player2',
    Special = 'Special'
} 

const TileToColorMap: Record<Tile, string> = {
    [Tile.Empty]: 'white',
    [Tile.Player1]: 'red',
    [Tile.Player2]: 'blue',
    [Tile.Special]: 'yellow',
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
                border: 'solid black',
                borderRadius: '50px',
                backgroundColor: TileToColorMap[tile],
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