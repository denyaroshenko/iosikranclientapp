import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	SafeAreaView,
	useWindowDimensions,
} from 'react-native';

import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

import LogoIcon from '../assets/Icons/AboutScreen/LogoIcon';
import MapIcon from '../assets/Icons/AboutScreen/MapIcon';

import { WebView } from 'react-native-webview';

import HTML from "react-native-render-html";

import store from '../store/store'
import { config } from '../config';

const { API_URL } = config

const AboutTextRoute = function () {

	const [isLoading, setLoading] = useState(true);
	let [data, setData] = useState([]) // Создаем переменную состояния для данных

	// получаем текущий state
	const state = store.getState();
	const userID = state.authToken

	// Получаем данные
	useEffect(() => {
		fetch(API_URL + '/home/holding?id=' + userID)
			.then((response) => response.json())
			.then((json) => setData(json.data.ikran_about))
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));
	}, []);

	return (
		<ScrollView>
			<SafeAreaView style={styles.container}>
				<HTML source={{ html: data }} />
			</SafeAreaView>
		</ScrollView>
	)
}

const AboutMapRoute = () => (
	<WebView style={styles.map} source={{ uri: 'https://193.107.237.207/static/maps.html' }} />
);

const AboutCompanyScreen = ({ navigation }) => {

	React.useLayoutEffect(() => {
		navigation.setOptions({
			'title': 'О компании',
		});
	}, [navigation, 'О компании']);

	const layout = useWindowDimensions();

	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState([
		{ key: 'text', title: 'Текст' },
		{ key: 'map', title: 'Карта' },
	]);

	const renderScene = SceneMap({
		text: AboutTextRoute,
		map: AboutMapRoute,
	});

	const renderLabel = (props) => {
		const { route } = props;
		const { focused } = props;

		if (route.key === 'text') {
			return <LogoIcon key={props.key} style={styles.tabbarItem} />
		} else {
			return <MapIcon key={props.key} style={styles.tabbarItem} />
		}
	}
	
	// Рендер кастомных табов
	const renderTabBar = (props) => {
		return <TabBar
			{...props}
			scrollEnabled={false}
			indicatorStyle={styles.indicator}
			style={styles.tabBar}
			renderLabel={props => renderLabel(props)}
			tabStyle={styles.tabItem}
		/>
	};

	return (
		<TabView
			navigationState={{ index, routes }}
			renderScene={renderScene}
			renderTabBar={renderTabBar}
			onIndexChange={setIndex}
			initialLayout={{ width: layout.width }}
			style={styles.screen}
		/>
	);
};

const styles = StyleSheet.create({
	screen: {
		backgroundColor: '#fff'
	},

	container: {
		flex: 1,
		marginHorizontal: 15,

		// borderColor: 'red',
		// borderWidth: 1
	},

	map: {
		// flex: 1,

		// borderWidth: 1,
		// borderColor: 'red',
	},

	tabBar: {
		backgroundColor: '#D5D5D5',
		elevation: 0,
	},

	tabItem: {
		height: 60,

		// borderWidth: 1,
		// borderColor: 'red',
	},

	tabIcon: {
		flex: 1,
		width: 40,
		height: 40,
		resizeMode: 'contain',
	},

	indicator: {
		height: 60,
		backgroundColor: '#AEAEAE',
	},

	tabbarItem: {
		display: 'flex',
		flexDirection: 'column',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	tabbarItemActive: {
		// alignItems: 'center',

		// borderWidth: 1,
		// borderColor: 'red',
	}
});

export default AboutCompanyScreen;