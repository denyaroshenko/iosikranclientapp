import React from 'react';
import * as RootNavigation from '../helpers/RootNavigation';

import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity
} from 'react-native';

import BackIcon from '../assets/Icons/BackIcon'

import { Button } from '../components';

const OrderEditSuccessScreen = ({ navigation, route }) => {

	React.useLayoutEffect(() => {
		navigation.setOptions({
			'title': 'Помощь',
			// headerLeft: () => <BackIcon style={{ marginLeft: 15 }} onPress={() => navigation.pop(2)} />
		});
	}, [navigation, 'Помощь']);

	return (
		<View style={styles.screen}>
			<Text></Text>

			<Text style={styles.worktime}>Ваш запрос принят, в ближайшее время менеджер свяжется с вами.</Text>

			<View style={styles.stickyArea}>
				<Button backgroundColor='#FED400' color="#000" onPress={() => { navigation.pop(2) }}>вернуться к заявке</Button>
				<TouchableOpacity
					style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 25 }}
					onPress={() => { RootNavigation.navigate('HomeScreen') }}
				>
					<Text style={styles.link}>главная</Text>
				</TouchableOpacity>
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

	link: {
		fontWeight: '300',
		fontSize: 12,
		lineHeight: 14,
		textAlign: 'center',
		textDecorationLine: 'underline',
		color: '#2C98F0'
	},

	stickyArea: {
		display: 'flex',
		alignItems: 'center',

		width: '100%',
		padding: 20
	}
});

export default OrderEditSuccessScreen;