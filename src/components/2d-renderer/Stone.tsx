import { StoneColor, colorScheme } from "../../model/Game"

interface StoneProps {
    color: StoneColor
    onClick: () => void
    size: number
}

function Stone(props: StoneProps) {

    const color = colorScheme[props.color]

    return (
        <svg
            width={props.size}
            height={props.size}
            viewBox="0 0 100 100"
        >
            <g onClick={() => props.onClick()}>
                <circle cx="50" cy="50" r="45" stroke="black" fill={color.fill}></circle>

                <circle cx="50" cy="50" r="5" fill={color.dots}></circle>
                <circle cx="35" cy="35" r="5" fill={color.dots}></circle>
                <circle cx="35" cy="65" r="5" fill={color.dots}></circle>
                <circle cx="65" cy="35" r="5" fill={color.dots}></circle>
                <circle cx="65" cy="65" r="5" fill={color.dots}></circle>
            </g>
        </svg>
    )
}

export default Stone