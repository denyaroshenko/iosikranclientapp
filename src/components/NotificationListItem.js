import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Moment from 'moment';
import CheckSuccessIcon from '../assets/Icons/CheckSuccessIcon';
import CheckSuccessDisableIcon from '../assets/Icons/CheckSuccessDisableIcon';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';

import { config } from '../config'

const { API_URL } = config

const NotificationListItem = ({ navigation, item }) => {

	const {
		id,
		icon,
		title,
		object_name,
		status,
		date,
		created,
		file
	} = item;

	const shortTitle = (input) => {
		const limit = 88
		return input.length > limit ? `${input.substring(0, limit)}...` : input
	};

	function Icon(icon) {
		if (status == 1) {
			return <CheckSuccessIcon style={styles.icon} />;
		} else {
			return <CheckSuccessDisableIcon style={styles.icon} />;
		}
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

	// Отмечаем уведомление как прочитанное
	const markAsRead = (id, contactID) => {
		console.log(`[INFO] Отмечаем уведомление ID:${id} как прочитанное`);

		const isManager = false
		const manager_id = null
		const notification_id = id
		const contact_id = contactID
		// const passhash = 

		fetch(`${API_URL}/notification/read?isManager=${isManager}&manager_id=${manager_id}&notification_id=${notification_id}&contact_id=${contact_id}`)
			.then((response) => response.json())
			.then((json) => {
				// const result = json.data
				// console.log(`/notification/read?isManager=${isManager}&manager_id=${manager_id}&notification_id=${notification_id}&contact_id=${contact_id}`)
				// console.log('Уведомление отмечено как прочитанное');

				// Обновляем количество уведомлений в иконке
				getUserData().then(userData => {
					fetchNotifications(userData.contact_id).then(notifications => {
						const unreadNotifications = notifications.filter(function (el) {
							return el.status == 1;
						});
						PushNotification.setApplicationIconBadgeNumber(unreadNotifications.length)
					})
				})
			})
			.catch((error) => console.error(error))
		// .finally(() => setLoading(false));
	}

	return (
		<TouchableOpacity
			style={styles.item}
			onPress={() => {
				const orderID = file.match(/_order:(.*)/)[1]
				getUserData().then(userData => {
					// console.log(userData)
					markAsRead(id, userData.contact_id) // отмечаем уведомление как прочитанное
					navigation.navigate('OrderDetailScreen', { item: { id: orderID } })
				})

			}}
		>
			<Icon icon={icon} />
			<View style={styles.details}>
				<Text style={styles.title}>{object_name}</Text>
				<Text style={styles.description}>{title}</Text>
				<Text style={styles.date}>{Moment(created).format('D MMMM YYYY')}</Text>
			</View>
		</TouchableOpacity >
	);
}

const styles = StyleSheet.create({
	item: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		paddingVertical: 18,
		marginHorizontal: 15,
		marginTop: 5,
		marginBottom: 10,
		backgroundColor: '#fff',
		borderRadius: 10,
		shadowColor: '#000000',
		shadowOffset: {
			width: 2,
			height: 4,
		},
		shadowOpacity: 0.1,
		shadowRadius: 3.84,
		elevation: 5,
	},
	icon: {
		marginRight: 20
	},
	details: {
		flex: 1,
		flexGrow: 1
	},

	title: {
		fontSize: 15,
		fontWeight: '700',
		lineHeight: 18,
		display: 'flex',
		alignItems: 'center',
		color: '#000',
		marginBottom: 5
	},

	description: {
		fontSize: 14,
		lineHeight: 20,
		display: 'flex',
		alignItems: 'center',
		color: '#000',
		marginBottom: 5
	},

	date: {
		fontWeight: '300',
		fontSize: 9,
		lineHeight: 11,
		display: 'flex',
		alignItems: 'center',
		color: '#000'
	},
	button: {
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexGrow: 0,
		paddingHorizontal: 20,
		// backgroundColor: 'green'
	},
});

export default NotificationListItem;