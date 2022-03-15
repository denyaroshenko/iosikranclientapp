import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	SafeAreaView,
	ActivityIndicator
} from 'react-native';

import store from '../store/store'
import { config } from '../config'

import { DocumentListItem } from '../components';

// import AppMetrica from 'react-native-appmetrica';
// AppMetrica.activate({
// 	apiKey: '091bb5a6-12b1-42f9-923d-429852d99030',
// 	sessionTimeout: 120,
// 	firstActivationAsUpdate: true,
// 	installedAppCollecting: true,
// });
// AppMetrica.reportEvent('Открыта страница: Неоплаченные счета');

const DebtListScreen = ({ navigation, route }) => {

	const state = store.getState();
	const [isLoading, setLoading] = useState(true);
	const [data, setData] = useState([]) // Создаем переменную состояния для данных

	const { API_URL } = config

	React.useLayoutEffect(() => {
		navigation.setOptions({
			'title': 'Неоплаченные счета',
		});
	}, [navigation, 'Неоплаченные счета']);

	const userID = state.authToken

	// Получаем список неоплаченных счетов
	const fetchUnpaid = async (userID) => {
		setLoading(true)

		return new Promise((resolve, reject) => {
			fetch(`${API_URL}/invoices/unpaid/holding?id=${userID}`)
				.then((response) => response.json())
				.then((json) => {
					resolve(json.data)
				})
				.catch((error) => {
					console.error(error)
					reject(error)
				})
				.finally(() => setLoading(false))
		});
	}

	// Получаем данные
	useEffect(() => {
		fetchUnpaid(userID).then((data) => {
			setData(data)
		})
	}, []);

	const renderItem = ({ item }) => {
		const route = item.route

		return (
			<DocumentListItem
				navigation={navigation}
				route={route}
				item={item}
			/>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			{isLoading ? (
				<ActivityIndicator />
			) : (
				<FlatList
					data={data}
					keyExtractor={(item) => item.id}
					renderItem={renderItem}
					style={styles.flatList}
				/>
			)}
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	flatList: {
		paddingTop: 10,
	},

	ActivityIndicator: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		zIndex: 10,
	},

	ActivityIndicatorVisible: {
		position: 'absolute',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		width: '100%',
		height: '100%',
		zIndex: 10,
	}
});

export default DebtListScreen;