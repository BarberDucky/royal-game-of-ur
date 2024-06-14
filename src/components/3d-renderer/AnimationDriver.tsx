import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useState } from "react"
import { Group, Object3DEventMap } from "three"

interface AnimationDriverProps {
  sceneRef: React.MutableRefObject<Group<Object3DEventMap>>
  ready: boolean
}

function AnimationDriver(props: AnimationDriverProps) {

  const [startTime, setStartTime] = useState(-1)

  const { clock } = useThree()

  useEffect(() => {
    if (props.ready && startTime == -1) {
      setStartTime(clock.elapsedTime)
    }
  }, [props.ready])

  const flyinDuration = 2

  useFrame(({ clock }) => {
    const scene = props.sceneRef.current
    if (scene != null) {
      const progress = clock.elapsedTime < startTime
        ? -3
        : clock.elapsedTime > startTime + flyinDuration
          ? 0
          : (1 - (-startTime + clock.elapsedTime) / flyinDuration) * -3
      scene.position.fromArray([0, progress, 0])
    }
  })

  return null
}

export default AnimationDriver