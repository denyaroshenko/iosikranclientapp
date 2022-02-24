import React, { useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	ScrollView,
} from 'react-native';

import { GrayText, Button, SectionTitle, ObjectBlockItem } from '../components';

const CommercialOfferSuccessScreen = ({ navigation }) => {

	React.useLayoutEffect(() => {
		navigation.setOptions({
			'title': 'Запрос КП',
		});
	}, [navigation, 'Запрос КП']);


	const [city, setCity] = useState(''); // Ваш город
	const [leaseDuration, setLeaseDuration] = useState(''); // Срок аренды, мес.
	const [dateStart, setDateStart] = useState(''); // Дата начала аренды
	const [craneCount, setCraneCount] = useState(''); // Количество кранов
	const [comment, setComment] = useState(''); // Комментарий

	const submitOrder = (e) => {
		e.preventDefault();

		// Устанавливаем inloading
		setLoading(true);

		// Валидация формы
		// form.current.validateAll();

		// // if (checkBtn.current.context._errors.length === 0) {
		// dispatch(login(username, password))
		// 	.then(() => {
		// 		props.history.push("/profile");
		// 		window.location.reload();

		// 		AsyncStorage.setItem('loggedIn', true);
		// 		storeToken()
		// 	})
		// 	.catch(() => {
		// 		setLoading(false);
		// 	});
		// // } else {
		// // setLoading(false);
		// // }
	};

	return (
		<SafeAreaView style={styles.screen}>
			<ScrollView style={styles.container}>
				<Text style={styles.caption}>Ваш запрос принят, в ближайшее время менеджер свяжется с вами.</Text>

				<View style={{ display: 'flex', alignItems: 'center' }}>
					<Button onPress={() => navigation.navigate('HomeScreen')} backgroundColor='#FED400' color="#000">главная</Button>
				</View>

			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: '#fff'
	},

	container: {
		flex: 1,
		// marginTop: StatusBar.currentHeight || 0,
		padding: 25,
	},

	caption: {
		fontWeight: '300',
		fontSize: 14,
		lineHeight: 16,
		display: 'flex',
		alignItems: 'center',
		textAlign: 'center',
		color: '#000',
		marginBottom: 30
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
});

export default CommercialOfferSuccessScreen;