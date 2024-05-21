interface DieProps {
    sides: number[]
    rollHandler: () => void
    size: number
}

function Die(props: DieProps) {

    const vertices = [
        <polygon
            key="top"
            points="50 15, 45 23.5, 55 23.5"
            fill="gray"
        ></polygon>,
        <polygon
            key="left"
            points="5 91.5, 0 100, 10 100"
            fill="gray"
        ></polygon>,
        <polygon
            key="right"
            points="95 91.5, 90 100, 100 100"
            fill="gray"
        ></polygon>,
        <polygon
            key="center"
            points="50 65.9, 45 74.5, 55 74.5"
            fill="gray"
        ></polygon>,
    ]

    const chosenVertices = props.sides
        .map(sideIndex => vertices[sideIndex])

    return (
        <svg
            width={props.size}
            height={props.size}
            viewBox="0 0 100 100"
        >
            <g onClick={props.rollHandler}>
                <polygon
                    points="50 15, 0 100, 100 100"
                    fill="black"
                >
                </polygon>

                <line x1="50" y1="15" x2="50" y2="71.7" stroke="gray" strokeWidth="0.5"></line>
                <line x1="0" y1="100" x2="50" y2="71.7" stroke="gray" strokeWidth="0.5"></line>
                <line x1="100" y1="100" x2="50" y2="71.7" stroke="gray" strokeWidth="0.5"></line>

                {chosenVertices}
            </g>
        </svg>
    )
}

export default Die