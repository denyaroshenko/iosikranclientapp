import React, { useState, useEffect } from 'react';
import {
	StatusBar,
	View,
	Alert,
	Text,
	StyleSheet,
	Platform,
	SafeAreaView
} from 'react-native';
import AppContainer from "./navigation";
import store from './store/store';
import { Provider } from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';

// Пробуем для пушей
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';

import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';

// import AppMetrica from 'react-native-appmetrica';

// // Starts the statistics collection process.
// AppMetrica.activate({
// 	apiKey: '091bb5a6-12b1-42f9-923d-429852d99030',
// 	sessionTimeout: 120,
// 	firstActivationAsUpdate: true,
// 	installedAppCollecting: true,
// });

if (Platform.OS === 'android') {
	// Стили статусбара
	StatusBar.setBackgroundColor('#FED000');
	StatusBar.setBarStyle('dark-content');
}

import { config } from './config';

console.log('___________________');
PushNotificationIOS.checkPermissions(data => {
	console.log('asdasd', data);
})

// Пуши start
const getToken = () => {
	firebase
		.messaging()
		.getToken(firebase.app().options.messagingSenderId)
		.then(x => console.log('[DEVICE TOKEN]', x))
		.catch(error => console.log('[ERROR]', error));
};

const registerForRemoteMessages = () => {
	firebase
		.messaging()
		.registerDeviceForRemoteMessages()
		.then(() => {
			console.log('Registered');
			requestPermissions();
		})
		.catch(e => console.log(e));
};

const requestPermissions = () => {
	firebase
		.messaging()
		.requestPermission()
		.then((status) => {
			if (status === 1) {
				console.log('Authorized');
				onMessage();
			} else {
				console.log('Not authorized');
			}
		})
		.catch(e => console.log(e));
};

const onMessage = () => {
	firebase.messaging().setBackgroundMessageHandler(() => {
		console.log('___________Background Handler');
	})

	PushNotification.setApplicationIconBadgeNumber(333)

	firebase.messaging().onMessage(response => {
		showNotification(response.notification);

		// Обновляем количество уведомлений в иконке
		getUserData().then(userData => {
			fetchNotifications(userData.contact_id).then(notifications => {
				const unreadNotifications = notifications.filter(function (el) {
					return el.status == 1;
				});
				setNotificationCount(unreadNotifications.length)
				// PushNotification.setApplicationIconBadgeNumber(unreadNotifications.length)
			})
		})

		PushNotificationIOS.getApplicationIconBadgeNumber(num => {
			console.log('BADGE NUMBER', num);
			// 	setBadges(num);
		});
	});
};

const showNotification = (notification) => {
	console.log('Показываем уведомление!!!', notification);
	console.log(JSON.stringify(notification));

	const getCorrectDate = () => {
		const date = new Date();
		date.setDate(date.getDate() + 1);
		date.setHours(23);
		date.setMinutes(54);
		return date;
	};

	// Отображаем пуш
	PushNotificationIOS.addNotificationRequest({
		id: new Date().toString(),
		title: notification.title,
		body: notification.body,
		badge: 990,

		// fireDate: getCorrectDate(),
		// repeats: true,
		// repeatsComponent: {
		// 	hour: true,
		// 	minute: true,
		// },
	});
};

getToken();

if (Platform.OS === 'ios') {
	registerForRemoteMessages();
} else {
	onMessage();
}
// Пуши end

export default function App() {
	const { API_URL } = config

	const [permissions, setPermissions] = useState({});
	const [loading, setLoading] = useState(false)
	const [userData, setUserData] = useState(null)
	const [notificationCount, setNotificationCount] = useState(0)

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

	// Получаем данные пользователя в AsyncStorage
	useEffect(() => {
		getUserData().then(userData => {
			setUserData(userData)
			fetchNotifications(userData.contact_id).then(notifications => {
				const unreadNotifications = notifications.filter(function (el) {
					return el.status == 1;
				});
				setNotificationCount(unreadNotifications.length)
				// PushNotification.setApplicationIconBadgeNumber(unreadNotifications.length)
			})
		})

	}, []);

	// Получаем токен девайса
	const getToken = async () => {
		const token = await messaging().getToken()
		console.log('[УСТРОЙСТВО NOTIFICATION TOKEN]', token);

		const data = {
			id: userData.id,
			contact_id: userData.contact_id,
			token: token
		};

		// Формируем строку с параметрами
		let parameters = "";
		for (var key in data) {
			if (parameters != "") {
				parameters += "&";
			}
			parameters += key + "=" + encodeURIComponent(data[key]);
		}

		// console.log('[parameters]', parameters);

		await fetch(`${API_URL}/androidpushtoken/update?${parameters}`, {
			method: 'GET',
		})
			.then((response) => {
				const data = JSON.stringify(response.json())
				// console.log(data)
				// RootNavigation.navigate('OrderCreateSuccessScreen')

				// Alert.alert(
				// 	"[DEBUG] Android Push Token",
				// 	"TOKEN: " + token,
				// 	[
				// 		{
				// 			text: "Cancel",
				// 			onPress: () => console.log("Cancel Pressed"),
				// 			style: "cancel"
				// 		},
				// 		{ text: "OK", onPress: () => console.log("OK Pressed") }
				// 	]
				// );
			})
		// .finally()
	}

	useEffect(() => {
		getToken() // получаем токен девайса

	}, []);

	const MyStatusBar = ({ backgroundColor, ...props }) => (
		<View style={[styles.statusBar, { backgroundColor }]}>
			<SafeAreaView>
				<StatusBar translucent backgroundColor={backgroundColor} {...props} />
			</SafeAreaView>
		</View>
	);

	return (
		<View style={{ flex: 1 }}>
			<MyStatusBar backgroundColor="#FED000" barStyle="dark-content" />
			<Provider store={store}>
				<AppContainer />
			</Provider>
		</View>
	);
}

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	statusBar: {
		height: STATUSBAR_HEIGHT,
	},
	appBar: {
		backgroundColor: '#79B45D',
		height: APPBAR_HEIGHT,
	},
	content: {
		flex: 1,
		backgroundColor: '#33373B',
	},
});
