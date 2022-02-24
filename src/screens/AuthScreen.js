import React, { Component, useState, useRef } from 'react';

import {
	StatusBar,
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	ScrollView,
	TextInput,
	TouchableOpacity,
	Linking
} from 'react-native';

import * as RootNavigation from '../helpers/RootNavigation';

import MessageIcon from '../assets/Icons/Header/MessageIcon';
import PhoneIcon from '../assets/Icons/Header/PhoneIcon';
import Logo from '../assets/Icons/Header/Logo';
import RegisterLinkIcon from '../assets/Icons/RegisterLinkIcon';

import { createStore, useDispatch, useSelector } from "react-redux";
import { Provider } from 'react-redux';

import LoginForm from '../containers/auth/LoginForm';

import store from '../store/store'

import Spinner from 'react-native-loading-spinner-overlay';

import AppMetrica from 'react-native-appmetrica';
AppMetrica.activate({
	apiKey: '091bb5a6-12b1-42f9-923d-429852d99030',
	sessionTimeout: 120,
	firstActivationAsUpdate: true,
	installedAppCollecting: true,
});
AppMetrica.reportEvent('Открыта страница: Страница авторизации');

// получаем текущий state
const state = store.getState();

function AuthScreen(props) {
	// console.log('[INFO] Показываем экран AUTH');

	const { navigation } = props

	React.useLayoutEffect(() => {
		navigation.setOptions({
			'title': null,
			headerTransparent: true,
			headerBackTitleVisible: false,
			headerLeft: () => null,
		});
	}, [navigation, '']);

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	return (
		<Provider store={store}>
			<SafeAreaView style={styles.container}>
				<View style={styles.spinnerContainer}>
					<Spinner
						visible={loading}
					/>
				</View>

				<ScrollView style={{ flex: 1, backgroundColor: '#f3f3f3' }}>

					<View style={styles.yellowTop}>
						<Logo />
						<View style={{ display: 'flex', flexDirection: 'row' }}>
							<TouchableOpacity onPress={() => RootNavigation.navigate('OnlineChatScreen')}>
								<MessageIcon style={{ marginRight: 20 }} />
							</TouchableOpacity>
							<TouchableOpacity onPress={() => { Linking.openURL('tel:88002222559') }}><PhoneIcon /></TouchableOpacity>
						</View>
					</View>

					<View style={styles.companyCardWrapper}>
						<View style={styles.companyCardHalfBg}></View>
						<View style={styles.companyCard}>
							<Text style={styles.companyName}>Введите логин и пароль которые вам предоставили в компании</Text>

							<View>
								<LoginForm navigation={navigation} />
							</View>

						</View>
					</View>

					<TouchableOpacity
						style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 25 }}
						onPress={() => { RootNavigation.navigate('RegisterScreen') }}
					>
						<RegisterLinkIcon style={{ marginRight: 5 }} />
						<Text style={styles.registerLink}>регистрация</Text>
					</TouchableOpacity>

				</ScrollView>
			</SafeAreaView>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// marginTop: StatusBar.currentHeight || 0,
		// marginHorizontal: 15,
	},

	yellowTop: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 16,
		paddingBottom: 24,
		backgroundColor: '#FED000'
	},

	homeNavItem: {
		width: 75
	},
	homeNewsItemTitle: {
		width: '100%',
		color: '#747474',
		fontSize: 12,
		lineHeight: 16,
		fontWeight: '300'
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
		marginHorizontal: 15,
		paddingVertical: 25,
		paddingHorizontal: 20,
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
	companyName: {
		color: '#747474',
		fontSize: 16,
		fontWeight: '300',
		lineHeight: 22,
		marginBottom: 15,
		textAlign: 'center'
	},
	priceTitle: {
		color: '#747474',
		fontSize: 12,
		fontWeight: '300',
		lineHeight: 14
	},

	labelInput: {
		color: '#673AB7',
	},
	formInput: {
		borderBottomWidth: 1.5,
		marginLeft: 20,
		borderColor: '#333',
	},

	link: {
		marginTop: 25,
		fontWeight: '300',
		fontSize: 12,
		lineHeight: 14,
		textAlign: 'center',
		textDecorationLine: 'underline',
		color: '#747474'
	},

	registerLink: {
		fontWeight: '300',
		fontSize: 12,
		lineHeight: 14,
		textAlign: 'center',
		textDecorationLine: 'underline',
		color: '#FC4A1A'
	},

	spinnerContainer: {
		flex: 1,
		alignItems: 'center',
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default AuthScreen;