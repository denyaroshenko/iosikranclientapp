import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	Dimensions
} from 'react-native';

import SplashScreenLogo from '../assets/SplashScreenLogo';
// import SplashScreenImage from '../assets/SplashScreenImage';

function SplashScreen() {
	return (
		<View style={styles.container}>
			<SplashScreenLogo style={styles.logo} />

			<View style={styles.descriptionWrapper}>
				<Text style={styles.description}>ЛИЧНЫЙ КАБИНЕТ</Text>
				<Text style={styles.description}>арендатора башенного крана</Text>
			</View>

			<Image style={styles.coverImage} source={require('../assets/images/splash-screen-cover.png')} />

			{/* <SplashScreenImage style={styles.coverImage} /> */}

			<Text style={styles.version}>вер. 2.0</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FED400',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'

		// borderWidth: 1,
		// borderColor: 'red',
	},

	logo: {
		marginBottom: 10
	},

	coverImage: {
		position: 'absolute',
		bottom: 0,
		// height: 200,
		width: Dimensions.get('screen').width,

		// borderWidth: 1,
		// borderColor: 'red',
	},

	descriptionWrapper: {
		display: 'flex',
		marginLeft: 100
	},

	description: {
		display: 'flex',
		alignItems: 'center',
		letterSpacing: 0.09,
		color: '#000000',
		fontWeight: '300',
		fontSize: 10,
	},

	version: {
		color: '#000',
		fontWeight: '300',
		fontSize: 10,
		lineHeight: 12,
		display: 'flex',
		alignItems: 'center',
		position: 'absolute',
		bottom: 0,
		marginBottom: 20,
	}
})

export default SplashScreen;