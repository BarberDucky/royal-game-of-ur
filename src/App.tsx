import { Suspense } from 'react';
import App2D from './components/2d-renderer/App2D';
import App3D from './components/3d-renderer/App3D';
import IntroPage from './pages/Intro';

function App() {

  return (
    <>
      <IntroPage></IntroPage>
      <Suspense>
        <App3D></App3D>
      </Suspense>
    </>
  );
}

export default App;
