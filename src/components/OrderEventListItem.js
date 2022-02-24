import React, { useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderEventListItem = (item) => {
	item = item.item

	let {
		date,
		event,
		note,
	} = item;

	return (
		<View style={styles.item}>
			<Text style={styles.date}>{date}</Text>
			<Text style={styles.event}>{event}</Text>
			<Text style={styles.note}>{note}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	item: {
		borderBottomColor: '#c8c8ca',
		borderBottomWidth: 1,

		paddingVertical: 20,
		paddingHorizontal: 20,
		paddingBottom: 10,
		// backgroundColor: '#FFFFFF',
		// shadowColor: '#000000',
		// shadowOffset: {
		// 	width: 2,
		// 	height: 4,
		// },
		// shadowOpacity: 0.1,
		// shadowRadius: 3.84,
		// elevation: 8,
		// marginBottom: 15
	},

	date: {
		color: '#AEAEAE',
		fontWeight: '300',
		fontSize: 10,
		display: 'flex',
		alignItems: 'center',
		marginBottom: 5
	},

	event: {
		flex: 1,
		color: '#000000',
		fontWeight: '500',
		fontSize: 12,
		lineHeight: 16,
		display: 'flex',
		alignItems: 'center',
		marginBottom: 5
	},

	note: {
		color: '#000000',
		fontWeight: '300',
		fontSize: 10,
		lineHeight: 14,
		display: 'flex',
		alignItems: 'center',
	},
});

export default OrderEventListItem;