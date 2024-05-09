import Stone, { StoneColor } from "./Stone"

export enum TileType {
    Standard = 'Standard',
    Special = 'Special'
}

export interface TileData {
    tileType: TileType
    stone: StoneColor | null
}

const TileToColorMap: Record<TileType, string> = {
    [TileType.Standard]: 'antiquewhite',
    [TileType.Special]: 'mediumseagreen',
}

interface TileProps {
    size: number
    tile: TileData
    onClick: () => void
}

function Tile(props: TileProps) {

    function createStoneComponent() {
        const stone = props.tile.stone
        if (stone == 'black') {
            return <Stone size={50} color="black" onClick={() => props.onClick()}></Stone>
        } else if (stone == 'white') {
            return <Stone size={50} color="white" onClick={() => props.onClick()}></Stone>
        } else {
            return null
        }
    }

    return (
        <div>
            <svg viewBox="0 0 100 100"
                width={props.size}
                height={props.size}
            >
                <rect
                    x="0" y="0" width="100" height="100"
                    fill={TileToColorMap[props.tile.tileType]}
                ></rect>

                <circle cx="50" cy="50" r="13" fill="dodgerblue"></circle>
                <circle cx="25" cy="25" r="13" fill="dodgerblue"></circle>
                <circle cx="25" cy="75" r="13" fill="dodgerblue"></circle>
                <circle cx="75" cy="25" r="13" fill="dodgerblue"></circle>
                <circle cx="75" cy="75" r="13" fill="dodgerblue"></circle>

                <circle cx="50" cy="50" r="7" fill="black"></circle>
                <circle cx="25" cy="25" r="7" fill="black"></circle>
                <circle cx="25" cy="75" r="7" fill="black"></circle>
                <circle cx="75" cy="25" r="7" fill="black"></circle>
                <circle cx="75" cy="75" r="7" fill="black"></circle>

                <g transform="translate(25, 25)">
                    {createStoneComponent()}
                </g>
            </svg>

        </div>

    )
}

export default Tile