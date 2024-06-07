import { useFrame } from "@react-three/fiber"
import { Group, Object3DEventMap, Vector3 } from "three"

interface AnimationDriverProps {
  sceneRef: React.MutableRefObject<Group<Object3DEventMap>>
}

function AnimationDriver (props: AnimationDriverProps) {

  useFrame(({clock}) => {
    const scene = props.sceneRef.current
    if (scene != null) {
      const progress = clock.elapsedTime < 3.5 
        ? -3
        : clock.elapsedTime > 5.5 
          ? 0
          : (1 - (-3.5 + clock.elapsedTime) / 2) * -3
      scene.position.fromArray([0, progress, 0])
      
    }
  })

  return null
}

export default AnimationDriver