import React, { useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TextInput,
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

import * as RootNavigation from '../../helpers/RootNavigation';

import { config } from '../../config';

import { Button } from '../../components';

import CheckSuccessIcon from '../../assets/Icons/CheckSuccessIcon';

const OrderStatusEditForm = ({ route }) => {

	const { id } = route.params.item

	const radioBtnsData = ['Новая', 'В работе', 'Выполнено', 'Отклонено']
	const [status, setStatus] = useState(route.params.item.status)
	const [details, setDetails] = useState('')

	const [loading, setLoading] = useState(false)

	const { API_URL } = config

	async function handlerOrderStatusEditSubmit() {
		setLoading(true)

		const message = {
			order_id: id,
			status: status,
			note: details,
			offset: null,
		};

		// Сериализуем параметы для GET запроса
		let parameters = "";
		for (var key in message) {
			if (parameters != "") {
				parameters += "&";
			}
			parameters += key + "=" + encodeURIComponent(message[key]);
		}

		// console.log(message)

		await fetch(`${API_URL}/order/update?${parameters}`, {
			method: 'GET',
		})
			.then((response) => {
				const data = JSON.stringify(response.json())
				RootNavigation.navigate('OrderEditSuccessScreen')
			})
			.finally(() => setLoading(false))
	}

	return (
		<View>
			{/* Дебаг формы */}
			{/* <View>
				<Text>DEBUG</Text>
				<Text>Order ID: {id}</Text>
				<Text>Status: {status}</Text>
				<Text>Details: {details}</Text>
			</View> */}

			<Spinner visible={loading} />

			<View style={styles.radioList}>
				{radioBtnsData.map((data, key) => {
					// Статусы: 1 - новая; 2 - в работе; 4 - выполнена; 8 - отклонена; 16 - отклонена клиентом
					const statusID = Math.pow(2, key)
					return (
						<View key={statusID}>
							{status == statusID ?
								<TouchableOpacity style={styles.radio}>
									<Text style={styles.radioLabel}>{data}</Text>
									<CheckSuccessIcon />
								</TouchableOpacity>
								:
								<TouchableOpacity onPress={() => { setStatus(statusID) }} style={styles.radio}>
									<Text style={styles.radioLabel}>{data}</Text>
								</TouchableOpacity>
							}
							{radioBtnsData.length !== key + 1 ? <View style={styles.radioDivider} /> : null}
						</View>
					)
				})}
			</View>

			<TextInput
				style={styles.textarea}
				multiline={true}
				numberOfLines={4}
				onChangeText={text => setDetails(text)}
				placeholder="Комментарий"
				placeholderTextColor="#6e6e6e"
			/>

			<View style={styles.buttonArea}>
				<Button
					backgroundColor='#FED400'
					color="#000"
					onPress={() => { handlerOrderStatusEditSubmit() }}
				>Изменить</Button>
			</View>

		</View>
	)
}

const styles = StyleSheet.create({
	radio: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 15,
		paddingHorizontal: 20,
	},

	radioDivider: {
		display: 'flex',
		backgroundColor: '#000',
		height: 1,
		backgroundColor: '#ededed'
	},

	radioList: {
		marginHorizontal: 20,
		marginBottom: 15,
		// paddingVertical: 10,
		backgroundColor: '#fff',
		borderRadius: 6,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.5,
		shadowRadius: 5,
		elevation: 5,
	},

	radioLabel: {
		fontWeight: '400',
		fontSize: 16,
		lineHeight: 24,
		color: 'rgba(117, 117, 117, 0.87)'
	},

	textarea: {
		color: '#000',
		fontSize: 18,
		textAlignVertical: 'top',
		paddingTop: 15,
		backgroundColor: 'rgba(0, 0, 0, 0.06)',
		borderRadius: 6,
		borderBottomColor: '#54C2EF',
		borderBottomWidth: 2,
		marginTop: 5,
		marginBottom: 20,
		marginHorizontal: 20,
		paddingHorizontal: 15,
	},

	buttonArea: {
		display: 'flex',
		alignItems: 'center',
		padding: 20
	},
});

export default OrderStatusEditForm;