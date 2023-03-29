// react
import React from 'react';

// recoil
import {RecoilRoot} from 'recoil';

// nav
import StackNavigation from './src/components/navigator/StackNavigation';

const App = () => {
  return (
    <RecoilRoot>
      <StackNavigation />
    </RecoilRoot>
  );
};

export default App;
