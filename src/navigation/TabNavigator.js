import React from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StatusBar, StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomeStackNavigator } from "./HomeStackNavigator";
import { ObjectsStackNavigator } from "./ObjectsStackNavigator";
import { HelpStackNavigator } from "./HelpStackNavigator";
import { CatalogStackNavigator } from "./CatalogStackNavigator";
import { SettingsStackNavigator } from "./SettingsStackNavigator";

// Иконки
import HomeIcon from '../assets/Icons/Tabbar/HomeIcon';
import ObjectsIcon from '../assets/Icons/Tabbar/ObjectsIcon';
import CatalogIcon from '../assets/Icons/Tabbar/CatalogIcon';
import SettingsIcon from '../assets/Icons/Tabbar/SettingsIcon';
import HelpIcon from '../assets/Icons/Tabbar/HelpIcon';

import { useRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

async function checkStoragePincode() {
	let code = ''
	await AsyncStorage.getItem('pincode').then(number => {
		code = number

	}).catch(e => console.warn(e))

	return code
}

const BottomTabNavigator = ({ navigation }) => {

	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
			title: '', // устанавливаем собственный заголовок экрана,
			headerStyle: {
				backgroundColor: '#FED000',
				// backgroundColor: 'red',
				height: StatusBar.currentHeight,
				elevation: 0,
				shadowOpacity: 0,
				borderBottomWidth: 0,
			},
		});
	}, [navigation, '']);

	return (
		<Tab.Navigator
			initialRouteName="Главная"
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					if (route.name === 'Главная') {
						return <HomeIcon style={styles.tabIcon} focused={focused} />;
					} else if (route.name === 'Объекты') {
						return <ObjectsIcon style={styles.tabIcon} focused={focused} />;
					} else if (route.name === 'HELP') {
						return <HelpIcon focused={focused} />;
					} else if (route.name === 'Каталог') {
						return <CatalogIcon style={styles.tabIcon} focused={focused} />;
					} else if (route.name === 'Настройки') {
						return <SettingsIcon style={styles.tabIcon} focused={focused} />;
					}
					return;
				},

				headerShown: false, // Скрываем шапку на iOS
				tabBarVisible: true,

				tabBarLabel: ({ focused }) => {
					if (route.name === "HELP") return <Text />;
					else
						return (
							<Text
								style={focused ? styles.tabLabelActive : styles.tabLabel}
							>
								{route.name}
							</Text>
						);
				}

			})}

			tabBarOptions={{
				style: {
					height: 50,
					borderTopWidth: 0,
					backgroundColor: '#313135',
					alignItems: 'center'
				},
				activeTintColor: '#BDBDBD',
				inactiveTintColor: '#747474',

				activeBackgroundColor: '#313135',
				inactiveBackgroundColor: '#313135',
				// safeAreaInset: { bottom: 'never', top: 'never' }  // <-- this is the solution
			}}>

			<Tab.Screen name="Главная" component={HomeStackNavigator} />
			<Tab.Screen name="Объекты" component={ObjectsStackNavigator} />
			<Tab.Screen name="HELP" component={HelpStackNavigator} />
			<Tab.Screen name="Каталог" component={CatalogStackNavigator} />
			<Tab.Screen name="Настройки" component={SettingsStackNavigator} />
		</Tab.Navigator>
	);
};

const styles = StyleSheet.create({
	tabLabel: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center',
		fontSize: 8,
		color: '#747474',
		marginBottom: 5
	},

	tabLabelActive: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center',
		fontSize: 8,
		color: '#BDBDBD',
		marginBottom: 5
	},

	tabIcon: {
		marginTop: 5,
		// borderColor: 'red',
		// borderWidth: 1
	},
});

export default BottomTabNavigator;