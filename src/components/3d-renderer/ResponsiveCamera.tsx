import { useThree } from "@react-three/fiber"
import { useEffect } from "react"

function ResponsiveCamera() {
  const { camera, size } = useThree()

  useEffect(() => {
    const zoomLevel = Math.min(size.height, size.width) * 0.05
    camera.zoom = zoomLevel
    camera.updateProjectionMatrix()
  }, [size, camera])

  return null
}

export default ResponsiveCamera