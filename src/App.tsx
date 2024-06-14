import { useState } from 'react';
import App2D from './components/2d-renderer/App2D';
import App3D from './components/3d-renderer/App3D';
import IntroPage from './pages/Intro';

function App() {

  const [introOver, setIntroOver] = useState(false)

  function introOverHandler () {
    setIntroOver(true)
  }

  return (
    <>
      <IntroPage emitAnimationOver={introOverHandler}></IntroPage>
      <App3D canStart={introOver}></App3D>
    </>
  );
}

export default App;
