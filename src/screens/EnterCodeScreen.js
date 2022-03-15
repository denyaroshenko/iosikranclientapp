import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
	Linking,
	StatusBar,
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
} from 'react-native';

import * as RootNavigation from '../helpers/RootNavigation';

import FingerprintScanner from 'react-native-fingerprint-scanner';

import { setPincode } from '../store/actions/pincode';
import { setLockedApp, removeLockedApp } from '../store/actions/appLock';

import MessageIcon from '../assets/Icons/Header/MessageIcon';
import PhoneIcon from '../assets/Icons/Header/PhoneIcon';
import Logo from '../assets/Icons/Header/Logo';

import FingerprintIcon from '../assets/Icons/FingerprintIcon';
import BackspaceIcon from '../assets/Icons/BackspaceIcon';

import { createStore, useDispatch, useSelector } from "react-redux";
import { Provider } from 'react-redux';

import store from '../store/store'

import Spinner from 'react-native-loading-spinner-overlay';

// import AppMetrica from 'react-native-appmetrica';
// AppMetrica.activate({
// 	apiKey: '091bb5a6-12b1-42f9-923d-429852d99030',
// 	sessionTimeout: 120,
// 	firstActivationAsUpdate: true,
// 	installedAppCollecting: true,
// });
// AppMetrica.reportEvent('Открыта страница: Страница ввода кода');

function EnterCodeScreen({ navigation }) {

	const [pin, setPin] = useState('');
	const [loading, setLoading] = useState(false);
	const [biometryType, setBiometryType] = useState(null)

	React.useLayoutEffect(() => {
		navigation.setOptions({
			'title': null,
			headerStyle: {
				backgroundColor: '#FED000',
				height: StatusBar.currentHeight,
				elevation: 0,
				shadowOpacity: 0,
				borderBottomWidth: 0,
			},
			headerLeft: () => null,
		});

		// Получаем тип биометрии
		FingerprintScanner.isSensorAvailable()
			.then((biometryType) => {
				setBiometryType(biometryType)
			})
			.catch((error) => console.log('isSensorAvailable error => ', error));
	}, [navigation]);

	// Выводим сообщение сканера отпечатка
	const getMessage = () => {
		if (biometryType == 'Face ID') {
			return 'Для продолжения сканируйте свое лицо'
		}
		else {
			return 'Приложите палец к сканеру для разблокировки'
		}
	}

	// Показываем диалог разблокировки с помощью отпечатка
	const showAuthenticationDialog = () => {
		if (biometryType !== null && biometryType !== undefined) {
			FingerprintScanner.authenticate({
				description: getMessage()
			})
				.then(() => {
					// Успешная разблокировка
					console.log('[УСПЕШНАЯ РАЗБЛОКИРОВКА]')
					AsyncStorage.setItem('locked', 'false') // Разблокировали приложение
					store.dispatch(removeLockedApp()) // Диспатчим в стор
					RootNavigation.navigate('TabNavigator') // Показываем главный экран приложения
				})
				.catch((error) => {
					console.log('Authentication error is => ', error);
				});
		}
		else {
			console.log('biometric authentication is not available');
		}
	};

	const dispatch = useDispatch();

	// Проверяем пин-код
	const checkPincode = async (pincode) => {
		try {
			const value = await AsyncStorage.getItem('pincode')
			if (value !== null) {

				if (pincode == value) {
					AsyncStorage.setItem('locked', 'false') // Разблокировали приложение
					store.dispatch(removeLockedApp()) // Диспатчим в стор
					RootNavigation.navigate('TabNavigator')
					setPin('') // Очищаем поле ввода
				} else {
					setPin('')
					alert('Неправильный пин-код')
				}
			}
		} catch (e) {
			// error reading value
		}
	}

	// Обработчик ввода
	const addNumber = (number) => {
		let pinCode = pin

		if (pinCode.length < 4) {
			pinCode += number
			setPin(pinCode)
		}

		if (pin.length == 3) {
			checkPincode(pinCode)
		}
	}

	// Удаление цифры
	const backspace = () => {
		let pinCode = pin
		pinCode = pinCode.slice(0, -1)
		setPin(pinCode)
	}

	return (
		<Provider store={store}>

			<Spinner visible={loading} />

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
						<Text style={styles.codeTitle}>Введите код-пароль</Text>

						<View style={styles.pinInput}>
							<View style={styles.input}>
								<Text style={styles.inputText}>{pin[0] ?? '•'}</Text>
							</View>
							<View style={styles.input}>
								<Text style={styles.inputText}>{pin[1] ?? '•'}</Text>
							</View>
							<View style={styles.input}>
								<Text style={styles.inputText}>{pin[2] ?? '•'}</Text>
							</View>
							<View style={styles.input}>
								<Text style={styles.inputText}>{pin[3] ?? '•'}</Text>
							</View>
						</View>
					</View>
				</View>

				<View style={styles.pinPad}>
					<View style={styles.pinPadRow}>
						<TouchableOpacity style={styles.pinPadKey} onPress={() => { addNumber('1') }}><Text style={styles.pinPadKeyText}>1</Text></TouchableOpacity>
						<TouchableOpacity style={styles.pinPadKey} onPress={() => { addNumber('2') }}><Text style={styles.pinPadKeyText}>2</Text></TouchableOpacity>
						<TouchableOpacity style={styles.pinPadKey} onPress={() => { addNumber('3') }}><Text style={styles.pinPadKeyText}>3</Text></TouchableOpacity>
					</View>
					<View style={styles.pinPadRow}>
						<TouchableOpacity style={styles.pinPadKey} onPress={() => { addNumber('4') }}><Text style={styles.pinPadKeyText}>4</Text></TouchableOpacity>
						<TouchableOpacity style={styles.pinPadKey} onPress={() => { addNumber('5') }}><Text style={styles.pinPadKeyText}>5</Text></TouchableOpacity>
						<TouchableOpacity style={styles.pinPadKey} onPress={() => { addNumber('6') }}><Text style={styles.pinPadKeyText}>6</Text></TouchableOpacity>
					</View>
					<View style={styles.pinPadRow}>
						<TouchableOpacity style={styles.pinPadKey} onPress={() => { addNumber('7') }}><Text style={styles.pinPadKeyText}>7</Text></TouchableOpacity>
						<TouchableOpacity style={styles.pinPadKey} onPress={() => { addNumber('8') }}><Text style={styles.pinPadKeyText}>8</Text></TouchableOpacity>
						<TouchableOpacity style={styles.pinPadKey} onPress={() => { addNumber('9') }}><Text style={styles.pinPadKeyText}>9</Text></TouchableOpacity>
					</View>
					<View style={styles.pinPadRow}>
						<TouchableOpacity style={styles.pinPadKey}>
							<FingerprintIcon onPress={() => showAuthenticationDialog()} />
						</TouchableOpacity>
						<TouchableOpacity style={styles.pinPadKey} onPress={() => { addNumber('0') }}><Text style={styles.pinPadKeyText}>0</Text></TouchableOpacity>
						<TouchableOpacity style={styles.pinPadKey} onPress={() => { backspace() }}>
							<BackspaceIcon />
						</TouchableOpacity>
					</View>
				</View>

			</ScrollView>
		</Provider>

	);
}

