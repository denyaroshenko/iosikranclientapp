import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView
} from 'react-native';

const DocumentFileScreen = ({ navigation }) => {

  React.useLayoutEffect(() => {
    navigation.setOptions({
      'title': 'PDF-файл',
    });
  }, [navigation, 'PDF-файл']);

  return (
    <SafeAreaView style={styles.container}>
      <Text>PDF</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
    margin: 25,
  },
});

export default DocumentFileScreen;