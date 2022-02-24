import React, { Component, useState, useEffect } from 'react';
// import DatePicker from 'react-native-date-picker'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker from '@react-native-community/datetimepicker';

import Moment from 'moment';
import 'moment/locale/ru'  // without this line it didn't work

import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity, Modal } from 'react-native';
import styled from 'styled-components/native';
import { SectionGrid } from 'react-native-super-grid';

import { Button } from '../components';
import DotsVerticalIcon from '../assets/Icons/DotsVerticalIcon';

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
const CraneOperatorScheduleSuccessScreen = ({ navigation, route }) => {

	React.useLayoutEffect(() => {
		navigation.setOptions({
			'title': 'Изменение графика',
		});
	}, [navigation, 'Изменение графика']);

	Moment.locale('ru');

	const [isDateFromPickerVisible, setDateFromPickerVisibility] = useState(false);
	const [isDateToPickerVisible, setDateToPickerVisibility] = useState(false);
	const [isTimeFromPickerVisible, setTimeFromPickerVisibility] = useState(false);
	const [isTimeToPickerVisible, setTimeToPickerVisibility] = useState(false);

	// const [fields, setFields] = useState({
	// 	dateFrom: new Date(),
	// 	datetTo: new Date(),
	// 	timeFrom: new Date(),
	// 	timeTo: new Date(),
	// })
	const [dateFrom, setDateFrom] = useState(new Date())
	const [dateTo, setDateTo] = useState(new Date())
	const [timeFrom, setTimeFrom] = useState(new Date())
	const [timeTo, setTimeTo] = useState(new Date())
	const [between, setBetween] = useState(0)

	const showDateFromPicker = () => { setDateFromPickerVisibility(true) }
	const showDateToPicker = () => { setDateToPickerVisibility(true) }
	const showTimeFromPicker = () => { setTimeFromPickerVisibility(true) }
	const showTimeToPicker = () => { setTimeToPickerVisibility(true) }

	const hideDateFromPicker = () => { setDateFromPickerVisibility(false) }
	const hideDateToPicker = () => { setDateToPickerVisibility(false) }
	const hideTimeFromPicker = () => { setTimeFromPickerVisibility(false) }
	const hideTimeToPicker = () => { setTimeToPickerVisibility(false) }

	const getBetween = () => {
		console.log('[INFO] Считаем between')
		// var x = new Moment()
		// var y = new Moment()
		// var duration = Moment.duration(x.diff(y)).as('hours')

		var hours = Math.abs(dateTo - dateFrom) / 36e5;
		setBetween(hours)
	}

	// Дата ОТ
	const handleDateFromConfirm = (date) => {
		console.log("A date has been picked: ", date);
		setDateFrom(date)
		getBetween()
		hideDateFromPicker();
	};

	// Дата ДО
	const handleDateToConfirm = (date) => {
		console.log("A date has been picked: ", date);
		setDateTo(date)
		getBetween()
		hideDateToPicker();
	};

	// Время ОТ
	const handleTimeFromConfirm = (date) => {
		console.log("A time has been picked: ", date);
		setTimeFrom(date)
		hideTimeFromPicker();
	};

	// Время ДО
	const handleTimeToConfirm = (date) => {
		console.log("A time has been picked: ", date);
		setDateTo(date)
		hideTimeToPicker();
	};


	//----------------------------------------------------------------

	// const [modalVisible, setModalVisible] = useState(false);

	// const [isDateFromPickerVisible, setDateFromPickerVisibility] = useState(false);
	// const [isDateToPickerVisible, setDateToPickerVisibility] = useState(false);
	// const [isTimeFromPickerVisible, setTimeFromPickerVisibility] = useState(false);
	// const [isTimeToPickerVisible, setTimeToPickerVisibility] = useState(false);

	// useEffect(() => {

	// })

	// const showDateFrom = () => {
	// 	console.log('asdads')
	// 	setDateFromPickerVisibility(true)
	// }

	// const onChangeDateFrom = (event, selectedDate) => {
	// 	const currentDate = selectedDate || dateFrom;
	// 	// setShow(Platform.OS === 'ios');
	// 	setDateFrom(currentDate);
	// 	console.log(currentDate)
	// };

	// const onChangeDateTo = (event, selectedDate) => {
	// 	const currentDate = selectedDate || date;
	// 	// setShow(Platform.OS === 'ios');
	// 	setDateTo(currentDate);
	// };

	// const onChangeTimeFrom = (event, selectedDate) => {
	// 	const currentDate = selectedDate || date;
	// 	// setShow(Platform.OS === 'ios');
	// 	setTimeFrom(currentDate);
	// };

	// const onChangeTimeTo = (event, selectedDate) => {
	// 	const currentDate = selectedDate || date;
	// 	// setShow(Platform.OS === 'ios');
	// 	setTimeTo(currentDate);
	// };

	async function handlerChangeOperatorSchedule() {
		console.log('[INFO] Отправили заявку на изменение графика работы крановщиков')
		navigation.navigate('ThankyouScreen')
		// const message = {
		// 	name: name,
		// 	phone: phone,
		// };

		// await fetch(API_URL + 'registrationRequest', {
		// 	method: 'POST',
		// 	headers: {
		// 		Accept: 'application/json',
		// 		'Accept-encoding': 'gzip, deflate',
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify(message),
		// }).then((response) => {
		// 	const data = JSON.stringify(response.json())
		// 	console.log('Показываем ThankyouScreen', data);
		// 	navigation.navigate('ThankyouScreen')
		// })
	}

	return (
		<View style={styles.screen}>

			<Text style={styles.worktime}>Ваш запрос принят, в ближайшее время менеджер свяжется с вами.</Text>

			<View style={styles.stickyArea}>
				<Button backgroundColor='#FED400' color="#000" onPress={() => { navigation.navigate('HomeScreen') }}>главная</Button>
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
		color: '#000',
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
		alignItems: 'center',

		width: '100%',
		padding: 20
	}
});

export default CraneOperatorScheduleSuccessScreen;