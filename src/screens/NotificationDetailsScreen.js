import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	ScrollView
} from 'react-native';

import { config } from '../config'

const NotificationDetailsScreen = ({ route, navigation }) => {

	const { API_URL } = config
	const { id, title } = route.params.item;

	const isManager = false
	const manager_id = null
	const notification_id = id
	const contact_id = null

	const [isLoading, setLoading] = useState(true);

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
		setLoading(true)

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
				.finally(() => setLoading(false))
		});
	}

	const markAsRead = () => {
		return new Promise((resolve, reject) => {
			fetch(`${API_URL}/notification/read?isManager=${isManager}&manager_id=${manager_id}&notification_id=${notification_id}&contact_id=${contact_id}`)
				.then((response) => response.json())
				.then((json) => {
					resolve(json.data)
				})
				.catch(error => {
					console.error(error)
					reject(error)
				})
		});
	}

	React.useEffect(() => {

		// Подписываемся на событие focus экрана
		const unsubscribe = navigation.addListener('focus', () => {
			console.log('[INFO] Отметили уведомление как прочитанное')

			markAsRead()
				.then(data => {


					// Устанавливаем номер в иконку приложения
					getUserData().then(userData => {
						fetchNotifications(userData.contact_id).then((notifications) => {

							const unreadNotifications = notifications.filter(function (el) {
								return el.status == 1;
							});
							PushNotificationIOS.setApplicationIconBadgeNumber(unreadNotifications.length)
							PushNotification.setApplicationIconBadgeNumber(unreadNotifications.length)
						})
					})
				})
				.catch(error => console.error('Не удалось отметить уведомление как прочитанное', error))
		});

		return () => {
			unsubscribe;
		};

	}, [navigation])

	useEffect(() => {
		console.log('[INFO] Отметили уведомление как прочитанное 2')

		markAsRead()
			.then(data => {
				console.log(data)

				// Устанавливаем номер в иконку приложения
				getUserData().then(userData => {
					fetchNotifications(userData.contact_id).then((notifications) => {

						const unreadNotifications = notifications.filter(function (el) {
							return el.status == 1;
						});
						PushNotificationIOS.setApplicationIconBadgeNumber(unreadNotifications.length)
						PushNotification.setApplicationIconBadgeNumber(unreadNotifications.length)
					})
				})
			})
			.catch(error => console.error('Не удалось отметить уведомление как прочитанное', error))
	}, []);

	React.useLayoutEffect(() => {
		navigation.setOptions({
			'title': title,
		});
	}, [navigation, title]);

	return (
		<ScrollView style={styles.screen}>
			<SafeAreaView style={styles.container}>
				<Text style={styles.title}>{title}</Text>
			</SafeAreaView>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: '#f5f5f5',
	},

	container: {
		flex: 1,
		// marginTop: StatusBar.currentHeight || 0,
		margin: 20,
	},

	title: {
		color: '#000',
		fontSize: 18,
		fontWeight: '500',
		marginBottom: 15
	},
});

export default NotificationDetailsScreen;