import AsyncStorage from '@react-native-async-storage/async-storage';

// import Constants from 'expo-constants';
// // import * as Notifications from 'expo-notifications';
// import React, { useState, useEffect, useRef } from 'react';
// import { Text, View, Button, Platform } from 'react-native';
// import { LOCK_APP } from '../actions/types';

// import store from '../store/store';

// Notifications.setNotificationHandler({
// 	handleNotification: async () => ({
// 		shouldShowAlert: true,
// 		shouldPlaySound: false,
// 		shouldSetBadge: false,
// 	}),
// });

const NotificationsTestScreen = ({ navigation }) => {

  // 	const [expoPushToken, setExpoPushToken] = useState('');
  // 	const [notification, setNotification] = useState(false);
  // 	const notificationListener = useRef();
  // 	const responseListener = useRef();

  // 	const state = store.getState();
  // 	const user = state.auth.user
  // 	const isAppLocked = state.auth.isAppBlocked

  // 	useEffect(() => {
  // 		registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

  // 		// This listener is fired whenever a notification is received while the app is foregrounded
  // 		notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
  // 			setNotification(notification);
  // 		});

  // 		// This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
  // 		responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
  // 			console.log(response);
  // 		});

  // 		return () => {
  // 			Notifications.removeNotificationSubscription(notificationListener.current);
  // 			Notifications.removeNotificationSubscription(responseListener.current);
  // 		};
  // 	}, []);

  // React.useLayoutEffect(() => {
  // 	navigation.setOptions({
  // 		'title': 'Тестовый экран',
  // 	});
  // }, [navigation, 'Тестовый экран']);

  // const _lockApp = async () => {
  // 	try {
  // 		await AsyncStorage.setItem(
  // 			'@isAppLocked',
  // 			true
  // 		);
  // 	} catch (error) {
  // 		// Error saving data
  // 	}
  // };

  // const _retrieveData = async () => {
  // 	try {
  // 		const value = await AsyncStorage.getItem('@isAppLocked');
  // 		if (value !== null) {
  // 			// We have data!!
  // 			// console.log(value);
  // 			return value
  // 		}
  // 	} catch (error) {
  // 		// error retrieving data
  // 		alert(error)
  // 	}
  // };

  return (
    <Text>Notifications</Text>
    // <View
    // 	style={{
    // 		flex: 1,
    // 		alignItems: 'center',
    // 		justifyContent: 'space-around',
    // 	}}>

    // 	<Text>Пользователь есть в State: {String(user.success)}</Text>
    // 	<Text>Приложение заблокировано: {isAppLocked}</Text>

    // 	<Text>Your expo push token: {expoPushToken}</Text>
    // 	<View style={{ alignItems: 'center', justifyContent: 'center' }}>
    // 		<Text>Title: {notification && notification.request.content.title} </Text>
    // 		<Text>Body: {notification && notification.request.content.body}</Text>
    // 		<Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
    // 	</View>
    // 	<Button
    // 		title="Отправить уведомление"
    // 		onPress={async () => {
    // 			await sendPushNotification(expoPushToken);
    // 		}}
    // 	/>

    // 	<Button
    // 		title="Заблокировать приложение"
    // 		onPress={() => {
    // 			store.dispatch({ type: LOCK_APP });
    // 		}}
    // 	/>

    // </View>
  );
};

export default NotificationsTestScreen;

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  // if (Constants.isDevice) {
  // 	const { status: existingStatus } = await Notifications.getPermissionsAsync();
  // 	let finalStatus = existingStatus;
  // 	if (existingStatus !== 'granted') {
  // 		const { status } = await Notifications.requestPermissionsAsync();
  // 		finalStatus = status;
  // 	}
  // 	if (finalStatus !== 'granted') {
  // 		alert('Failed to get push token for push notification!');
  // 		return;
  // 	}
  // 	token = (await Notifications.getExpoPushTokenAsync()).data;
  // 	console.log(token);
  // } else {
  // 	alert('Must use physical device for Push Notifications');
  // }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
