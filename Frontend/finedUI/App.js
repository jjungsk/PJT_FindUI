// react
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {RecoilRoot, useRecoilValue} from 'recoil';
// import Hannah from './Hannah';
import Loading from './src/components/atoms/Loading';
import StackNavigation from './src/components/navigator/StackNavigation';
import IsLoadingState from './src/store/atoms/IsLoadingState';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const App = () => {
  const isLoading = useRecoilValue(IsLoadingState);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Loading visible={isLoading} />
      </View>
    );
  } else {
    return <StackNavigation />;
  }
};

export default function WrappedApp() {
  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
}
