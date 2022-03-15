import React, { useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	ScrollView,
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

import OrderCreateForm from '../containers/order/OrderCreateForm';

// import AppMetrica from 'react-native-appmetrica';
// AppMetrica.activate({
// 	apiKey: '091bb5a6-12b1-42f9-923d-429852d99030',
// 	sessionTimeout: 120,
// 	firstActivationAsUpdate: true,
// 	installedAppCollecting: true,
// });
// AppMetrica.reportEvent('Открыта страница: Заявка');

const OrderCreateScreen = ({ navigation }) => {

	React.useLayoutEffect(() => {
		navigation.setOptions({
			'title': 'Помощь', // устанавливаем собственный заголовок экрана,
		});
	}, [navigation, 'Помощь']);

	const [loading, setLoading] = useState(false)

	return (
		<ScrollView style={styles.screen}>
			<Spinner visible={loading} />

			<SafeAreaView style={styles.container}>

				<Text style={styles.caption}>Здесь вы можете разместить заявку на изменение графика крановщиков</Text>

				<OrderCreateForm />
			</SafeAreaView>
		</ScrollView >
	)
}

const styles = StyleSheet.create({
	activityIndicator: {
		// backgroundColor: 'rgba(0,0,0,.5)',
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: 999
	},

	screen: {
		backgroundColor: '#fff',
	},

	container: {
		flex: 1,
		// marginTop: StatusBar.currentHeight || 0,
		marginTop: 15
	},

	caption: {
		color: '#000000',
		fontWeight: '300',
		fontSize: 14,
		lineHeight: 18,
		display: 'flex',
		alignItems: 'center',
		textAlign: 'center',
		maxWidth: '90%',
		alignSelf: 'center',
		marginTop: 10,
		marginBottom: 15
	},
});

export default OrderCreateScreen;