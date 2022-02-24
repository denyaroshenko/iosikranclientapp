import React, { useState } from 'react';
import { StyleSheet, Text, View, SectionList, Image, SafeAreaView, FlatList, StatusBar, ScrollView } from 'react-native';

import { GrayText, Button, SectionTitle, ObjectBlockItem } from '../components';
import HTML from "react-native-render-html";

const SpecialOfferDetailsScreen = ({ route, navigation }) => {

  const { id, title, image, text } = route.params.item;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      'title': title, // устанавливаем собственный заголовок экрана,
    });
  }, [navigation, title]);

  return (
    <View style={styles.screen}>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <Image
            style={styles.image}
            source={{
              uri: image
            }}
          ></Image>
          <Text style={styles.title}>{title}</Text>
          <HTML source={{ html: text }} />

          <View style={{ display: 'flex', alignItems: 'center' }}>
            <View style={{ marginBottom: 10, display: 'flex', alignItems: 'center', width: '100%' }}>
              <Button backgroundColor='#DF5649' color='#fff' onPress={() => navigation.navigate('SpecialOfferListScreen')}>все предложения</Button>
            </View>
          </View>

        </SafeAreaView>
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
    margin: 15,
  },
  image: {
    height: 180,
    width: '100%',
    marginBottom: 20
  },
  title: {
    color: '#000',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 15
  },
  props: {
    width: '100%',
    marginBottom: 15
  },
  propsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  propsLabel: {
    fontWeight: '500',
    fontSize: 14,
    display: 'flex',
    alignItems: 'center',
    color: '#000',
  },
  propsValue: {
    fontSize: 14,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'right',
    color: '#000'
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    color: '#000',
    marginBottom: 70
  },
  stickyArea: {
    display: 'flex',
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: 0,
    alignItems: 'center',

    width: '100%',
    padding: 20
  }
});

export default SpecialOfferDetailsScreen;