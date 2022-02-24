import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
	StyleSheet,
	Alert,
	View,
	TextInput,
	Text,
	KeyboardAvoidingView,
	Platform
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Spinner from 'react-native-loading-spinner-overlay';

import * as RootNavigation from '../../helpers/RootNavigation';

import { Button } from '../../components';

import DotsVerticalIcon from '../../assets/Icons/DotsVerticalIcon';

import store from '../../store/store'
const state = store.getState()


import { config } from '../../config';

// Пикеры
import RNPickerSelect from 'react-native-picker-select';

const OrderCreateForm = ({ route }) => {

	const [loading, setLoading] = useState(false)
	const [userData, setUserData] = useState(null)
	// const [userID, setUserID] = useState(null)
	const [objectsAndCranes, setObjectsAndCranes] = useState([])
	const [objects, setObjects] = useState([])
	const [selectedObject, setSelectedObject] = useState(null)
	const [cranes, setCranes] = useState([])
	const [selectedCrane, setSelectedCrane] = useState(null)
	const [selectedReason, setSelectedReason] = useState('')
	const [orderDetails, setOrderDetails] = useState('')

	const { API_URL } = config

	useEffect(() => {
		let unmounted = false;

		// Получаем данные пользователя в AsyncStorage
		AsyncStorage.getItem('userData')
			.then(async (data) => {
				setUserData(JSON.parse(data))
				console.log('USER DATA', JSON.parse(data));
				// fetchObjects(JSON.parse(data).id)
				fetchObjectsAndCranes(JSON.parse(data).id)
			})

		return () => { unmounted = true };
	}, []);

	// Получаем список кранов
	const getCranes = (objectID) => {
		const selectedObject = objectsAndCranes.find(object => object.id === objectID)
		const cranes = selectedObject.cranes
		console.warn(cranes);

		// Нормализуем краны для пикера
		const cranesPicker = []
		selectedObject.cranes.map((item, i) => {
			cranesPicker.push({
				label: item.name,
				value: item.id
			})
		})

		setCranes(cranesPicker)
	}

	// Получаем список объектов
	const fetchObjectsAndCranes = (userID) => {
		console.log('[INFO] Получаем список объектов и кранов');

		fetch(API_URL + '/objects_and_cranes/holding?id=' + userID)
			.then((response) => response.json())
			.then((json) => {
				const objectsAndCranes = json.data
				setObjectsAndCranes(objectsAndCranes)

				console.info(objectsAndCranes)

				// Нормализуем объекты для пикера
				const objectsPicker = []
				objectsAndCranes.map((item, i) => {
					objectsPicker.push({
						label: item.name,
						value: item.id
					})
				})

				setObjects(objectsPicker)
			})
			.catch((error) => {
				console.error(error)
				Alert.alert(
					'Ошибка',
					error,
				);
			})
			.finally(() => setLoading(false));
	}

	// Обработчик выбора объекта
	const handleObjectPickerSelect = async (objectID) => {
		setSelectedObject(objectID)
		setCranes([])
		setSelectedCrane(null)
		getCranes(objectID)
	}

	// Отправка заявки
	const handlerOrderSubmit = async () => {
		if (selectedObject && selectedCrane && selectedReason) {
			setLoading(true)

			const message = {
				id: userData.id,
				contact_id: userData.contact_id,

				object_id: selectedObject,
				crane_id: selectedCrane,
				purpose: selectedReason,
				detail: orderDetails
			};

			// Сериализуем параметы для GET запроса
			let parameters = "";
			for (var key in message) {
				if (parameters != "") {
					parameters += "&";
				}
				parameters += key + "=" + encodeURIComponent(message[key]);
			}

			// console.log('[MESSAGE]', message);
			// console.log(parameters);

			await fetch(`${API_URL}/request2/add?${parameters}`, {
				method: 'GET',
			})
				.then((response) => {
					const data = JSON.stringify(response.json())
					RootNavigation.navigate('OrderCreateSuccessScreen')
				})
				.finally(() => setLoading(false))
		} else {
			Alert.alert(
				//title
				'Ошибка',
				//body
				'Проверьте правильность заполнения формы',
				[
					{
						text: 'ОК',
						onPress: () => console.log('No Pressed'), style: 'cancel'
					},
				],
				{ cancelable: false },
				//clicking out side of alert will not cancel
			);
		}
	}

	const items = [
		{ label: 'Техподдержка', value: 'Техподдержка' },
		{ label: 'Крановщики', value: 'Крановщики' },
		{ label: 'Прочее', value: 'Прочее' },
	];

	return (

		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.container}
		>
			<View>
				{/* DEBUG */}
				{/* <Text>client_id: { }</Text>
				<Text>selectedObject: {selectedObject}</Text>
				<Text>selectedCrane: {selectedCrane}</Text>
				<Text>selectedReason: {selectedReason}</Text> */}

				<Spinner visible={loading} />

				<View style={{ marginBottom: 20 }}>

					<RNPickerSelect
						style={pickerStyle}
						placeholder={{ label: 'Выберите объект', value: null }}
						doneText="Выбрать"
						useNativeAndroidPickerStyle={false}
						// Icon={() => {
						// 	return <DotsVerticalIcon style={pickerStyle.icon} />;
						// }}
						onValueChange={(value) => handleObjectPickerSelect(value)}
						items={objects}
					/>

					<RNPickerSelect
						// disabled={Boolean(selectedObject)}
						style={pickerStyle}
						placeholder={{ label: 'Выберите кран', value: null }}
						doneText="Выбрать"
						useNativeAndroidPickerStyle={false}
						// Icon={() => {
						// 	return <DotsVerticalIcon style={pickerStyle.icon} />;
						// }}
						onValueChange={(craneID) => setSelectedCrane(craneID)}
						items={cranes}
					/>

					<RNPickerSelect
						// disabled={Boolean(selectedObject)}
						style={pickerStyle}
						placeholder={{ label: 'Выберите причину вызова', value: null }}
						doneText="Выбрать"
						useNativeAndroidPickerStyle={false}
						// Icon={() => {
						// 	return <DotsVerticalIcon style={pickerStyle.icon} />;
						// }}
						onValueChange={(text) => setSelectedReason(text)}
						items={[
							{
								label: 'Техподдержка',
								value: 'Техподдержка'
							},
							{
								label: 'Крановщики',
								value: 'Крановщики'
							},
							{
								label: 'Прочее',
								value: 'Прочее'
							}
						]}
					/>

					<TextInput
						style={styles.textarea}
						multiline={true}
						numberOfLines={4}
						onChangeText={text => setOrderDetails(text)}
						placeholder="Детали вызова"
						placeholderTextColor="#6e6e6e"
					/>

					<View style={styles.buttonArea}>
						<Button
							backgroundColor='#FED400'
							color="#000"
							onPress={() => { handlerOrderSubmit() }}
						>отправить</Button>
					</View>
				</View>
			</View>
		</KeyboardAvoidingView>
	)
}

