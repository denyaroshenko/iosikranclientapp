import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Modal,
	TouchableOpacity,
	StatusBar,
	SafeAreaView,
	ScrollView,
	FlatList,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Spinner from 'react-native-loading-spinner-overlay';

import store from '../store/store'
import { config } from '../config';

import { Button, OrderListItem } from '../components';

import FilterIcon from '../assets/Icons/FilterIcon';

import AppMetrica from 'react-native-appmetrica';
AppMetrica.activate({
	apiKey: '091bb5a6-12b1-42f9-923d-429852d99030',
	sessionTimeout: 120,
	firstActivationAsUpdate: true,
	installedAppCollecting: true,
});
AppMetrica.reportEvent('Открыта страница: Список заявок');

const { API_URL } = config

const state = store.getState();
const userID = state.authToken

// Формируем главный список
const fetchOrderList = () => {
	return new Promise(function (resolve, reject) {
		fetch(API_URL + `/order/holding/list?id=${userID}`)
			// fetch(API_URL + '/order/holding/list?id=УТ0012651') // Test ID
			.then((response) => response.json())
			.then((json) => {
				const orders = json.data
				setOrders(orders)
				setFilteredOrders(orders)

				resolve(orders)
			})
			.catch((error) => {
				console.error(error)
				reject()
			})
			.finally(() => setLoading(false));
	})
}

