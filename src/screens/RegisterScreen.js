import React from 'react';
import {
	StatusBar,
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	ScrollView,
	TextInput,
	Animated,
	TouchableOpacity,
	Linking
} from 'react-native';

import * as RootNavigation from '../helpers/RootNavigation';

import MessageIcon from '../assets/Icons/Header/MessageIcon';
import PhoneIcon from '../assets/Icons/Header/PhoneIcon';
import Logo from '../assets/Icons/Header/Logo';

import { config } from '../config'
import BackIcon from '../assets/Icons/BackIcon';
import RegisterForm from '../containers/auth/RegisterForm';

function RegisterScreen({ navigation }) {

	React.useLayoutEffect(() => {
		navigation.setOptions({
			'title': null,
			headerTransparent: true,
			headerBackTitleVisible: false,
			headerLeft: () => null,
		});
	}, [navigation, '']);

	return (
		<ScrollView style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
			<View style={styles.yellowTop}>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<TouchableOpacity onPress={() => navigation.goBack(null)} >
						<BackIcon style={{ marginRight: 25 }} />
					</TouchableOpacity>
					<Logo />
				</View>
				<View style={{ display: 'flex', flexDirection: 'row' }}>
					<TouchableOpacity onPress={() => RootNavigation.navigate('OnlineChatScreen')}>
						<MessageIcon style={{ marginRight: 20 }} />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => { Linking.openURL('tel:88002222559') }}><PhoneIcon /></TouchableOpacity>
				</View>
			</View>

			<View style={styles.companyCardWrapper}>
				<View style={styles.companyCardHalfBg}></View>
				<View style={styles.companyCard}>
					<Text style={styles.caption}>Еще не являетесь нашим клиентом? Отправьте заявку и наш менеджер свяжется с Вами для заключения договора.</Text>
					<RegisterForm />
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

	caption: {
		color: '#747474',
		fontSize: 16,
		fontWeight: '300',
		lineHeight: 22,
		marginBottom: 20,
		textAlign: 'center'
	},

	input: {
		backgroundColor: '#f0f0f0',
		borderRadius: 4,
		borderBottomColor: '#54C2EF',
		borderBottomWidth: 2,
		marginBottom: 20,
		paddingVertical: 20,
		paddingHorizontal: 15

	},

	labelInput: {
		color: '#673AB7',
	},

	formInput: {
		borderBottomWidth: 1.5,
		marginLeft: 20,
		borderColor: '#333',
	},
});

export default RegisterScreen;