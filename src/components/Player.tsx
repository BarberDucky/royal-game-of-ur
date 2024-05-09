import Stone, { StoneColor } from "./Stone"

interface PlayerProps {
    name: string
    color: StoneColor
    stonesCount: number
    bankHandler: () => void
}

function Player(props: PlayerProps) {

    const stoneComponents = Array.from({ length: props.stonesCount }, (_, i) => {
        return <Stone
            key={i}
            onClick={props.bankHandler}
            color={props.color}
            size={35}
        ></Stone>
    })

    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                right: 0,
            }}
        >
            <span>{`Player ${props.name}`}</span>
            <div>
                {stoneComponents}
            </div>
        </div>
    )
}

export default Player