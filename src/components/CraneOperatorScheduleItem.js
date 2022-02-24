import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Modal, Pressable } from 'react-native';

import CheckSuccessIcon from '../assets/Icons/CheckSuccessIcon';
import PDFIcon from '../assets/Icons/PDFIcon';

const CraneOperatorScheduleItem = ({ navigation, item }) => {

  const { icon, name, date, hours, url } = item;

  function Icon(icon) {
    if (icon) {
      return <PDFIcon style={styles.icon} />;
    }
  }

  function num_word(value, words) {
    value = Math.abs(value) % 100;
    var num = value % 10;
    if (value > 10 && value < 20) return words[2];
    if (num > 1 && num < 5) return words[1];
    if (num == 1) return words[0];
    return words[2];
  }

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('PDFScreen', { pdf: item })}
    >
      <Icon icon={icon} />
      <View style={styles.details}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Text style={styles.hours}>{hours} {num_word(hours, ['час', 'часа', 'часов'])}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 18,
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

    // backgroundColor: '#f9c2ff',
    marginVertical: 8,
    marginHorizontal: 16,
  },
  icon: {
    marginRight: 20
  },
  details: {
    flex: 1,
    flexGrow: 1
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 19,
    display: 'flex',
    alignItems: 'center',
    color: '#000',
    marginBottom: 5
  },
  date: {
    color: '#000',
    fontSize: 9,
    fontWeight: '300',
    lineHeight: 11,
    display: 'flex',
    alignItems: 'center',
    marginVertical: 1
  },
  hours: {
    fontSize: 14,
    color: 'rgba(7, 133, 34, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(7, 133, 34, 0.9)',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10
    // border: 1px solid rgba(7, 133, 34, 0.9);
    // box- sizing: border- box;
    // border - radius: 15px;

  },
  button: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 0,
    paddingHorizontal: 20,
    // backgroundColor: 'green'
  },

  // Позиционирование модальног окна
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)'
  },

  // Стили модального окна
  modalView: {
    width: '80%',
    backgroundColor: "#FAFAFA",
    borderRadius: 2,

    paddingTop: 35,
    paddingHorizontal: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },

  modalTitle: {
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 24,
    color: 'rgba(0, 0, 0, 0.87)',
    marginBottom: 20
  },

  modalFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 20
  },

  modalNavList: {
    marginBottom: 20
  },

  modalNavItem: {
    fontSize: 16,
    lineHeight: 40,
    color: 'rgba(117, 117, 117, 0.87)',
  },

  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    display: 'flex',
    color: '#2C98F0',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: 0.16,
    textTransform: 'uppercase',
    // backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default CraneOperatorScheduleItem;