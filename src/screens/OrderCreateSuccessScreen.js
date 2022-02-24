import React from 'react';
import * as RootNavigation from '../helpers/RootNavigation';

import {
	StyleSheet,
	Text,
	View,
} from 'react-native';

import BackIcon from '../assets/Icons/BackIcon'

import { Button } from '../components';

const OrderCreateSuccessScreen = ({ navigation, route }) => {

	React.useLayoutEffect(() => {
		navigation.setOptions({
			'title': 'Помощь',
			// headerLeft: () => <BackIcon style={{ marginLeft: 15 }} onPress={() => RootNavigation.navigate('HelpScreen')} />
		});
	}, [navigation, 'Помощь']);

	return (
		<View style={styles.screen}>
			<Text style={styles.worktime}>Ваш запрос принят, в ближайшее время менеджер свяжется с вами.</Text>

			<View style={styles.stickyArea}>
				<Button backgroundColor='#FED400' color="#000" onPress={() => { RootNavigation.navigate('HomeScreen'); }}>главная</Button>
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

	stickyArea: {
		display: 'flex',
		alignItems: 'center',

		width: '100%',
		padding: 20
	}
});

export default OrderCreateSuccessScreen;