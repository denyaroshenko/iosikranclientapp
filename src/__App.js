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
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
// Вызывает ошибку!!!
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification, { Importance } from 'react-native-push-notification';



import AppMetrica from 'react-native-appmetrica';

// Starts the statistics collection process.
AppMetrica.activate({
	apiKey: '091bb5a6-12b1-42f9-923d-429852d99030',
	sessionTimeout: 120,
	firstActivationAsUpdate: true,
	installedAppCollecting: true,
});

// Стили статусбара
StatusBar.setBackgroundColor('#FED000');
StatusBar.setBarStyle('dark-content');

import { config } from './config';


//-----------------------------------------------------
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
	firebase.messaging().onMessage(response => {
		console.log('0000000000000', response);
		showNotification(response.notification);
	});
};

const showNotification = (notification) => {
	console.log('Показываем уведомление', notification);
	console.log(JSON.stringify(notification));

	PushNotification.localNotification({
		title: notification.title,
		message: notification.body,
		number: 3000,
	});

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
		badge: 999,
		applicationIconBadgeNumber: 111,

		fireDate: getCorrectDate(),
		repeats: true,
		repeatsComponent: {
			hour: true,
			minute: true,
		},
	});
	// PushNotificationIOS.setApplicationIconBadgeNumber(88)
};

getToken();

if (Platform.OS === 'ios') {
	registerForRemoteMessages();
} else {
	onMessage();
}

//--------------------------
async function saveTokenToDatabase(token) {
	// Assume user is already signed in
	const userId = auth().currentUser.uid;

	// Add the token to the users datastore
	await firestore()
		.collection('users')
		.doc(userId)
		.update({
			tokens: firestore.FieldValue.arrayUnion(token),
		});
}

