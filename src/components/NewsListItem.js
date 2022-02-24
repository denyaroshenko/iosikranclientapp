import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

const NewsListItem = ({ navigation, item, index }) => {
  let { title } = item;

  return (
    <TouchableOpacity style={[styles.homeNewsItem, index % 2 == 0 ? { marginLeft: 20, marginRight: 7 } : { marginRight: 20, marginLeft: 7 }]} onPress={() => navigation.navigate('NewsDetailsScreen', { item: item })}>
      <Text style={styles.homeNewsItemCaption}>новости</Text>
      <Text style={styles.homeNewsItemTitle}>{title}</Text>
    </TouchableOpacity>
  );
}

NewsListItem.defaultProps = {
  key: 'Untitled',
};

const styles = StyleSheet.create({
  homeNewsItem: {
    position: 'relative',
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
    flex: 1,
    flexDirection: 'column',
    marginBottom: 15
  },

  homeNewsItemCaption: {
    color: '#54C2EF',
    fontSize: 12,
    lineHeight: 14,
    marginBottom: 10
  },
  
  homeNewsItemTitle: {
    width: '100%',
    color: '#747474',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '300'
  },
})

export default NewsListItem;