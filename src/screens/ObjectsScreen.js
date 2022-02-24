import React, { useEffect, useState, useFocusEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	SectionList,
	TouchableOpacity,
	BackHandler,
	Image
} from 'react-native';

import * as RootNavigation from '../helpers/RootNavigation';

import { SectionTitle, ObjectBlockItem } from '../components';
import { SectionGrid } from 'react-native-super-grid';

import Spinner from 'react-native-loading-spinner-overlay';

import BackIcon from '../assets/Icons/BackIcon'

import store from '../store/store'
import { config } from '../config'

import AppMetrica from 'react-native-appmetrica';
AppMetrica.activate({
	apiKey: '091bb5a6-12b1-42f9-923d-429852d99030',
	sessionTimeout: 120,
	firstActivationAsUpdate: true,
	installedAppCollecting: true,
});
AppMetrica.reportEvent('Открыта страница: Список объектов');

const screenOptions = {
	headerBackTitle: 'Назад',
	headerTintColor: '#000000',
	headerStyle: {
		backgroundColor: '#FED400',
		elevation: 0,
		shadowOpacity: 0,
		borderBottomWidth: 0,
	},
};

const { API_URL } = config

function ObjectsScreen({ navigation }) {

	function handleBackButtonClick() {
		// navigation.goBack();
		// navigation.popToTop();
		return true;
	}

	useEffect(() => {
		BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
		return () => {
			BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
		};
	}, []);

	const [loading, setLoading] = useState(false)

	// grab current state
	const state = store.getState();
	console.log('ТЕКУЩИЙ STATE', state)

	let [data, setData] = useState([]) // Создаем переменную состояния для данных

	// хук запускается синхронно после всех изменений DOM
	React.useLayoutEffect(() => {
		navigation.setOptions({
			'title': 'Объекты',
			// headerLeft: () => <BackIcon style={{ marginLeft: 15 }} onPress={() => navigation.goBack(null)} />
		});
	}, [navigation, 'Объекты']);

	const userID = state.authToken

	useEffect(() => {
		setLoading(true)

		fetch(`${API_URL}/objects/holding?id=${userID}`)
			.then((response) => response.json())
			.then((json) => {
				setData(json)
			})
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));
	}, []);

	let objects = data.data;
	let objects_status_0 = [];
	let objects_status_1 = [];
	let objects_status_2 = [];
	let sections = [];

	if (objects) {

		// Фильтруем объекты со статусом 0
		objects_status_0 = objects.filter(function (el) {
			return el.status == 0;
		});

		// Фильтруем объекты со статусом 1
		objects_status_1 = objects.filter(function (el) {
			return el.status == 1;
		});

		// Фильтруем объекты со статусом 2
		objects_status_2 = objects.filter(function (el) {
			return el.status == 2;
		});

		if (objects_status_0.length) {
			sections.push({
				title: 'В работе',
				data: objects_status_0,
			})
		}

		if (objects_status_1.length) {
			sections.push({
				title: 'Планируемые',
				data: objects_status_1,
			})
		}

		if (objects_status_2.length) {
			sections.push({
				title: 'Архив',
				data: objects_status_2,
			})
		}
	}

	return (
		<View>
			<Spinner visible={loading} />

			<SectionGrid
				itemDimension={100}
				sections={sections}
				spacing={15}
				style={styles.gridView}
				additionalRowStyle={styles.rowStyle}
				keyExtractor={(item, index) => item.id}
				renderItem={({ item }) => <ObjectBlockItem navigation={navigation} item={item} />}
				renderSectionHeader={({ section: { title } }) => (
					<SectionTitle style={{ paddingLeft: 20 }}>{title}</SectionTitle>
				)}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	gridView: {
		marginTop: 20,
	},
	rowStyle: {
		flex: 1,
	},
});

export default ObjectsScreen;
