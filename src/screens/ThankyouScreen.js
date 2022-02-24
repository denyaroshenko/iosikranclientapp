import React from 'react';
import { StatusBar, StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';

import { Button } from '../components';

import MessageIcon from '../assets/Icons/Header/MessageIcon';
import PhoneIcon from '../assets/Icons/Header/PhoneIcon';
import Logo from '../assets/Icons/Header/Logo';

function ThankyouScreen({ navigation }) {

	React.useLayoutEffect(() => {
		navigation.setOptions({
			'title': null,
			headerStyle: {
				backgroundColor: '#FED000',
				height: StatusBar.currentHeight,
				elevation: 0,
				shadowOpacity: 0,
				borderBottomWidth: 0,
			},
			headerLeft: () => null,
		});
	}, [navigation, '']);

	return (
		<ScrollView style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
			<View style={styles.yellowTop}>
				<Logo />
				<View style={{ display: 'flex', flexDirection: 'row' }}>
					<MessageIcon style={{ marginRight: 20 }} />
					<PhoneIcon />
				</View>
			</View>

			<View style={styles.companyCardWrapper}>
				<View style={styles.companyCardHalfBg}></View>
				<View style={styles.companyCard}>
					<Text style={styles.tileTitle}>Спасибо за обращение!</Text>
					<Text style={styles.tileText}>Запрос на получение новых учетных данных успешно отправлен менеджеру. В ближайшее время наш менеджер с Вами свяжется</Text>
					<SafeAreaView>
						<View style={{ display: 'flex', alignItems: 'center', marginBottom: 40 }}>
							<Button
								backgroundColor='#DF5649'
								color="#fff"
								onPress={() => navigation.navigate('AuthScreen')}
							>авторизация</Button>
						</View>
					</SafeAreaView>
				</View>
			</View>

		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// marginTop: StatusBar.currentHeight || 0,
		marginHorizontal: 15,
	},
	yellowTop: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 16,
		paddingBottom: 24,
		backgroundColor: '#FED000'
	},
	homeNavItem: {
		width: 75
	},
	homeNavItemIcon: {
		// position: 'relative',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: 75,
		height: 75,
		backgroundColor: '#FFFFFF',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		shadowColor: '#000000',
		shadowOffset: {
			width: 2,
			height: 4,
		},
		shadowOpacity: 0.1,
		shadowRadius: 3.84,
		elevation: 8,
		marginBottom: 6,
	},
	homeNavItemIconImage: {
		width: 35,
		height: 35,
		resizeMode: 'contain'
	},


	companyCardWrapper: {
		position: 'relative',
		marginBottom: 20
	},
	companyCardHalfBg: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		height: '50%',
		backgroundColor: '#fed000'
	},
	companyCard: {
		marginHorizontal: 15,
		paddingVertical: 25,
		paddingHorizontal: 20,
		backgroundColor: '#FFFFFF',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		shadowColor: '#000000',
		shadowOffset: {
			width: 2,
			height: 4,
		},
		shadowOpacity: 0.1,
		shadowRadius: 3.84,
		elevation: 8,
	},
	tileTitle: {
		fontSize: 18,
		lineHeight: 22,
		display: 'flex',
		alignItems: 'center',
		textAlign: 'center',
		color: '#000',
		marginTop: 35,
		marginBottom: 70
	},
	tileText: {
		color: '#747474',
		fontSize: 16,
		fontWeight: '300',
		lineHeight: 22,
		marginBottom: 15,
		textAlign: 'center',
		marginBottom: 70
	},
});

export default ThankyouScreen;