import React, { useState } from 'react';
import {
	StyleSheet,
	Dimensions,
	View,
	Text,
	Platform
} from 'react-native';

import PDFView from 'react-native-view-pdf';
import { WebView } from 'react-native-webview';
import Spinner from 'react-native-loading-spinner-overlay';

const AboutAppScreen = ({ navigation }) => {

	React.useLayoutEffect(() => {
		navigation.setOptions({
			'title': 'О приложении',
		});
	}, [navigation, 'О приложении']);

	const [isLoading, setLoading] = useState(false)

	return (
		<View style={styles.container}>
			{/* <Text>{String(isLoading)}</Text> */}

			{Platform.OS === 'ios' ?
				<WebView
					bounces={false}
					scrollEnabled={true}
					// source={source}
					source={{ uri: 'https://193.107.237.207/files/1_pamyatka.pdf' }}
					// onLoadStart={setLoading(true)}
					// onLoadEnd={setLoading(false)}
					style={styles.pdf}
				/>
				: (
					<PDFView
						fadeInDuration={250.0}
						style={styles.pdf}
						resource={'https://193.107.237.207/files/1_pamyatka.pdf'}
						resourceType='url'
						onLoad={() => console.log(`PDF rendered from ${resourceType}`)}
						onError={(error) => console.error('Cannot render PDF', error)}
					/>
				)
			}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
	},

	pdf: {
		flex: 1,
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
	}
});

export default AboutAppScreen;