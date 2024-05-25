import { Suspense } from 'react';
import App2D from './components/2d-renderer/App2D';
import App3D from './components/3d-renderer/App3D';

function App() {

  return (
    <Suspense>
      {/* <App2D></App2D> */}
      <App3D></App3D>
    </Suspense>
  );
}

export default App;
