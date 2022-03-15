import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	TouchableOpacity,
	ScrollView,
	Linking,
	StatusBar
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage'

import { config } from '../config';

import store from '../store/store'

import HomeNavObjectsIcon from '../assets/Icons/HomeNavObjectsIcon';
import HomeNavKPIcon from '../assets/Icons/HomeNavKPIcon';
import HomeNavCatalogIcon from '../assets/Icons/HomeNavCatalogIcon';
import NotificationIcon from '../assets/Icons/Header/NotificationIcon';
import MessageIcon from '../assets/Icons/Header/MessageIcon';
import PhoneIcon from '../assets/Icons/Header/PhoneIcon';
import RubleIcon from '../assets/Icons/Header/RubleIcon';
import ArrowRightIcon from '../assets/Icons/Header/ArrowRightIcon';
import Logo from '../assets/Icons/Header/Logo';
import PushNotification from 'react-native-push-notification';

import { NewsListItem, Button } from '../components';

import Spinner from 'react-native-loading-spinner-overlay'

// import AppMetrica from 'react-native-appmetrica';
// AppMetrica.activate({
// 	apiKey: '091bb5a6-12b1-42f9-923d-429852d99030',
// 	sessionTimeout: 120,
// 	firstActivationAsUpdate: true,
// 	installedAppCollecting: true,
// });
// AppMetrica.reportEvent('Открыта страница: Главная страница');