// Создаем канал для отправки пушей (обязательно)
PushNotification.createChannel(
	{
		channelId: "channel-id", // (required)
		channelName: "Channel for notifications", // (required)
		channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
		playSound: true, // (optional) default: true
		soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
		importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
		vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
	},
	(created) => console.log(`[CHANNEL] createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);

PushNotification.getChannels(function (channels) {
	console.log(channels);
});

// PushNotification.localNotification({
// 	/* Android Only Properties */
// 	channelId: "channel-id", // (required) channelId, if the channel doesn't exist, notification will not trigger.
// 	ticker: "My Notification Ticker", // (optional)
// 	showWhen: true, // (optional) default: true
// 	autoCancel: true, // (optional) default: true
// 	largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
// 	largeIconUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
// 	smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
// 	bigText: "My big text that will be shown when notification is expanded. Styling can be done using HTML tags(see android docs for details)", // (optional) default: "message" prop
// 	subText: "This is a subText", // (optional) default: none
// 	bigPictureUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
// 	bigLargeIcon: "ic_launcher", // (optional) default: undefined
// 	bigLargeIconUrl: "https://www.example.tld/bigicon.jpg", // (optional) default: undefined
// 	color: "red", // (optional) default: system default
// 	vibrate: true, // (optional) default: true
// 	vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
// 	tag: "some_tag", // (optional) add tag to message
// 	group: "group", // (optional) add group to message
// 	groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
// 	ongoing: false, // (optional) set whether this is an "ongoing" notification
// 	priority: "high", // (optional) set notification priority, default: high
// 	visibility: "private", // (optional) set notification visibility, default: private
// 	ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
// 	shortcutId: "shortcut-id", // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
// 	onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false

// 	when: null, // (optional) Add a timestamp (Unix timestamp value in milliseconds) pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
// 	usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
// 	timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null

// 	messageId: "google:message_id", // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module. 

// 	actions: ["Yes", "No"], // (Android only) See the doc for notification actions to know more
// 	invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

// 	/* iOS only properties */
// 	category: "", // (optional) default: empty string
// 	subtitle: "My Notification Subtitle", // (optional) smaller title below notification title

// 	/* iOS and Android properties */
// 	id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
// 	title: "My Notification Title", // (optional)
// 	message: "My Notification Message", // (required)
// 	picture: "https://www.example.tld/picture.jpg", // (optional) Display an picture with the notification, alias of `bigPictureUrl` for Android. default: undefined
// 	userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
// 	playSound: false, // (optional) default: true
// 	soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
// 	number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
// 	repeatType: "day", // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
// });

export default function App() {
	const { API_URL } = config

	const [permissions, setPermissions] = useState({});
	const [loading, setLoading] = useState(false)
	const [userData, setUserData] = useState(null)
	const [notificationCount, setNotificationCount] = useState(0)

	// useEffect(() => {
	// 	const type = 'notification';
	// 	PushNotificationIOS.addEventListener(type, onRemoteNotification);
	// 	return () => {
	// 		PushNotificationIOS.removeEventListener(type);
	// 	};
	// });

	// const onRemoteNotification = (notification) => {
	// 	const isClicked = notification.getData().userInteraction === 1;

	// 	if (isClicked) {
	// 		// Navigate user to another screen
	// 	} else {
	// 		// Do something else with push notification
	// 	}
	// };

	// // Must be outside of any component LifeCycle (such as `componentDidMount`).
	// PushNotification.configure({
	// 	// (optional) Called when Token is generated (iOS and Android)
	// 	onRegister: function (token) {
	// 		console.log('TOKEN:', token);
	// 	},

	// 	// (required) Called when a remote is received or opened, or local notification is opened
	// 	onNotification: function (notification) {
	// 		console.log('NOTIFICATION:', notification);

	// 		// process the notification
	// 		// (required) Called when a remote is received or opened, or local notification is opened
	// 		notification.finish(PushNotificationIOS.FetchResult.NoData);
	// 	},

	// 	// (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
	// 	onAction: function (notification) {
	// 		console.log('ACTION:', notification.action);
	// 		console.log('NOTIFICATION:', notification);
	// 		// process the action
	// 	},

	// 	// (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
	// 	onRegistrationError: function (err) {
	// 		console.error(err.message, err);
	// 	},

	// 	// IOS ONLY (optional): default: all - Permissions to register.
	// 	permissions: {
	// 		alert: true,
	// 		badge: true,
	// 		sound: true,
	// 	},

	// 	// Should the initial notification be popped automatically
	// 	// default: true

	// 	popInitialNotification: true,

	// 	/**
	// 	 * (optional) default: true
	// 	 * - Specified if permissions (ios) and token (android and ios) will requested or not,
	// 	 * - if not, you must call PushNotificationsHandler.requestPermissions() later
	// 	 * - if you are not using remote notification or do not have Firebase installed, use this:
	// 	 *     requestPermissions: Platform.OS === 'ios'
	// 	 */

	// 	requestPermissions: true,
	// });

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

	// Выводим пуш
	const getPushData = async (remoteMessage) => {
		// console.warn('A new FCM message arrived!', JSON.stringify(remoteMessage));

		PushNotification.localNotification({
			channelId: "channel-id", // Обязательно
			title: remoteMessage.notification.title,
			message: remoteMessage.notification.body,
			number: 1000,
		})

		// Устанавоиваем количество в бейдж
		getUserData().then((userData) => {
			fetchNotifications(userData.contact_id).then((notifications) => {
				const unreadNotifications = notifications.filter(function (el) {
					return el.status == 1;
				});
				setNotificationCount(unreadNotifications.length)
				console.log('количество уведомлений', unreadNotifications.length);
				PushNotification.setApplicationIconBadgeNumber(unreadNotifications.length)
			})
		})
	}

	// // Это почему-то сработало на одном из телефонов
	// // console.log('ПУШИ', PushNotification.setApplicationIconBadgeNumber(999));

	// Ждем пуши
	useEffect(() => {
		const unsubscribe = messaging().onMessage(getPushData) // Отправка пуша в открытое приложение

		// Обработчик пушей для открытого приложения÷
		messaging().onMessage(getPushData) // Отправка пуша в открытое приложение

		// Обработчик пушей для закрытого приложения
		// const unsubscribe2 = messaging().setBackgroundMessageHandler(getPushData) // Отправка пуша в закрытое приложение

		getUserData().then((userData) => {
			fetchNotifications(userData.contact_id).then((notifications) => {
				const unreadNotifications = notifications.filter(function (el) {
					return el.status == 1;
				});
				setNotificationCount(unreadNotifications.length)
				console.log('количество уведомлений', unreadNotifications.length);
				PushNotification.setApplicationIconBadgeNumber(unreadNotifications.length)
			})
		})

		return unsubscribe;
	}, []);

	// Получаем данные пользователя в AsyncStorage
	useEffect(() => {
		AsyncStorage.getItem('authToken')
			.then(async (data) => {
				// setUserData(JSON.parse(data))
			})

		AsyncStorage.getItem('userData')
			.then(async (data) => {
				setUserData(JSON.parse(data))
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

				Alert.alert(
					"[DEBUG] Android Push Token",
					"TOKEN: " + token,
					[
						{
							text: "Cancel",
							onPress: () => console.log("Cancel Pressed"),
							style: "cancel"
						},
						{ text: "OK", onPress: () => console.log("OK Pressed") }
					]
				);
			})
		// .finally()
	}

	useEffect(() => {
		getToken() // получаем токен девайса

		// PushNotification.getChannels(function (channel_ids) {
		// 	console.log('channel_ids', channel_ids); // ['channel_id_1']
		// });
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
