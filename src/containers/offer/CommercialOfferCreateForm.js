import React, { useState, useEffect } from 'react';
import {
	Alert,
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Spinner from 'react-native-loading-spinner-overlay';

import DateTimePickerModal from "react-native-modal-datetime-picker";

import * as RootNavigation from '../../helpers/RootNavigation';

import Moment from 'moment';
import 'moment/locale/ru'  // without this line it didn't work

import { Button } from '../../components';
import { config } from '../../config';

const { API_URL } = config

const CommercialOfferCreateForm = () => {

	const [loading, setLoading] = useState(false)
	const [userData, setUserData] = useState(null)
	const [city, setCity] = useState('') // Ваш город
	const [leaseDuration, setLeaseDuration] = useState('') // Срок аренды, мес.
	const [date, setDate] = useState(null) // Дата начала аренды
	const [craneCount, setCraneCount] = useState('') // Количество кранов
	const [comment, setComment] = useState('') // Комментарий

	const [isDateFromPickerVisible, setDateFromPickerVisibility] = useState(false);
	const showDateFromPicker = () => {
		setDateFromPickerVisibility(true)
	}
	const [dateFrom, setDateFrom] = useState(new Date())
	const hideDateFromPicker = () => { setDateFromPickerVisibility(false) }

	useEffect(() => {
		// Получаем данные пользователя в AsyncStorage
		AsyncStorage.getItem('userData')
			.then(async (data) => {
				setUserData(JSON.parse(data))
			})
	}, []);

	// Отправляем заявку на коммерческое предложение
	async function submitOrder() {
		if (city && leaseDuration && date && craneCount) {
			setLoading(true)

			const message = {
				id: userData.id,
				contact_id: userData.contact_id,

				city: city,
				period: leaseDuration,
				date: Moment(date).format('D MMMM YYYY'),
				crane_count: craneCount,
				comment: comment
			};

			// Сериализуем параметы для GET запроса
			let parameters = "";
			for (var key in message) {
				if (parameters != "") {
					parameters += "&";
				}
				parameters += key + "=" + encodeURIComponent(message[key]);
			}

			// console.log(userData);
			// console.log(message);
			// console.log(parameters);

			await fetch(`${API_URL}/request/add?${parameters}`, {
				method: 'GET',
			})
				.then((response) => {
					// const data = JSON.stringify(response.json())
					RootNavigation.navigate('CommercialOfferSuccessScreen')
				})
				.finally(() => setLoading(false))
		} else {
			Alert.alert(
				'Ошибка',
				'Проверьте правильность заполнения формы',
				[
					{
						text: 'ОК',
						onPress: () => console.log('No Pressed'), style: 'cancel'
					},
				],
				{ cancelable: false },
			);
		}


	}

	// Дата
	const handleDateFromConfirm = (date) => {
		// console.log("A date has been picked: ", date);
		setDate(date)
		hideDateFromPicker();
	};

	return (
		<View>
			{/* DEBUG */}
			{/* <Text>USER ID: {userData ? userData.id : 'null'}</Text>
			<Text>CONTACT ID: {userData ? userData.contact_id : 'null'}</Text>
			<Text>CITY: {city.toString()}</Text>
			<Text>LEASING DURATION: {leaseDuration.toString()}</Text>
			<Text>DATE: {date ? date.toString() : 'null'}</Text>
			<Text>CRANE COUNT: {craneCount.toString()}</Text>
			<Text>COMMENT: {comment.toString()}</Text> */}

			<Spinner visible={loading} />

			<TextInput
				style={styles.input}
				value={city}
				onChangeText={text => setCity(text)}
				placeholder="Ваш город"
				placeholderTextColor="#6e6e6e"
			/>

			<TextInput
				style={styles.input}
				value={leaseDuration}
				onChangeText={text => setLeaseDuration(text)}
				placeholder="Срок аренды, мес."
				placeholderTextColor="#6e6e6e"
				keyboardType="numeric"
			/>

			<TouchableOpacity
				style={styles.input}
				onPress={showDateFromPicker}
			>
				<Text style={styles.placeholder}>Дата начала аренды {date ? Moment(date).format('D MMMM YYYY') : ''}</Text>
			</TouchableOpacity>

			<DateTimePickerModal
				locale="ru_RU"
				isVisible={isDateFromPickerVisible}
				mode="date"
				onConfirm={handleDateFromConfirm}
				onCancel={hideDateFromPicker}
				confirmTextIOS="Выбрать"
				cancelTextIOS="Отмена"
			/>

			<TextInput
				style={styles.input}
				value={craneCount}
				onChangeText={text => setCraneCount(text)}
				placeholder="Количество кранов"
				placeholderTextColor="#6e6e6e"
				keyboardType="number-pad"
			/>

			<TextInput
				style={styles.input}
				value={comment}
				onChangeText={text => setComment(text)}
				placeholder="Комментарий"
				placeholderTextColor="#6e6e6e"
			/>

			<View style={{ display: 'flex', alignItems: 'center' }}>
				<Button onPress={submitOrder} backgroundColor='#FED400' color="#000">отправить</Button>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	input: {
		color: '#000',
		height: 60,
		backgroundColor: '#f0f0f0',
		borderRadius: 4,
		borderBottomColor: '#54C2EF',
		borderBottomWidth: 2,
		marginBottom: 20,
		paddingVertical: 20,
		paddingHorizontal: 15
	},

	placeholder: {
		color: '#6e6e6e'
	}
});

export default CommercialOfferCreateForm;