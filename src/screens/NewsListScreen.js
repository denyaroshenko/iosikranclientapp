import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	FlatList,
} from 'react-native';

import { NewsListItem } from '../components';

import { config } from '../config'

const { API_URL } = config

const NewsListScreen = ({ navigation }) => {

	const [isLoading, setLoading] = useState(true);
	let [news, setNews] = useState([]) // Создаем переменную состояния для данных

	useEffect(() => {
		fetch(API_URL + '/news/list')
			.then((response) => response.json())
			.then((json) => setNews(json.data))
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));
	}, []);

	React.useLayoutEffect(() => {
		navigation.setOptions({
			'title': 'Новости',
		});
	}, [navigation, 'Новости']);

	return (
		<View style={styles.screen}>
			<FlatList
				style={styles.container}
				scrollEnabled={false}
				// contentContainerStyle={{ alignSelf: 'flex-start' }}
				numColumns={2}
				columnWrapperStyle={{ justifyContent: 'space-between' }}
				data={news}
				renderItem={({ item, index }) => (
					<NewsListItem navigation={navigation} item={item} index={index} />
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

	container: {
		flex: 1,
		marginTop: 20,
	},
});

export default NewsListScreen;