const styles = StyleSheet.create({
	pinInput: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		flexWrap: 'nowrap',

		// borderWidth: 1,
		// borderColor: 'green'
	},

	input: {
		color: '#000',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: 45,
		height: 80,
		borderBottomColor: '#54C2EF',
		borderBottomWidth: 6,
		paddingVertical: 20,
		marginHorizontal: 10,

	},

	inputText: {
		justifyContent: 'center',
		textAlign: 'center',
		color: '#000',
		fontWeight: '500',
		fontSize: 48,
		width: 45,
		height: 60,
		marginHorizontal: 10,

		// borderWidth: 1,
		// borderColor: 'pink'
	},

	pinPad: {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'row',
		flexWrap: 'wrap',
		// borderWidth: 1,
		// borderColor: 'green'
	},

	pinPadRow: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'nowrap',

		// borderWidth: 1,
		// borderColor: 'green'
	},

	pinPadKey: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: 51,
		width: 42,
		marginHorizontal: 20,
		marginVertical: 5,

		// borderWidth: 1,
		// borderColor: 'red',
	},
	pinPadKeyText: {
		color: '#000000',
		fontWeight: '500',
		fontSize: 36,
		display: 'flex',
		alignItems: 'center',
		textAlign: 'center',
	},

	container: {
		flex: 1,
		// marginTop: StatusBar.currentHeight || 0,
		marginHorizontal: 15,
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
		marginBottom: 10,
		paddingTop: 25,
		paddingBottom: 35,
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

	codeTitle: {
		color: '#747474',
		fontSize: 16,
		fontWeight: '300',
		lineHeight: 22,
		marginBottom: 15,
		textAlign: 'center'
	},
});

export default EnterCodeScreen;