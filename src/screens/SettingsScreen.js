import AsyncStorage from '@react-native-async-storage/async-storage'

import React, { useState } from 'react'
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	StatusBar,
	TouchableOpacity
} from 'react-native'

import * as RootNavigation from '../helpers/RootNavigation'
import { Button } from '../components'
import ChevronRightIcon from '../assets/Icons/ChevronRightIcon';
import Spinner from 'react-native-loading-spinner-overlay'

// получаем текущий state
import store from '../store/store'
import BackIcon from '../assets/Icons/BackIcon'
import { logout, removeLoggedIn } from '../store/actions/auth'
import { userService } from '../service/userService'
import { removeAuthToken } from '../store/actions/token'
const state = store.getState();

import AppMetrica from 'react-native-appmetrica';
AppMetrica.activate({
	apiKey: '091bb5a6-12b1-42f9-923d-429852d99030',
	sessionTimeout: 120,
	firstActivationAsUpdate: true,
	installedAppCollecting: true,
});
AppMetrica.reportEvent('Открыта страница: Настройки');

// Элемент списка
const Item = (props) => {
	const { navigation, route, item, title, onPress } = props

	return (
		<TouchableOpacity style={[styles.item]} onPress={onPress}>
			<Text style={[styles.title]}>{title}</Text>
			<ChevronRightIcon style={styles.icon} />
		</TouchableOpacity>
	)
};

// Выход из приложения
const signOutAsync = async () => {
	console.log('[INFO] Разлогиниваемся')
	await AsyncStorage.removeItem('authToken') // Удаляем токен из стора
	await AsyncStorage.removeItem('AppMetricaProfileID') // Удаляем id для апп метрики из стора
	await store.dispatch(removeAuthToken())
	await store.dispatch(removeLoggedIn())
	// await store.dispatch({ type: CLEAR_LOGGED_IN })
	// await store.dispatch({ type: CLEAR_USER_DATA })

	RootNavigation.navigate('AuthScreen')
};

const SettingsScreen = ({ navigation }) => {



	React.useLayoutEffect(() => {
		navigation.setOptions({
			'title': 'Настройки',
			// headerLeft: () => <BackIcon style={{ marginLeft: 15 }} onPress={() => navigation.goBack(null)} />
		});
	}, [navigation, 'Настройки']);

	const [loading, setLoading] = useState(false);
	const [selectedId, setSelectedId] = useState(null);

	return (
		<SafeAreaView style={styles.container}>

			<Spinner visible={loading} />

			<View style={{ marginBottom: 20, marginTop: 15 }}>
				<Item title='Изменить код-пароль' onPress={() => { RootNavigation.navigate('SetCodeScreen') }} />
				<Item title='О компании' onPress={() => { navigation.navigate('AboutCompanyScreen') }} />
				<Item title='Контакты' onPress={() => { navigation.navigate('ContactsScreen') }} />
				<Item title='О приложении' onPress={() => { navigation.navigate('AboutAppScreen') }} />
			</View>

			<View style={styles.buttonWrapper}>
				<Button backgroundColor="#DF5649" color="#fff" onPress={signOutAsync}>выйти из приложения</Button>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: StatusBar.currentHeight || 0,
	},

	item: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 25,
		paddingHorizontal: 20,
		marginBottom: 12,
		marginHorizontal: 15,
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
	},

	buttonWrapper: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-end',
		marginBottom: 40
	},

	button: {
		backgroundColor: '#DF5649'
	}
});

export default SettingsScreen;