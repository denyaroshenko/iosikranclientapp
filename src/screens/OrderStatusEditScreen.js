import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	ScrollView,
	KeyboardAvoidingView,
} from 'react-native';

import OrderStatusEditForm from '../containers/order/OrderStatusEditForm';

const OrderStatusEditScreen = ({ navigation, route }) => {

	React.useLayoutEffect(() => {
		navigation.setOptions({
			'title': 'Изменение статуса',
		});
	}, [navigation, 'Изменение статуса']);

	return (
		<ScrollView style={styles.screen}>
			<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>

				<SafeAreaView style={styles.container}>

					<Text style={styles.title}>Выберите статус заявки</Text>

					<OrderStatusEditForm route={route} />

				</SafeAreaView>

			</KeyboardAvoidingView>
		</ScrollView >
	)
}

const styles = StyleSheet.create({
	screen: {
	},

	container: {
		flex: 1,
		// marginTop: StatusBar.currentHeight || 0,
		marginTop: 15
	},

	title: {
		fontWeight: 'bold',
		fontSize: 18,
		lineHeight: 28,
		display: 'flex',
		alignItems: 'center',
		textAlign: 'center',
		color: '#000',
		marginBottom: 20
	},

	details: {
		flex: 1,
		flexGrow: 1,
		backgroundColor: '#fff'
	},
	name: {
		fontSize: 15,
		lineHeight: 18,
		display: 'flex',
		alignItems: 'center',
		color: '#000',
		marginBottom: 5
	},

	// Позиционирование модальног окна
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: 'rgba(0,0,0,0.5)'
	},

	radio: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 15,
		paddingHorizontal: 20,
	},

	radioDivider: {
		display: 'flex',
		backgroundColor: '#000',
		height: 1,
		backgroundColor: '#ededed'
	},

	radioList: {
		marginHorizontal: 20,
		marginBottom: 15,
		// paddingVertical: 10,
		backgroundColor: '#fff',
		borderRadius: 6,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.5,
		shadowRadius: 5,
		elevation: 5,
	},

	radioLabel: {
		fontWeight: '400',
		fontSize: 16,
		lineHeight: 24,
		color: 'rgba(117, 117, 117, 0.87)'
	},

	textarea: {
		color: '#000',
		fontSize: 18,
		textAlignVertical: 'top',
		paddingTop: 15,
		backgroundColor: 'rgba(0, 0, 0, 0.06)',
		borderRadius: 6,
		borderBottomColor: '#54C2EF',
		borderBottomWidth: 2,
		marginTop: 5,
		marginBottom: 20,
		marginHorizontal: 20,
		paddingHorizontal: 15,
	},

	buttonArea: {
		display: 'flex',
		alignItems: 'center',
		padding: 20
	},
});

export default OrderStatusEditScreen;