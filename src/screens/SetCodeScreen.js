import React, { useState, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
	StatusBar,
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	ScrollView,
	TextInput,
	TouchableOpacity,
} from 'react-native';

import * as RootNavigation from '../helpers/RootNavigation';

import MessageIcon from '../assets/Icons/Header/MessageIcon';
import PhoneIcon from '../assets/Icons/Header/PhoneIcon';
import Logo from '../assets/Icons/Header/Logo';

import BackIcon from '../assets/Icons/BackIcon'
import FingerprintIcon from '../assets/Icons/FingerprintIcon';
import BackspaceIcon from '../assets/Icons/BackspaceIcon';


import { createStore, useDispatch, useSelector } from "react-redux";
import { Provider } from 'react-redux';

import store from '../store/store'
import { SET_PINCODE } from '../store/actions/types';
import { setPincode } from '../store/actions/pincode';

import { NavigationContainer, NavigationActions } from '@react-navigation/native';

import Spinner from 'react-native-loading-spinner-overlay';
import { Button } from '../components';

function SetCodeScreen({ navigation }) {

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
	}, [navigation, '']);

	const [pin, setPin] = useState('');
	const [number1, setNumber1] = useState();
	const [number2, setNumber2] = useState();
	const [number3, setNumber3] = useState();
	const [number4, setNumber4] = useState();
	const [loading, setLoading] = useState(false);

	// const { isLoggedIn } = useSelector(state => state.auth);
	// const { message } = useSelector(state => state.message);

	const dispatch = useDispatch();

	const state = store.getState();

	// Устанавливаем пин-код
	const savePincode = async (value) => {
		try {
			await AsyncStorage.setItem('pincode', value)
			await store.dispatch(setPincode(value))
			console.log('[INFO] STATE:', store.getState());
		} catch (e) {
			// saving error
			console.error('Ошибка при установке пин-кода');
		}
	}

	const addNumber = (number) => {
		let pinCode = pin

		if (pinCode.length < 4) {
			pinCode += number
			setPin(pinCode)
		}

		if (pin.length == 3) {
			console.log('Устанавливаем пин', pinCode)

			navigation.goBack()
			savePincode(pinCode).then((code) => {
				alert('Пин код установлен', code)
			})
		}
	}

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
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<TouchableOpacity onPress={() => navigation.goBack(null)} >
							<BackIcon style={{ marginRight: 25 }} />
						</TouchableOpacity>
						<Logo />
					</View>
					<View style={{ display: 'flex', flexDirection: 'row' }}>
						<MessageIcon style={{ marginRight: 20 }} />
						<PhoneIcon />
					</View>
				</View>

				<View style={styles.companyCardWrapper}>
					<View style={styles.companyCardHalfBg}></View>
					<View style={styles.companyCard}>
						<Text style={styles.companyName}>Задайте код-пароль или используйте отпечаток пальца</Text>

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
							<FingerprintIcon />
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
		marginTop: 10,

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
	newsGridView: {
		marginTop: 10
	},
	gridView: {
		// marginTop: 10,
	},
	homeNavItem: {
		width: 75
	},
	navGrid: {
		marginBottom: 40
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
	homeNewsItem: {
		position: 'relative',
		height: 110,
		maxWidth: '48%',
		backgroundColor: '#FFFFFF',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		// shadowColor: '#000000',
		// shadowOffset: {
		//   width: 2,
		//   height: 4,
		// },
		// shadowOpacity: 0.1,
		// shadowRadius: 3.84,
		// elevation: 8,
		padding: 15,

		flex: 1,
		flexDirection: 'column',
		margin: 1
	},
	homeNewsItemCaption: {
		color: '#54C2EF',
		fontSize: 12,
		lineHeight: 14,
		marginBottom: 10
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
	priceValue: {
		color: '#DF5649',
		fontSize: 36,
		fontWeight: '500',
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
		marginBottom: 20
	},
	specialOfferCaption: {
		color: '#ffffff',
		marginBottom: 10
	},
	specialOfferText: {
		color: '#ffffff'
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

export default SetCodeScreen;