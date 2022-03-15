import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	SafeAreaView,
	ScrollView
} from 'react-native';

import { SectionGrid } from 'react-native-super-grid';
import Spinner from 'react-native-loading-spinner-overlay';
import { CraneListItem } from '../components';
import store from '../store/store'
import { config } from '../config'

// import AppMetrica from 'react-native-appmetrica';
// AppMetrica.activate({
// 	apiKey: '091bb5a6-12b1-42f9-923d-429852d99030',
// 	sessionTimeout: 120,
// 	firstActivationAsUpdate: true,
// 	installedAppCollecting: true,
// });
// AppMetrica.reportEvent('Открыта страница: Список кранов на объекте');

const DocumentsScreen = ({ route, navigation }) => {

	const [loading, setLoading] = useState(false)

	const { id, name, image } = route.params.item;

	React.useLayoutEffect(() => {
		navigation.setOptions({
			'title': name,
		});
	}, [navigation, name]);

	const { API_URL } = config

	const state = store.getState();

	let [cranes, setCranes] = useState([])

	const userID = state.authToken

	useEffect(() => {
		setLoading(true)

		fetch(`${API_URL}/object_cranes/holding?id=${userID}&object_id=${id}`)
			.then((response) => response.json())
			.then((json) => setCranes(json.data))
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));
	}, []);

	let cranes_status_0 = [];
	let cranes_status_1 = [];
	let cranes_status_2 = [];
	let cranes_status_3 = [];
	let cranes_status_4 = [];
	let cranes_status_5 = [];
	let cranes_status_6 = [];
	let cranes_status_7 = [];
	let cranes_status_8 = [];
	let cranes_status_9 = [];
	let cranes_status_10 = [];
	let sections = [];

	if (cranes) {
		// Фильтруем краны со статусом 0
		cranes_status_0 = cranes.filter(function (el) {
			return el.status == 0;
		});

		// Фильтруем краны со статусом 1
		cranes_status_1 = cranes.filter(function (el) {
			return el.status == 1;
		});

		// Фильтруем краны со статусом 2
		cranes_status_2 = cranes.filter(function (el) {
			return el.status == 2;
		});

		// Фильтруем краны со статусом 3
		cranes_status_3 = cranes.filter(function (el) {
			return el.status == 3;
		});

		// Фильтруем краны со статусом 4
		cranes_status_4 = cranes.filter(function (el) {
			return el.status == 4;
		});

		// Фильтруем краны со статусом 5
		cranes_status_5 = cranes.filter(function (el) {
			return el.status == 5;
		});

		// Фильтруем краны со статусом 6
		cranes_status_6 = cranes.filter(function (el) {
			return el.status == 6;
		});

		// Фильтруем краны со статусом 7
		cranes_status_7 = cranes.filter(function (el) {
			return el.status == 7;
		});

		// Фильтруем краны со статусом 8
		cranes_status_8 = cranes.filter(function (el) {
			return el.status == 8;
		});

		// Фильтруем краны со статусом 9
		cranes_status_9 = cranes.filter(function (el) {
			return el.status == 9;
		});

		// Фильтруем краны со статусом 10
		cranes_status_10 = cranes.filter(function (el) {
			return el.status == 10;
		});

		if (cranes_status_0.length) {
			sections.push({
				title: 'Отсутствует на объекте',
				data: cranes_status_0,
			})
		}

		if (cranes_status_1.length) {
			sections.push({
				title: 'Завезен на площадку',
				data: cranes_status_1,
			})
		}

		if (cranes_status_2.length) {
			sections.push({
				title: 'Идет монтаж крана',
				data: cranes_status_2,
			})
		}

		if (cranes_status_3.length) {
			sections.push({
				title: 'Смонтирован, не запущен',
				data: cranes_status_3,
			})
		}

		if (cranes_status_4.length) {
			sections.push({
				title: 'Смонтирован, работает',
				data: cranes_status_4,
			})
		}

		if (cranes_status_5.length) {
			sections.push({
				title: 'Смонтирован, остановлен',
				data: cranes_status_5,
			})
		}

		if (cranes_status_6.length) {
			sections.push({
				title: 'Идет демонтаж крана',
				data: cranes_status_6,
			})
		}

		if (cranes_status_7.length) {
			sections.push({
				title: 'Демонтирован, не вывезен',
				data: cranes_status_7,
			})
		}

		if (cranes_status_8.length) {
			sections.push({
				title: 'Вывезен с объекта',
				data: cranes_status_8,
			})
		}

		if (cranes_status_9.length) {
			sections.push({
				title: 'Сменился арендатор',
				data: cranes_status_9,
			})
		}

		if (cranes_status_10.length) {
			sections.push({
				title: 'Неизвестно',
				data: cranes_status_10,
			})
		}
	}

	return (
		<SafeAreaView>
			<Spinner visible={loading} />

			<ScrollView nestedScrollEnabled={true} style={styles.scrollview}>
				{
					image ?
						<View style={styles.imageTile}>
							<Image
								style={styles.image}
								source={{
									uri: image
								}}
							/>
						</View>
						: (
							<></>
						)
				}

				<SectionGrid
					itemDimension={300}
					sections={sections}
					spacing={15}
					style={styles.gridView}
					additionalRowStyle={styles.rowStyle}
					keyExtractor={(item, index) => item.id}
					renderItem={({ item }) =>
						<CraneListItem navigation={navigation} item={item} />
					}
					renderSectionHeader={({ section: { title } }) => (
						<Text style={styles.sectionHeader}>{title}</Text>
					)}
				/>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	scrollview: {
		display: 'flex',
		height: '100%',

		// borderWidth: 1,
		// borderColor: 'red',
	},

	gridView: {
		flex: 1,
		paddingTop: 20,

		// borderWidth: 1,
		// borderColor: 'red',
	},

	rowStyle: {
		flex: 1,
	},

	sectionHeader: {
		color: '#000',
		fontWeight: '300',
		fontSize: 20,
		lineHeight: 23,
		display: 'flex',
		alignContent: 'center',
		paddingLeft: 15,
	},

	image: {
		width: '100%',
		height: 200,
		resizeMode: 'cover',
	},

	imageTile: {
		paddingVertical: 18,
		paddingHorizontal: 15,
		marginHorizontal: 15,
		marginTop: 15,
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
	}
});

export default DocumentsScreen;