import React, { useState } from 'react';
import {
	StyleSheet,
	Dimensions,
	View,
	Text,
	Share,
	TouchableOpacity,
	Platform
} from 'react-native';

import { WebView } from 'react-native-webview';

import PDFView from 'react-native-view-pdf';

import ShareIcon from '../assets/Icons/ShareIcon';

import Spinner from 'react-native-loading-spinner-overlay';

import AppMetrica from 'react-native-appmetrica';
AppMetrica.activate({
	apiKey: '091bb5a6-12b1-42f9-923d-429852d99030',
	sessionTimeout: 120,
	firstActivationAsUpdate: true,
	installedAppCollecting: true,
});
AppMetrica.reportEvent('Открыта страница: Документ PDF');

const resources = {
	file: Platform.OS === 'ios' ? 'test-pdf.pdf' : '/sdcard/Download/test-pdf.pdf',
	// url: 'https://www.ets.org/Media/Tests/TOEFL/pdf/SampleQuestions.pdf',
	url: 'https://193.107.237.207/files/DOG_УТ0048278.pdf',
	base64: 'JVBERi0xLjMKJcfs...',
};

const PDFScreen = ({ navigation, route }) => {

	const resourceType = 'url';

	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}

	React.useLayoutEffect(() => {
		navigation.setOptions({
			'title': 'PDF-файл', // устанавливаем собственный заголовок экрана
			headerRight: () => (
				<TouchableOpacity onPress={onShare}>
					<ShareIcon style={{ marginRight: 20 }} />
				</TouchableOpacity>
			)
		});
	}, [navigation, 'PDF-файл']);

	const [loading, setLoading] = useState(false)

	const { id, name, url } = route.params.pdf

	const onShare = async () => {
		try {
			const result = await Share.share({
				title: name,
				message: name + ' ' + url,
				url: url
			});
			if (result.action === Share.sharedAction) {
				if (result.activityType) {
					// shared with activity type of result.activityType
				} else {
					// shared
				}
			} else if (result.action === Share.dismissedAction) {
				// dismissed
			}
		} catch (error) {
			alert(error.message);
		}
	};

	// const source = { uri: 'http://193.107.237.207/files/SCH_20_УТБК0000437.pdf' }; // Test
	// const source = { uri: url };

	// const source = { uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf', cache: true };
	//const source = require('./test.pdf');  // ios only
	// const source = { uri: 'bundle-assets://test.pdf', cache: true };

	//const source = {uri:'file:///sdcard/test.pdf'};
	//const source = {uri:"data:application/pdf;base64,JVBERi0xLjcKJc..."};

	const PdfReader = ({ url: uri }) => <WebView style={styles.pdf} source={{ uri }} />

	return (
		<View style={styles.container}>

			<Spinner visible={loading} />

			{/* <Text>{url}</Text> */}

			{Platform.OS === 'ios' ?
				<WebView
					bounces={false}
					scrollEnabled={true}
					// source={source}
					source={{ uri: url }}
					// onLoadStart={setLoading(true)}
					// onLoadEnd={setLoading(false)}
					style={styles.pdf}
				/>
				: (
					<PDFView
						fadeInDuration={250.0}
						style={styles.pdf}
						resource={url}
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
		paddingTop: 5,
		justifyContent: 'flex-start',
		alignItems: 'center',
		// backgroundColor: 'red',
	},

	pdf: {
		flex: 1,
		width: Dimensions.get('window').width - 10,
		height: Dimensions.get('window').height,
		// backgroundColor: 'green',
	}
});

export default PDFScreen;
