import React from 'react'
import {
	StyleSheet,
	Text,
	SafeAreaView,
	ScrollView,
} from 'react-native';

import CommercialOfferCreateForm from '../containers/offer/CommercialOfferCreateForm';

const CommercialOfferScreen = ({ navigation }) => {

	React.useLayoutEffect(() => {
		navigation.setOptions({
			'title': 'Запрос КП',
		});
	}, [navigation, 'Запрос КП']);

	return (
		<SafeAreaView style={styles.screen}>
			<ScrollView style={styles.container}>
				<Text style={styles.caption}>Вы можете отправить нам заявку на запрос башенных кранов в аренду</Text>
				<CommercialOfferCreateForm />
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
});

export default CommercialOfferScreen;