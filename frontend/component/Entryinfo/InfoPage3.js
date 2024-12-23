import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const InfoPage3 = () => {
  return (
    <View style={styles.page}>
      <Text style={styles.text}>Join Us Today!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 24,
    color: '#333',
  },
});

export default InfoPage3;