const HelpScreen = ({ navigation }) => {

	const [modalVisible, setModalVisible] = useState(false);
	const [isLoading, setLoading] = useState(true)
	const [userData, setUserData] = useState(null)
	const [orders, setOrders] = useState([])
	const [filteredOrders, setFilteredOrders] = useState([])

	React.useLayoutEffect(() => {
		navigation.setOptions({
			'title': 'Список заявок', // устанавливаем собственный заголовок экрана
			headerRight: () => (
				<TouchableOpacity onPress={() => setModalVisible(true)}>
					<FilterIcon style={{ marginRight: 20 }} />
				</TouchableOpacity>
			)
		});
	}, [navigation, 'Список заявок']);

	// Получаем название статуса по ID
	const getStatusName = (id) => {
		const status = {
			'1': 'Новая',
			'2': 'В работе',
			'4': 'Выполнена',
			'8': 'Отклонена',
		}

		return status[id]
	}

	// Получаем ID статуса по названию
	const getStatusId = (name) => {
		const status = {
			'Новая': '1',
			'В работе': '2',
			'Выполнена': '4',
			'Отклонена': '8'
		}

		return status[name]
	}

	// Получаем массив статусов заказов 
	const getDocumentTypes = (orders) => {
		var flags = [], output = [], l = orders.length, i;
		for (i = 0; i < l; i++) {
			if (flags[orders[i].status]) continue;
			flags[orders[i].status] = true;
			output.push(orders[i].status);
		}

		return output
	}

	// Формируем главный список заказов
	const getMainOrderList = async (userID) => {
		// console.log(`${API_URL}/order/holding/list?id=${userID}`);
		// userID = 'УТ0012651'// TEST
		setLoading(true)
		fetch(`${API_URL}/order/holding/list?id=${userID}`)
			.then((response) => response.json())
			.then((json) => {
				const orders = json.data
				setOrders(orders)
				setFilteredOrders(orders)
				// console.log('[ORDERS]', orders)
			})
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));
	}

	// Получаем массив статусов заявок 
	const getOrderTypes = () => {
		var flags = [], output = [], l = orders.length, i;
		for (i = 0; i < l; i++) {
			if (flags[orders[i].status]) continue;
			flags[orders[i].status] = true;
			// output.push(orders[i].status);
			output.push(getStatusName(orders[i].status))
		}

		return output
	}

	// Фильтр группы заказов
	const searchFilterFunction = (text) => {
		if (text) {
			if (text == 'Все статусы') {
				getUserData().then((userData) => getMainOrderList(userData.id))
			} else {

				const newData = orders.filter(function (el) {
					return el.status == getStatusId(text);
				});

				// console.log('[INFO] Фильтрованые данные', newData)

				setFilteredOrders(newData);
			}
		} else {
			// Inserted text is blank
			// Update FilteredDataSource with masterDataSource
			// setFilteredDataSource(masterDataSource);
			// setSearch(text);
		}
	};

	// Получение данных пользователя
	const getUserData = async () => {
		try {
			const jsonValue = await AsyncStorage.getItem('userData')
			return jsonValue != null ? JSON.parse(jsonValue) : null;
		} catch (e) {
			// error reading value
			console.log('Ошибка получения данных пользователя');
		}
	}

	// // Получаем данные пользователя в AsyncStorage
	// useEffect(() => {
	// 	let unmounted = false;

	// 	AsyncStorage.getItem('userData')
	// 		.then(async (data) => {
	// 			setUserData(JSON.parse(data))
	// 			getMainOrderList(JSON.parse(data).id)
	// 		})

	// 	return () => { unmounted = true };
	// }, []);

	useEffect(() => {
		// getMainOrderList(userData.id)
		getUserData().then((userData) => getMainOrderList(userData.id))

		// Subscribe for the focus Listener
		const unsubscribe = navigation.addListener('focus', () => {
			getUserData().then((userData) => getMainOrderList(userData.id))
		});

		return () => {
			unsubscribe;
		};

	}, [navigation])

	const renderItem = ({ item }) => (
		<OrderListItem navigation={navigation} item={item} key={item.id} />
	);

	return (

		<SafeAreaView style={styles.container}>
			{
				isLoading ?
					<Spinner visible={isLoading} />
					: (
						<FlatList
							ListHeaderComponent={
								<>
									<Spinner visible={isLoading} />
									<View style={styles.buttonWrapper}>
										<Button onPress={() => { navigation.navigate('OrderCreateScreen'); console.log('click!'); }}>Создать заявку</Button>
									</View>
								</>}
							style={styles.flatList}
							data={filteredOrders}
							renderItem={renderItem}
							keyExtractor={item => item.id}
						// ListEmptyComponent={() => (<Text style={styles.emptyMessageStyle}>The list is empty</Text>)}
						/>
					)
			}

			<Modal
				animationType="fade"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text style={styles.modalTitle}>Выберите статус</Text>
						<View style={styles.modalNavList}>

							<TouchableOpacity onPress={() => { setModalVisible(!modalVisible); searchFilterFunction('Все статусы') }}>
								<Text style={styles.modalNavItem}>Все статусы</Text>
							</TouchableOpacity>

							<TouchableOpacity onPress={() => { setModalVisible(!modalVisible); searchFilterFunction('Новая') }}>
								<Text style={styles.modalNavItem}>Новая</Text>
							</TouchableOpacity>

							<TouchableOpacity onPress={() => { setModalVisible(!modalVisible); searchFilterFunction('В работе') }}>
								<Text style={styles.modalNavItem}>В работе</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => { setModalVisible(!modalVisible); searchFilterFunction('Выполнена') }}>
								<Text style={styles.modalNavItem}>Выполнена</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => { setModalVisible(!modalVisible); searchFilterFunction('Отклонено') }}>
								<Text style={styles.modalNavItem}>Отклонено</Text>
							</TouchableOpacity>
						</View>

						<View style={styles.modalFooter}>
							<TouchableOpacity
								onPress={() => setModalVisible(!modalVisible)}
							>
								<Text style={styles.modalButtonClose}>Отмена</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,

		// borderWidth: 1,
		// borderColor: 'red',
	},

	scrollView: {
		// flex: 1,
		// backgroundColor: 'pink',
		// alignItems: 'center',
		// justifyContent: 'center',
	},

	flatList: {
		paddingBottom: 30,
		// backgroundColor: 'red'
	},

	// Позиционирование модальног окна
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: 'rgba(0,0,0,0.5)'
	},

	buttonWrapper: {
		paddingHorizontal: 15,
		paddingTop: 20,
		marginBottom: 10,
		display: 'flex',
		alignItems: 'center'
	},

	// Стили модального окна
	modalView: {
		width: '80%',
		backgroundColor: "#FAFAFA",
		borderRadius: 2,

		paddingTop: 25,
		paddingHorizontal: 25,
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

	modalButtonClose: {
		display: 'flex',
		color: '#2C98F0',
		fontWeight: '500',
		fontSize: 14,
		lineHeight: 24,
		letterSpacing: 0.16,
		textTransform: 'uppercase',
		// backgroundColor: "#2196F3",
	},
});

export default HelpScreen;