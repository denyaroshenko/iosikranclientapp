import React, { useState } from 'react';
import {
	StyleSheet,
	Dimensions,
	View,
	Text,
} from 'react-native';

import * as RootNavigation from '../helpers/RootNavigation';

import BackIcon from '../assets/Icons/BackIcon';

import { WebView } from 'react-native-webview';

import Spinner from 'react-native-loading-spinner-overlay';

const Constants = {
	javascript: {
		injection: `
          //  document.body.innerHTML = '<div style="position:absolute;width:100%;height:100%;z-index:100;background:#fff;">Загрузка...</div>';
					// document.addEventListener('DOMContentLoaded', function(){
						let jivositeHeader = document.getElementsByClassName('headerBox_a68c');
						let jivositeHeaderNode = jivositeHeader[0];
						jivositeHeaderNode.style.display = 'none';
						jivo_api.open()
					// });
        `
	}
}

const OnlineChatScreen = ({ navigation, route }) => {

	React.useLayoutEffect(() => {
		navigation.setOptions({
			'title': 'Онлайн-чат',
			headerStyle: {
				backgroundColor: '#FED000',
				elevation: 0,
				shadowOpacity: 0,
				borderBottomWidth: 0,
			},
			// headerLeft: () => <BackIcon style={{ marginLeft: 15 }} onPress={() => navigation.goBack(null)} />
		});
	}, [navigation, 'Онлайн-чат']);

	const [loading, setLoading] = useState(false)

	return (
		<View style={styles.container}>

			<Spinner visible={loading} />

			<WebView
				injectedJavaScript={Constants.javascript.injection}
				mixedContentMode={'compatibility'}
				javaScriptEnabled={true}
				// bounces={false}
				scrollEnabled={true}
				source={{ uri: `https://ikran.su/chat` }}
				style={styles.pdf}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: '#fff',
	},

	pdf: {
		flex: 1,
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
		marginBottom: 30,
	}
});

export default OnlineChatScreen;
