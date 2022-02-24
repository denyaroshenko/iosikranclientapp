import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	Alert
} from 'react-native';

import { connect } from 'react-redux'
import { navigationRef, isReadyRef } from '../helpers/RootNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import messaging from '@react-native-firebase/messaging';
import AppMetrica from 'react-native-appmetrica';
import store from '../store/store'

import {
	setUserData,
	setAuthToken,
	RemoveAuthToken,
	setLoginSuccess
} from '../store/actions/auth';

import TabNavigator from "../navigation/TabNavigator";
import {
	SplashScreen,
	AuthScreen,
	PasswordRecoveryScreen,
	RegisterScreen,
	ThankyouScreen,
	HomeScreen,
	EnterCodeScreen,
	VideoStreamFullScreen,
	OnlineChatScreen,
} from '../screens';

import { setPincode } from '../store/actions/pincode';

import { config } from '../config'

import { removeAuthToken } from '../store/actions/token';
import { removeLoggedIn } from '../store/actions/auth';
import { removeLockedApp } from '../store/actions/appLock';

const Stack = createStackNavigator();

// Размечаем State для Props
const mapStateToProps = function (state) {
	return {
		isLoggedIn: state.isLoggedIn,
		isLockedApp: state.isLockedApp,
		userData: state.userData,
		// loggedIn: state.auth.loggedIn
	}
}

