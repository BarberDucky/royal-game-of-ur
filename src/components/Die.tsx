
interface DieProps {
    value: boolean
    rollHandler: () => void
}

function Die (props: DieProps) {
    return (
        <div
            onClick={props.rollHandler}
            style={{
                width: '50px',
                height: '50px',
                border: 'solid black',
                borderRadius: '5px',
                backgroundColor: props.value ? 'black' : 'white',
            }}
        >
        </div>
    )
}

export default Die