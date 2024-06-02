function IntroPage() {
    return (
        <div style={{
            backgroundColor: 'black',
            color: 'white',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <div style={{ 
                width: 'fit-content', 
                textAlign: 'center',
                marginTop: '-12em', 
                }}>

                <h1 style={{
                    fontFamily: 'Georgia, serif',
                    fontWeight: 'normal',
                    fontSize: '5em',
                    margin: '0 1em -20px 1em',
                    userSelect: 'none',
                }}>
                    Royal Game of Ur
                </h1>
                <hr style={{
                    margin: '30px 0',
                    height: '2px',
                    border: 'none',
                    background: '-webkit-gradient(linear, 0 0, 100% 0, from(transparent), to(transparent), color-stop(50%, white))',
                }}></hr>
            </div>
        </div>
    )
}

export default IntroPage