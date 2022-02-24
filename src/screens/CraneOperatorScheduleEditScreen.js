import React, { useState, useEffect } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import AsyncStorage from '@react-native-async-storage/async-storage';

import Moment from 'moment';
import 'moment/locale/ru'  // without this line it didn't work

import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	TouchableOpacity,
} from 'react-native';

import { Button } from '../components';
import DotsVerticalIcon from '../assets/Icons/DotsVerticalIcon';
import Spinner from 'react-native-loading-spinner-overlay';

import { config } from '../config';

const InputItem = ({ placeholder, onPress }) => {
	return (
		<TouchableOpacity
			style={styles.inputItem}
			onPress={onPress}
		>
			<Text style={styles.name}>{placeholder}</Text>
			<DotsVerticalIcon />
		</TouchableOpacity >
	)
}

// export default class CraneOperatorScheduleEditScreen extends Component {
const CraneOperatorScheduleEditScreen = ({ navigation, route }) => {

	React.useLayoutEffect(() => {
		navigation.setOptions({
			'title': 'Изменение графика', // устанавливаем собственный заголовок экрана,
		});
	}, [navigation, 'Изменение графика']);

	Moment.locale('ru');

	const { API_URL } = config

	const [userData, setUserData] = useState(null)

	// console.log('ТЕКУЩИЙ STATE', state)

	useEffect(() => {

		// Получаем данные пользователя в AsyncStorage
		AsyncStorage.getItem('userData')
			.then(async (data) => {
				setUserData(JSON.parse(data))
			})
	}, []);

	const item = route.params.item
	const { id } = item

	const [loading, setLoading] = useState(false)

	const [isDateFromPickerVisible, setDateFromPickerVisibility] = useState(false)
	const [isDateToPickerVisible, setDateToPickerVisibility] = useState(false)
	const [isTimeFromPickerVisible, setTimeFromPickerVisibility] = useState(false)
	const [isTimeToPickerVisible, setTimeToPickerVisibility] = useState(false)

	const [dateFrom, setDateFrom] = useState(new Date())
	const [dateTo, setDateTo] = useState(new Date())
	const [timeFrom, setTimeFrom] = useState(new Date())
	const [timeTo, setTimeTo] = useState(new Date())
	const [hours, setHours] = useState(0)
	const [between, setBetween] = useState(0)

	const showDateFromPicker = () => { setDateFromPickerVisibility(true) }
	const showDateToPicker = () => { setDateToPickerVisibility(true) }
	const showTimeFromPicker = () => { setTimeFromPickerVisibility(true) }
	const showTimeToPicker = () => { setTimeToPickerVisibility(true) }

	const hideDateFromPicker = () => { setDateFromPickerVisibility(false) }
	const hideDateToPicker = () => { setDateToPickerVisibility(false) }
	const hideTimeFromPicker = () => { setTimeFromPickerVisibility(false) }
	const hideTimeToPicker = () => { setTimeToPickerVisibility(false) }

	// Считаем количество часов
	const getBetween = () => {
		console.log('[INFO] Считаем between')

		var hours = Math.round(Math.abs(dateTo - dateFrom) / 36e5);
		setBetween(hours)
	}

	// Конвертируем миллисекунды в секунды
	function convertMS(milliseconds) {
		var day, hour, minute, seconds;
		seconds = Math.floor(milliseconds / 1000);
		minute = Math.floor(seconds / 60);
		seconds = seconds % 60;
		hour = Math.floor(minute / 60);
		minute = minute % 60;
		day = Math.floor(hour / 24);
		hour = hour % 24;
		return {
			day: day,
			hour: hour,
			minute: minute,
			seconds: seconds
		};
	}

	// Конвертируем дату в строку
	function dateToString(date) {
		const dd = date.getUTCDate()
		const mm = ('0' + (date.getUTCMonth() + 1)).slice(-2)
		const yyyy = date.getUTCFullYear()
		const hh = ('0' + date.getUTCHours()).slice(-2)
		const m = ('0' + date.getUTCMinutes()).slice(-2)

		return `${dd}.${mm}.${yyyy} (${hh}:${m})`
	}

	// Считаем количество часов
	const calcHours = () => {
		let hours = Math.round(Math.abs(timeTo - timeFrom));
		setHours(convertMS(hours).hour)

		// console.log('[INFO] Считаем часы', timeTo, timeFrom, convertMS(hours).hour)
	}

	// Дата ОТ
	const handleDateFromConfirm = (date) => {
		console.log("[DATE] A date has been picked: ", dateToString(date))
		setDateFrom(date)
		getBetween()
		hideDateFromPicker();
	};

	// Дата ДО
	const handleDateToConfirm = (date) => {
		console.log("[DATE] A date has been picked: ", dateToString(date))
		setDateTo(date)
		getBetween()
		hideDateToPicker();
	};

	// Время ОТ
	const handleTimeFromConfirm = (date) => {
		console.log("[TIME] A time has been picked: ", dateToString(date))
		setTimeFrom(date)
		calcHours()
		hideTimeFromPicker()
	};

	// Время ДО
	const handleTimeToConfirm = (date) => {
		console.log("[TIME] A time has been picked: ", dateToString(date))
		setTimeTo(date)
		calcHours()
		hideTimeToPicker()
	};

	async function handlerChangeOperatorSchedule() {
		setLoading(true)

		const message = {
			id: userData.id,
			passhash: userData.passhash,
			contact_id: userData.contact_id,

			object_crane_id: id, // ID крана на объекте
			date_from: dateToString(dateFrom),
			date_to: dateToString(dateTo),
			hours: hours,
		};

		// Сериализуем параметы для GET запроса
		let parameters = "";
		for (var key in message) {
			if (parameters != "") {
				parameters += "&";
			}
			parameters += key + "=" + encodeURIComponent(message[key]);
		}

		// console.log(parameters)

		await fetch(`${API_URL}/request3/add?${parameters}`, {
			method: 'GET',
		})
			.then((response) => {
				// const data = JSON.stringify(response.json())
				navigation.navigate('CraneOperatorScheduleSuccessScreen')
			})
			.finally(() => setLoading(false))

	}

	return (
		<View style={styles.screen}>

			{/* <Text>object_crane_id: {id}</Text>
			<Text>date_from: {dateFrom.toString()}</Text>
			<Text>date_to: {dateTo.toString()}</Text>
			<Text>time_from: {timeFrom.toString()}</Text>
			<Text>time_to: {timeTo.toString()}</Text>
			<Text>hours: {hours}</Text> */}

			<Spinner visible={loading} />

			<Text style={styles.worktime}>Здесь вы можете разместить заявку на изменение графика крановщиков</Text>

			<InputItem placeholder={'Дата ОТ - ' + Moment(dateFrom).format('D MMMM YYYY')} onPress={showDateFromPicker} />
			<DateTimePickerModal
				locale="ru_RU"
				isVisible={isDateFromPickerVisible}
				mode="date"
				onConfirm={handleDateFromConfirm}
				onCancel={hideDateFromPicker}
				confirmTextIOS="Выбрать"
				cancelTextIOS="Отмена"
			/>

			<InputItem placeholder={'Дата ДО - ' + Moment(dateTo).format('D MMMM YYYY')} onPress={showDateToPicker} />
			<DateTimePickerModal
				locale="ru_RU"
				isVisible={isDateToPickerVisible}
				mode="date"
				onConfirm={handleDateToConfirm}
				onCancel={hideDateToPicker}
				confirmTextIOS="Выбрать"
				cancelTextIOS="Отмена"
			/>

			<InputItem placeholder={'Время ОТ - ' + Moment(timeFrom).format('HH:mm')} onPress={showTimeFromPicker} />
			<DateTimePickerModal
				locale="ru_RU"
				isVisible={isTimeFromPickerVisible}
				mode="time"
				onConfirm={handleTimeFromConfirm}
				onCancel={hideTimeFromPicker}
				confirmTextIOS="Выбрать"
				cancelTextIOS="Отмена"
			/>

			<InputItem placeholder={'Время ДО - ' + Moment(timeTo).format('HH:mm')} onPress={showTimeToPicker} />
			<DateTimePickerModal
				locale="ru_RU"
				isVisible={isTimeToPickerVisible}
				mode="time"
				onConfirm={handleTimeToConfirm}
				onCancel={hideTimeToPicker}
				confirmTextIOS="Выбрать"
				cancelTextIOS="Отмена"
			/>

			{/* <Text style={styles.resume}>Общее количество часов: <Text style={styles.resume_hours}>{between ?? '0'}</Text></Text> */}

			<View style={styles.stickyArea}>
				<Text style={styles.note}>Заявка должна быть подана не менее, чем за 3 рабочих дня!</Text>
				<Button backgroundColor='#FED400' color="#000" onPress={() => { handlerChangeOperatorSchedule() }}>отправить</Button>
			</View>

		</View>
	)
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: '#f5f5f5',
	},

	container: {
		flex: 1,
		marginHorizontal: 15
	},

	inputItem: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		paddingVertical: 18,
		marginHorizontal: 20,
		marginBottom: 10,
		backgroundColor: '#fff',
		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.1,
		shadowRadius: 4.65,

		elevation: 8,
	},

	icon: {
		marginRight: 20
	},

	details: {
		flex: 1,
		flexGrow: 1
	},

	name: {
		fontSize: 15,
		lineHeight: 18,
		display: 'flex',
		alignItems: 'center',
		color: '#000',
		marginBottom: 5
	},

	flatList: {
		// paddingHorizontal: 15,
		paddingBottom: 20,
	},
	rowStyle: {
		flex: 1,
	},
	dateInput: {
		width: '100%',
		color: '#000000',
		// opacity: 0.54,
		fontSize: 16,
		lineHeight: 18,
		backgroundColor: '#ffffff',
		borderRadius: 10,
		borderColor: '#ffffff',

		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingVertical: 18,
		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.1,
		shadowRadius: 4.65,

		elevation: 8,

		marginVertical: 8,
		marginHorizontal: 16,

	},
	worktime: {
		color: '#000000',
		fontWeight: '300',
		fontSize: 14,
		lineHeight: 18,
		display: 'flex',
		alignItems: 'center',
		textAlign: 'center',
		maxWidth: '90%',
		alignSelf: 'center',
		marginTop: 15,
		marginBottom: 15
	},
	worktimeRed: {
		color: 'red',
		fontWeight: '600'
	},
	resume: {
		color: '#313135',
		fontSize: 20,
		lineHeight: 24,
		display: 'flex',
		alignItems: 'center',
		textAlign: 'center',
		marginTop: 20
	},
	resume_hours: {
		fontWeight: '600'
	},
	note: {
		color: '#313135',
		fontSize: 12,
		lineHeight: 14,
		display: 'flex',
		alignItems: 'center',
		textAlign: 'center',
		marginBottom: 20,
		paddingHorizontal: 40
	},

	stickyArea: {
		display: 'flex',
		position: 'absolute',
		alignSelf: 'flex-end',
		bottom: 30,
		alignItems: 'center',

		width: '100%',
		padding: 20,
	}
});

export default CraneOperatorScheduleEditScreen;