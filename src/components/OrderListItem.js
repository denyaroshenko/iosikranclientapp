import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import ChevronRightIcon from '../assets/Icons/ChevronRightIcon';

const OrderListItem = ({ navigation, item }) => {
  const {
    id,
    client_name,
    date,
    status,
    route
  } = item;

  function getStatusName(id) {
    // Статусы:
    // 1 - новая; 2 - в работе; 4 - выполнена; 8 - отклонена; 16 - отклонена клиентом
    let status = []
    status[1] = 'новая'
    status[2] = 'в работе'
    status[4] = 'выполнена'
    status[8] = 'отклонена'
    status[16] = 'отклонена клиентом'

    return status[id]
  }

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('OrderDetailScreen', { item: item })}
      style={styles.item}
    >
      <View style={styles.column1}>
        <Text style={styles.company}>{client_name}</Text>
        <Text style={styles.name}>Заявка №{id}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>

      <View style={styles.column2}>
        <Text style={[styles.status, styles['status_' + status]]}>{getStatusName(status)}</Text>
        <ChevronRightIcon style={styles.icon} />
      </View>
    </TouchableOpacity>
  );
}

OrderListItem.defaultProps = {
  // key: 'Untitled',
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
    paddingHorizontal: 20,
    marginTop: 5,
    marginBottom: 10,
    marginHorizontal: 15,
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
    elevation: 5,

    // borderWidth: 1,
    // borderColor: 'red',
  },

  company: {
    color: '#000',
    fontWeight: '300',
    fontSize: 12,
    lineHeight: 18,
    display: 'flex',
    alignItems: 'center',
    marginBottom: 5
  },

  name: {
    color: '#000000',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 21,
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10
  },

  date: {
    color: '#AEAEAE',
    fontWeight: '300',
    fontSize: 10,
    lineHeight: 12,
    display: 'flex',
    alignItems: 'center'
  },

  status: {
    color: '#DF5649',
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 12,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 10,
  },

  status_1: {
    color: '#DF5649',
    borderColor: '#DF5649',
  },

  status_2: {
    color: '#078522',
    borderColor: '#078522',
  },

  status_4: {
    color: '#AEAEAE',
    borderColor: '#AEAEAE',
  },

  status_8: {
    color: '#4761AC',
    borderColor: '#4761AC',
  },

  status_16: {
    color: '#4761AC',
    borderColor: '#4761AC',
  },

  column1: {
    flex: 1
  },
  column2: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },

  title: {

  },
  icon: {

  }
});

export default OrderListItem;