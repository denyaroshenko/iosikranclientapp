import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	View,
	FlatList,
	Text,
	ActivityIndicator
} from 'react-native';

import { config } from '../config';

import { CatalogItem } from '../components';

import BackIcon from '../assets/Icons/BackIcon';

// import AppMetrica from 'react-native-appmetrica';
// AppMetrica.activate({
// 	apiKey: '091bb5a6-12b1-42f9-923d-429852d99030',
// 	sessionTimeout: 120,
// 	firstActivationAsUpdate: true,
// 	installedAppCollecting: true,
// });
// AppMetrica.reportEvent('Открыта страница: Каталог кранов');

const CatalogListScreen = ({ navigation }) => {

	const { API_URL } = config

	const [isLoading, setLoading] = useState(true);
	let [data, setData] = useState([]) // Создаем переменную состояния для данных

	useEffect(() => {
		setLoading(true)

		// Получаем список кранов для каталога
		fetch(API_URL + '/catalog/list')
			.then((response) => response.json())
			.then((json) => {
				setData(json)
			})
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));
	}, []);

	let catalog = data.data;

	React.useLayoutEffect(() => {
		navigation.setOptions({
			'title': 'Каталог кранов',
			// headerLeft: () => <BackIcon style={{ marginLeft: 15 }} onPress={() => navigation.goBack(null)} />
		});
	}, [navigation, 'Каталог кранов']);

	return (
		<View>
			<ActivityIndicator animating={isLoading} size="large" color="#fff" style={[(isLoading) ? styles.ActivityIndicatorVisible : styles.ActivityIndicator]} />
			<FlatList
				data={catalog}
				keyExtractor={item => item.id}
				renderItem={({ item }) => <CatalogItem navigation={navigation} item={item} />}
			/>
			{/* {
				isLoading ?
					<Spinner visible={isLoading} />
					: (
						<FlatList
							data={catalog}
							keyExtractor={item => item.id}
							renderItem={({ item }) => <CatalogItem navigation={navigation} item={item} />}
						/>
					)
			} */}
		</View>

	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15
	},

	item: {
		padding: 10,
		fontSize: 18,
		height: 44,
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

export default CatalogListScreen;