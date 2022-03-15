import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	FlatList,
	ScrollView
} from 'react-native';

import { SpecialOfferListItem } from '../components';

import { config } from '../config';

const { API_URL } = config

// import AppMetrica from 'react-native-appmetrica';
// AppMetrica.activate({
// 	apiKey: '091bb5a6-12b1-42f9-923d-429852d99030',
// 	sessionTimeout: 120,
// 	firstActivationAsUpdate: true,
// 	installedAppCollecting: true,
// });
// AppMetrica.reportEvent('Открыта страница: Предложения');

const SpecialOfferListScreen = ({ navigation }) => {

	const [isLoading, setLoading] = useState(true);
	let [offers, setOffers] = useState([]) // Создаем переменную состояния для данных

	useEffect(() => {
		fetch(API_URL + '/offer/list')
			.then((response) => response.json())
			.then((json) => setOffers(json.data))
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));
	}, []);

	React.useLayoutEffect(() => {
		navigation.setOptions({
			'title': 'Спецпредложения',
		});
	}, [navigation, 'Спецпредложения']);

	return (
		<View style={styles.screen}>
			<FlatList
				style={[styles.FlatList]}
				scrollEnabled={false}
				data={offers}
				renderItem={({ item, index }) => (
					<SpecialOfferListItem navigation={navigation} item={item} index={index} />
				)}
				keyExtractor={(item, index) => item.id}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: '#f5f5f5',
	},

	FlatList: {
		marginTop: 10,
	},
});

export default SpecialOfferListScreen;