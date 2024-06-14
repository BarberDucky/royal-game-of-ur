import './Intro.css'
import React, { useEffect } from 'react'

function IntroPage(props: { emitAnimationOver: () => void }) {

  const startDuration = 1000
  const lingerDuration = 1000

  useEffect(() => {
    setTimeout(() => props.emitAnimationOver(), startDuration + lingerDuration)
  }, [])

  return (
    <div
      className='intro-container'
      style={{
        '--intro-start-duration': startDuration + 'ms'
      } as React.CSSProperties}
    >
      <h1>Royal Game of Ur</h1>
      <hr className='intro-underline'></hr>
    </div>
  )
}

export default IntroPage