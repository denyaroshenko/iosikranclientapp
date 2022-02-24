import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	SafeAreaView,
	ScrollView
} from 'react-native';

import { Button } from '../components';
import HTML from "react-native-render-html";

const CraneDetailScreen = ({ route, navigation }) => {

	const { name, image, height, length, weight, weight_end, description } = route.params.item;

	React.useLayoutEffect(() => {
		navigation.setOptions({
			'title': name,
		});
	}, [navigation, name]);

	return (
		<View style={styles.screen}>
			<ScrollView >
				<SafeAreaView style={styles.container}>
					<Image
						style={styles.image}
						source={{
							uri: image
						}}
					/>

					<Text style={styles.title}>{name}</Text>
					<View style={styles.props}>
						<View style={styles.propsRow}>
							<Text style={styles.propsLabel}>Высота подъема:</Text>
							<Text style={styles.propsValue}>{height}</Text>
						</View>
						<View style={styles.propsRow}>
							<Text style={styles.propsLabel}>Длина стрелы</Text>
							<Text style={styles.propsValue}>{length}</Text>
						</View>
						<View style={styles.propsRow}>
							<Text style={styles.propsLabel}>Грузоподъемность:</Text>
							<Text style={styles.propsValue}>{weight}</Text>
						</View>
						<View style={styles.propsRow}>
							<Text style={styles.propsLabel}>Грузоподъемность на конце стрелы:</Text>
							<Text style={styles.propsValue}>{weight_end}</Text>
						</View>
					</View>

					<View style={styles.textWrapper}>
						<HTML style={styles.text} source={{ html: description }} />
					</View>

				</SafeAreaView>
			</ScrollView>

			<View style={styles.stickyArea}>
				<Button onPress={() => navigation.navigate('CommercialOfferScreen')}>заказать предложение</Button>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		// backgroundColor: '#f3f3f3',
		backgroundColor: '#fff',
	},

	container: {
		flex: 1,
		margin: 15,
	},

	image: {
		width: '100%',
		height: 250,
		marginBottom: 10,
	},

	title: {
		color: '#000',
		fontSize: 18,
		fontWeight: '500',
		marginBottom: 15
	},

	props: {
		width: '100%',
		marginBottom: 10
	},

	propsRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10
	},

	propsLabel: {
		fontWeight: '500',
		fontSize: 14,
		display: 'flex',
		alignItems: 'center',
		color: '#000',
	},

	propsValue: {
		fontSize: 14,
		display: 'flex',
		alignItems: 'center',
		textAlign: 'right',
		color: '#000'
	},

	text: {
		fontSize: 14,
		lineHeight: 20,
		color: '#000',
		marginBottom: 70,

		// borderColor: 'red',
		// borderWidth: 1,
	},

	textWrapper: {
		marginBottom: 30
	},

	stickyArea: {
		display: 'flex',
		position: 'absolute',
		alignSelf: 'flex-end',
		bottom: 0,
		alignItems: 'center',

		width: '100%',
		padding: 30
	}
});

export default CraneDetailScreen;