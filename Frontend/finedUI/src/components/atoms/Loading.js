import React from 'react';
import { View, Modal, ActivityIndicator, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

const Loading = ({ visible }) => {
  return (
    <Modal transparent visible={visible}>
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1570EF" />
      </View>
    </Modal>
  );
};
export default Loading