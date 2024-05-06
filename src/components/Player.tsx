interface PlayerProps {
    name: string
    color: string
    stonesCount: number
    bankHandler: () => void
}

function Player (props: PlayerProps) {

    const stoneComponents = Array.from({length: props.stonesCount}, (_, i) => {
        return <div
            key={i}
            style={{
                width: '30px',
                height: '30px',
                border: 'solid black',
                borderRadius: '30px',
                backgroundColor: props.color,
            }}
            onClick={props.bankHandler}
        ></div>
    })

    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                right: 0,
            }}
        >
            <span
                style={{
                    color: props.color
                }}
            >{`Player ${props.name}`}</span>
            <div>
                {stoneComponents}
            </div>
        </div>
    )
}

export default Player