OrderCreateForm.propTypes = {
	// errorMessage: PropTypes.string.isRequired,
	// loggingIn: PropTypes.bool.isRequired,
	// login: PropTypes.func.isRequired,
};

export default OrderCreateForm;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// marginTop: StatusBar.currentHeight || 0,
		// marginHorizontal: 15,
	},

	input: {
		color: '#000',
		backgroundColor: '#f0f0f0',
		borderRadius: 4,
		borderBottomColor: '#54C2EF',
		borderBottomWidth: 2,
		marginBottom: 20,
		paddingVertical: 20,
		paddingHorizontal: 15

	},

	textarea: {
		color: '#000',
		height: 100,
		textAlignVertical: 'top',
		backgroundColor: '#f0f0f0',
		borderRadius: 6,
		borderBottomColor: '#54C2EF',
		borderBottomWidth: 2,
		marginTop: 5,
		marginBottom: 20,
		marginHorizontal: 20,
		paddingTop: 15,
		paddingVertical: 30,
		paddingHorizontal: 15
	},

	buttonArea: {
		display: 'flex',
		alignItems: 'center',
		padding: 20
	},
});

const pickerStyle = {
	inputIOS: {
		height: 60,
		position: 'relative',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		paddingVertical: 20,
		marginHorizontal: 20,
		marginBottom: 10,
		backgroundColor: '#fff',
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.1,
		shadowRadius: 4.65,
		elevation: 8,

		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
	},

	inputAndroid: {
		color: '#000',
		height: 60,
		// position: 'relative',
		// display: 'flex',
		// flexDirection: 'row',
		// alignItems: 'center',
		// justifyContent: 'space-between',
		paddingHorizontal: 20,
		paddingVertical: 20,
		marginHorizontal: 20,
		marginBottom: 15,
		backgroundColor: '#fff',
		shadowColor: "#000",
		borderRadius: 10,
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.1,
		shadowRadius: 4,

		elevation: 8,
	},

	placeholderColor: '#000',

	underline: { borderTopWidth: 0 },

	icon: {
		position: 'absolute',
		top: 20,
		right: 37,

		// backgroundColor: 'red',
	},
};
