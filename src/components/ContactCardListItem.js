import React from 'react';
import { StyleSheet, Text, View, Linking, TouchableOpacity } from 'react-native';

const ContactCardListItem = ({ navigation, item }) => {
  const {
    first_name,
    last_name,
    middle_name,
    email,
    phone
  } = item;

  return (
    <View style={styles.contactCard}>
      <Text style={styles.contactName}>{last_name} {first_name} {middle_name}</Text>
      <View style={styles.contactRow1}>
        <Text style={styles.contactLabel}>Телефон:</Text>
        <View style={styles.contactCol}>
          <TouchableOpacity onPress={() => { Linking.openURL('tel:' + phone) }}><Text style={styles.contactValue}>{phone}</Text></TouchableOpacity>
        </View>
      </View>
      <View style={styles.contactRow}>
        <Text style={styles.contactLabel}>Email:</Text>
        <View style={styles.contactCol}>
          <Text style={styles.contactValue}>{email}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contactCard: {
    paddingVertical: 25,
    paddingHorizontal: 20,
    marginHorizontal: 15,
    marginVertical: 15,
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
  },

  contactName: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 21,
    color: '#000000',
    marginBottom: 20
  },

  contactRow1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  contactRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  contactCol: {
    width: '50%',
  },

  contactLabel: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 14,
    color: '#000000'
  },

  contactValue: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14,
    color: '#000000',
  },

  title: {
    fontSize: 15,
    lineHeight: 18,
    color: '#000000',
  },

  buttonWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 30
  },

  button: {
    backgroundColor: '#DF5649'
  }
});

export default ContactCardListItem;