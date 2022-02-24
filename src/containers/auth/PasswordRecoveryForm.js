import React, { useState } from 'react';
import {
	StatusBar,
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	TextInput,
} from 'react-native';

import * as RootNavigation from '../../helpers/RootNavigation';

import { Button } from '../../components';

import { config } from '../../config'

function PasswordRecoveryForm() {

	const { API_URL } = config

	const [name, setName] = useState('') // ФИО
	const [phone, setPhone] = useState('') // Телефон

	async function handlerPasswordRecovery(name, phone) {
		const message = {
			name: name,
			phone: phone,
		};

		await fetch(API_URL + '/passwordRecoverRequest', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Accept-encoding': 'gzip, deflate',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(message),
		}).then((response) => {
			// const data = JSON.stringify(response.json())
			RootNavigation.navigate('ThankyouScreen');
		})
	}

	return (
		<SafeAreaView>
			<View style={{ marginBottom: 20 }}>
				<TextInput
					style={styles.input}
					value={name}
					onChangeText={text => setName(text)}
					placeholder="ФИО"
					placeholderTextColor="#6e6e6e"
				/>

				<TextInput
					style={styles.input}
					value={phone}
					onChangeText={text => setPhone(text)}
					placeholder="Номер телефона"
					placeholderTextColor="#6e6e6e"
					keyboardType="numeric"
				/>
			</View>

			<View style={{ display: 'flex', alignItems: 'center' }}>
				<Button
					backgroundColor='#DF5649'
					color="#fff"
					onPress={() => { handlerPasswordRecovery(name, phone) }}
				>отправить</Button>
			</View>
		</SafeAreaView>

	);
}

const styles = StyleSheet.create({
	input: {
		color: '#000',
		backgroundColor: '#f0f0f0',
		borderRadius: 4,
		borderBottomColor: '#54C2EF',
		borderBottomWidth: 2,
		marginBottom: 20,
		paddingVertical: 20,
		paddingHorizontal: 15

	},
});

export default PasswordRecoveryForm;