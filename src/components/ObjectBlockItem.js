import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import ObjectsIcon from '../assets/Icons/Object/ObjectIcon';

const ObjectBlockItem = ({ navigation, item }) => {

  const { name, status, image } = item;

  let active = status == 0; // если статус объекта 0, то он активный

  return (
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('ObjectScreen', {
      item: item,
    })}>
      <ObjectsIcon style={styles.icon} active={active} />
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
}

ObjectBlockItem.defaultProps = {
  groupTitle: 'Untitled',
  items: [],
};

const styles = StyleSheet.create({
  item: {
    // display: 'flex'
    height: '100%',
    paddingVertical: 18,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,

    elevation: 8,
  },
  icon: {
    marginBottom: 10
  },
  name: {
    display: 'flex',
    alignItems: 'center',
    color: '#000',
    fontWeight: '200',
    fontSize: 10,
    fontWeight: '300',
    lineHeight: 11,
  }
});

const GroupItem = styled.TouchableOpacity`
background: ${props => props.active ? '#2A86FF;' : '#e9f5ff;'}
  align-items: center;
  flex-direction: row;
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #f3f3f3;
`;

const Icon = styled.Image`
  border-radius: 50px;
  width: 40px;
  height: 40px;
  margin-right: 15px;
`;

export default ObjectBlockItem;