function HomeScreen({ navigation }) {

	const { API_URL } = config

	React.useLayoutEffect(() => {
		navigation.setOptions({
			title: '', // устанавливаем собственный заголовок экрана,
			headerTransparent: true,
			headerBackTitleVisible: false,
			headerStyle: {
				backgroundColor: '#FED000',
				height: StatusBar.currentHeight,
				elevation: 0,
				shadowOpacity: 0,
				borderBottomWidth: 0,
			},
			headerTitle: () => null,
			headerLeft: () => null,
		});
	}, [navigation, 'Главный']);

	const state = store.getState();

	const [isLoading, setLoading] = useState(true);
	const [userData, setUserData] = useState(null)
	const [notificationCount, setNotificationCount] = useState(null)
	let [data, setData] = useState([]) // Создаем переменную состояния для данных

	const userID = state.authToken // Пока в токене лежит ID пользователя

	useEffect(() => {
		// Получаем данные для главного экрана
		fetch(`${API_URL}/home/holding?id=${userID}`)
			.then((response) => response.json())
			.then((json) => {
				const homeData = json
				setData(homeData.data)
			})
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));
	}, []);

	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();

	today = dd + '.' + mm + '.' + yyyy;

	// Разбиваем число на разряды
	function numberWithSpaces(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
	}

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

	// Получаем список уведомлений
	const fetchNotifications = async (contactID) => {
		return new Promise((resolve, reject) => {
			fetch(`${API_URL}/notificationsForContact/?contact_id=${contactID}`)
				.then((response) => response.json())
				.then((json) => {
					resolve(json.data)
				})
				.catch((error) => {
					console.error(error)
					reject(error)
				})
		});
	}

	React.useEffect(() => {

		// Подписываемся на событие focus экрана
		const unsubscribe = navigation.addListener('focus', () => {
			getUserData().then((userData) => {
				fetchNotifications(userData.contact_id).then((notifications) => {
					const unreadNotifications = notifications.filter(function (el) {
						return el.status == 1;
					});
					setNotificationCount(unreadNotifications.length)
					console.log('Количество уведомлений:', unreadNotifications.length);
					PushNotification.setApplicationIconBadgeNumber(unreadNotifications.length)
					// PushNotification.setApplicationIconBadgeNumber(999)
				})
			})
		});

		return () => {
			unsubscribe;
		};

	}, [navigation])

	return (
		<SafeAreaView style={styles.container}>
			{isLoading ?
				<Spinner visible={isLoading} />
				: (
					<ScrollView>

						<View style={styles.yellowTop}>
							<Logo />
							<View style={{ display: 'flex', flexDirection: 'row' }}>
								<TouchableOpacity onPress={() => navigation.navigate('OnlineChatScreen')}>
									<MessageIcon style={{ marginRight: 20 }} />
								</TouchableOpacity>

								<TouchableOpacity style={{ position: 'relative', marginRight: 20 }} onPress={() => navigation.navigate('NotificationListScreen')}>
									<NotificationIcon count={notificationCount} />
								</TouchableOpacity>

								<TouchableOpacity onPress={() => { Linking.openURL('tel:' + data.ikran_phone) }}><PhoneIcon /></TouchableOpacity>
							</View>
						</View>

						{/* Карточка организации */}
						<View style={styles.companyCardWrapper}>
							<View style={styles.companyCardHalfBg}></View>
							<View style={styles.companyCard}>
								<Text style={styles.companyName}>{data.client ? data.client.company : 'null'}</Text>

								<TouchableOpacity onPress={() => navigation.navigate('DebtListScreen', { item: data })}>
									<Text style={styles.priceTitle}>текущая задолженность</Text>
									<View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
										<View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
											<Text style={styles.priceValue}>{data.client ? numberWithSpaces(data.client.debt) : 'null'}</Text>
											<RubleIcon />
										</View>

										<ArrowRightIcon />
									</View>
									<Text style={styles.priceDate}>{today}</Text>
								</TouchableOpacity>

							</View>
						</View>

						{/* Меню */}
						<View style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-around', marginTop: 30, marginHorizontal: 20 }}>

							<TouchableOpacity style={styles.homeNavItem} onPress={() => navigation.navigate('TabNavigator', { screen: 'Объекты' })}>
								<View style={styles.homeNavItemIcon}>
									<HomeNavObjectsIcon />
									<View style={[styles.homeNavItemBadge, { backgroundColor: '#DF5649' }]}>
										<Text style={styles.homeNavItemBadgeNumber}>{data.object_count}</Text>
									</View>
								</View>
								<Text style={styles.homeNavItemTitle}>Объекты</Text>
							</TouchableOpacity>

							<TouchableOpacity style={styles.homeNavItem} onPress={() => navigation.navigate('CommercialOfferScreen')}>
								<View style={styles.homeNavItemIcon}>
									<HomeNavKPIcon />
								</View>
								<Text style={styles.homeNavItemTitle}>Запросы КП</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={styles.homeNavItem}
								onPress={() => navigation.navigate('TabNavigator', { screen: 'Каталог' })}
							>
								<View style={styles.homeNavItemIcon}>
									<HomeNavCatalogIcon />
									<View style={[styles.homeNavItemBadge, { backgroundColor: '#FA7A25' }]}>
										<Text style={styles.homeNavItemBadgeNumber}>{data.crane_count}</Text>
									</View>
								</View>
								<Text style={styles.homeNavItemTitle}>Каталог</Text>
							</TouchableOpacity>
						</View>

						{/* Новости */}
						{data.news ?
							<View style={{ marginTop: 30 }}>
								<View
									style={styles.newsContainer}
								>
									{data.news.map((item, key) => {
										return (
											<NewsListItem navigation={navigation} item={item} index={key} key={key} />
										)
									})}
								</View>
							</View>
							: <></>
						}

						{/* Спецпредложение */}
						{data.offer ?
							<TouchableOpacity style={styles.specialOffer} onPress={() => navigation.navigate('SpecialOfferDetailsScreen', { item: data.offer })}>
								<Text style={styles.specialOfferCaption}>спецпредложение</Text>
								<Text style={styles.specialOfferText}>{data.offer.title}</Text>
							</TouchableOpacity>
							: <></>
						}

						{/* Кнопки */}
						<View style={{ marginBottom: 20 }}>
							<View style={{ marginBottom: 10, display: 'flex', alignItems: 'center', width: '100%' }}>
								<Button backgroundColor='#54C2EF' color='#fff' onPress={() => navigation.navigate('NewsListScreen')}>все новости</Button>
							</View>
							<View style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
								<Button backgroundColor='#DF5649' color='#fff' onPress={() => navigation.navigate('SpecialOfferListScreen')}>все спецпредложения</Button>
							</View>
						</View>

					</ScrollView>
				)
			}

		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// marginTop: StatusBar.currentHeight || 0,

		// borderColor: 'green',
		// borderWidth: 1
	},

	yellowTop: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 16,
		paddingBottom: 24,
		backgroundColor: '#FED000',

		// borderColor: 'red',
		// borderWidth: 1
	},

	newsGridView: {
		marginTop: 10
	},

	homeNavItem: {
		width: 75,
	},

	homeNavItemIcon: {
		// position: 'relative',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: 75,
		height: 75,
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
		marginBottom: 6,
	},
	homeNavItemIconImage: {
		width: 35,
		height: 35,
		resizeMode: 'contain'
	},
	homeNavItemTitle: {
		fontSize: 9,
		fontWeight: '400',
		lineHeight: 10,
		textAlign: 'center'
	},
	homeNavItemBadge: {
		position: 'absolute',
		bottom: 10,
		width: 18,
		height: 18,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#DF5649',
		borderRadius: 9,
		overflow: 'hidden',
		borderColor: '#fff',
		borderWidth: 2,
	},
	homeNavItemBadgeNumber: {
		color: '#fff',
		fontSize: 8,
		fontWeight: '400',
	},
	companyCardWrapper: {
		position: 'relative',
	},
	companyCardHalfBg: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		height: '50%',
		backgroundColor: '#fed000'
	},
	companyCard: {
		marginHorizontal: 20,
		paddingVertical: 25,
		paddingHorizontal: 20,
		backgroundColor: '#FFFFFF',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 2,
			height: 4,
		},
		shadowOpacity: 0.1,
		shadowRadius: 3.84,
		elevation: 8,
	},

	companyName: {
		color: '#747474',
		fontSize: 16,
		fontWeight: '300',
		lineHeight: 22,
		marginBottom: 15
	},
	priceTitle: {
		color: '#747474',
		fontSize: 12,
		fontWeight: '300',
		lineHeight: 14
	},
	priceValue: {
		color: '#DF5649',
		fontSize: 36,
		fontWeight: '700',
		lineHeight: 42,
		marginRight: 10
	},
	priceDate: {
		color: '#747474',
		fontSize: 9,
		lineHeight: 11,
		fontWeight: '300'
	},

	specialOffer: {
		flex: 1,
		backgroundColor: '#DF5649',
		padding: 20,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		marginBottom: 20,
		marginHorizontal: 20
	},
	specialOfferCaption: {
		color: '#ffffff',
		marginBottom: 10
	},
	specialOfferText: {
		color: '#ffffff'
	},
	spinnerContainer: {
		flex: 1,
		height: '100%',
		alignItems: 'center',
		// position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
	},

	newsContainer: {
		display: 'flex',
		flexDirection: 'row',
		// backgroundColor: 'red',
		// paddingHorizontal: 20
	},

	// Точка для иконки нотификаций
	hasNotificationsDot: {
		width: 7,
		height: 7,
		borderRadius: 10,
		backgroundColor: 'red',
		position: 'absolute',
		top: 0,
		right: 0,
	}

});

export default HomeScreen;