function AppContainer(props) {

	const { API_URL } = config

	let state = store.getState()

	const [isAppLoading, setIsAppLoading] = useState(true);
	const [isLoading, setIsLoading] = useState(true)
	const [isAppLocked, setIsAppLocked] = useState(true)
	const [pincode, setPincode] = useState(null)
	const [_userData, _setUserData] = useState(null)

	// const getInfo = async () => {
	// 	const token = await AsyncStorage.getItem('authToken');
	// 	setIsLoggedIn(Boolean(token));
	// };

	// useEffect(() => {
	// 	getInfo();
	// }, []);

	// Получаем данные пользователя
	const fetchUserData = (userID) => {
		fetch(API_URL + '/home/holding?id=' + userID)
			.then((response) => response.json())
			.then((json) => {
				const homeData = json
				setData(homeData.data)
			})
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));
	}

	// Пробуем получить userData в локалстораже
	const getUserDataFromLocalstorage = async () => {
		return new Promise((resolve, reject) => {
			AsyncStorage.getItem('userData')
				.then((userData) => {
					// console.info('[USERDATA в AsyncStorage]', token)

					if (userData) {
						resolve(userData); // fulfilled
					} else {
						reject(null); // rejected
					}
				})
		});
	}

	// Получаем токен в локалстораже
	const getAuthToken = async () => {
		return new Promise((resolve, reject) => {
			AsyncStorage.getItem('authToken')
				.then((token) => {

					if (token) {
						resolve(token); // fulfilled
					} else {
						reject("rejected"); // rejected
					}
				})
		});
	}

	// Получаем код-блокировки из Localstorage
	const getPincodeFromLocalstorage = async () => {
		return new Promise((resolve, reject) => {
			AsyncStorage.getItem('pincode')
				.then((pincode) => {

					if (pincode) {
						resolve(pincode); // fulfilled
					} else {
						reject("getPincodeFromLocalstorage rejected"); // rejected
					}
				})
		});
	}

	function getAppMetricaProfileIDFromLocalStorage() {
		return new Promise((resolve, reject) => {
			AsyncStorage.getItem('AppMetricaProfileID')
				.then((AppMetricaProfileID) => {
					console.log('[AppMetricaProfileID]', AppMetricaProfileID);
					if (AppMetricaProfileID) {
						resolve(AppMetricaProfileID); // fulfilled
					} else {
						reject(null); // rejected
					}
				})
		});
	}

	// Отправляем токен девайса на сервер
	const sendTokenToServer = async (id, contact_id) => {
		const token = await messaging().getToken()

		const data = {
			token: token,
			id: id,
			contact_id: contact_id,
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

				// Alert.alert(
				// 	"[DEBUG] Android Push Token",
				// 	"ID: " + id,
				// 	// "TOKEN: " + token,
				// 	[
				// 		{
				// 			text: "Cancel",
				// 			style: "cancel"
				// 		},
				// 		{ text: "OK" }
				// 	]
				// );
			})
		// .finally()
	}

	// 1 шаг
	getAuthToken().then((authToken) => {
		console.log('[AUTH TOKEN в localstorage найден]', authToken);

		store.dispatch(setAuthToken(authToken))
		store.dispatch(setLoginSuccess())

		console.log('[USER LOGGED IN]', props.isLoggedIn);

		getAppMetricaProfileIDFromLocalStorage().then(profileId => {
			AppMetrica.setUserProfileID(profileId);
		}).catch((error) => console.warn("fetch error:", error))

		// Пробуем получить userData из стоража
		getUserDataFromLocalstorage().then(data => {
			const userData = JSON.parse(data)
			console.log('[USER DATA в localstorage найден]', userData);
			// _setUserData(userData) // Добавляем в локальный стейт
			// store.dispatch(setUserData(userData)) // Ошибка! Циклится

			// Отправляем токен девайса на сервер
			sendTokenToServer(userData.id, userData.contact_id)


		}).catch((error) => console.warn("fetch error:", error))

		// Пробуем получить Пинкод из стоража
		getPincodeFromLocalstorage().then(pincode => {
			console.log('[PINCODE в localstorage]', pincode)
			setIsAppLocked(true)
			setPincode(pincode)
		})

	}).catch((error) => {
		console.warn("fetch error:", error)
		// store.dispatch(removeAuthToken())
		// store.dispatch(removeLoggedIn())
		// store.dispatch(removeLockedApp())
	})

	// // Проверяем пинкод в сторе
	// AsyncStorage.getItem('pincode')
	// 	.then((value) => {
	// 		store.dispatch(setPincode(value))
	// 	})

	const screenOptions = {
		headerBackTitle: 'Назад',
		headerTintColor: '#000000',
		headerStyle: {
			backgroundColor: 'red',
			elevation: 0, 
			shadowOpacity: 0,
			borderBottomWidth: 0,
		},
	};

	const otherScreens = {
		VideoStreamFullScreen: VideoStreamFullScreen,
	}

	const lockedScreens = {
		EnterCodeScreen: EnterCodeScreen,
		OnlineChatScreen: OnlineChatScreen,
	}

	const authScreens = {
		AuthScreen: AuthScreen,
		RegisterScreen: RegisterScreen,
		PasswordRecoveryScreen: PasswordRecoveryScreen,
		ThankyouScreen: ThankyouScreen,
		OnlineChatScreen: OnlineChatScreen,
	}

	const userScreens = {
		TabNavigator: TabNavigator,
		EnterCodeScreen: EnterCodeScreen,
	};

	const commonScreens = {
	}

	setTimeout(() => { setIsAppLoading(false) }, 3000) // Через 3 сек прячем сплэш

	if (isAppLoading) {
		return (
			<SplashScreen />
		)
	}

	store.subscribe(() => {
		state = store.getState()
		// console.info('ТЕКУЩИЙ STATE В ГЛОБАЛЬНОЙ НАВИГАЦИИ', state)
	})

	return (
		<NavigationContainer
			ref={navigationRef}
			onReady={() => {
				isReadyRef.current = true;
			}}
		>

			<Stack.Navigator screenOptions={screenOptions}>
				{Object.entries({
					// Use the screens normally
					...commonScreens,
					// Показываем ввод код-пароля если приложение заблокировано
					...(isAppLocked && pincode ? lockedScreens : null),
					...(state.isLoggedIn && !(state.isLockedApp && state.pincode) ? userScreens : authScreens),
					...otherScreens,
					// ...lockedScreens,
				}).map(([name, component]) => (
					<Stack.Screen name={name} component={component} key={name} />
				))}

			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default connect(mapStateToProps)(AppContainer)