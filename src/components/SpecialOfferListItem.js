import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import ChevronRightIcon from '../assets/Icons/ChevronRightIcon';

const SpecialOfferListItem = ({ navigation, item }) => {
  let { title } = item;

  return (
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('SpecialOfferDetailsScreen', { item: item })}>
      <View style={styles.info}>
        <Text style={styles.caption}>спецпредложение</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      <ChevronRightIcon style={styles.icon} />
    </TouchableOpacity>
  );
}

SpecialOfferListItem.defaultProps = {
  key: 'Untitled',
};

const styles = StyleSheet.create({
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 8,
    padding: 20,
    marginTop: 5,
    marginBottom: 10,
    marginHorizontal: 15
  },
  info: {
    flex: 1
  },
  caption: {
    color: '#DF5649',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14,
    marginBottom: 10
  },
  title: {
    width: '100%',
    color: '#747474',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '300'
  },
})

export default SpecialOfferListItem;