import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	FlatList,
	ScrollView
} from 'react-native';

import { ContactCardListItem } from '../components';

import store from '../store/store'
import { config } from '../config';

const ContactsScreen = ({ navigation }) => {

	const { API_URL } = config

	const [loading, setLoading] = useState([])
	const [data, setData] = useState([])

	const state = store.getState();
	const userID = state.authToken

	// Получаем данные
	useEffect(() => {
		fetch(API_URL + '/home/holding?id=' + userID)
			.then((response) => response.json())
			.then((json) => setData(json.data.managers))
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));
	}, []);

	React.useLayoutEffect(() => {
		navigation.setOptions({
			'title': 'Контакты',
		});
	}, [navigation, 'Контакты']);

	const renderItem = ({ item }) => {
		return (
			<ContactCardListItem item={item} />
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				data={data}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// marginTop: StatusBar.currentHeight || 0,
		// padding: 15,
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

export default ContactsScreen;