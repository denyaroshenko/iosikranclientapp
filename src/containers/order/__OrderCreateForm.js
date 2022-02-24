import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
	StyleSheet,
	Alert,
	View,
	TextInput,
	Text
} from 'react-native';

import { clearLoginErrorMessage, login } from '../../store/actions/auth';

import * as RootNavigation from '../../helpers/RootNavigation';

import { Button } from '../../components';

import DotsVerticalIcon from '../../assets/Icons/DotsVerticalIcon';

import store from '../../store/store'
const appState = store.getState()
const userID = appState.authToken // Временно в токене храним ID

import { config } from '../../config';

import RNPickerSelect from 'react-native-picker-select';

const { API_URL } = config

class OrderCreateForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			appState: appState,
			username: '',
			password: '',
			objects: [{
				label: 'Загрузка...',
				value: 'loading'
			}],
			selectedObject: null,
			cranes: [],
		};
	}

	componentDidMount() {

		// Получаем объекты
		this.fetchObjects()
	}

	componentDidUpdate(prevProps) {
		const { errorMessage } = this.props;
		if (this.props.someProp !== prevProps.someProp) {
			Alert.alert(
				nextProps.errorMessage,
				'',
				[{ text: 'OK', onPress: () => this.props.clearLoginErrorMessage() }],
			);
		}
	}

	// Получаем список объектов
	fetchObjects = () => {
		const userID = appState.authToken // Временно в токене храним ID
		console.log(API_URL + '/objects/holding?id=' + userID);

		// Получаем объекты
		fetch(API_URL + '/objects/holding?id=' + userID)
			.then((response) => response.json())
			.then((json) => {
				this.setState({ objects: json.data })

				console.info(this.state.objects)

				// Нормализуем объекты для пикера
				const objectsPicker = []
				this.state.objects.map((item, i) => {
					objectsPicker.push({
						label: item.name,
						value: item.id
					})
				})

				this.setState({ objects: objectsPicker })
			})
			.catch((error) => {
				console.error(error)
				Alert.alert(
					'Ошибка',
					error,
				);
			})
			.finally(() => this.setState({ isLoading: false }));
	}

	// Получаем список кранов
	fetchCranes = (objectID) => {
		fetch(API_URL + '/object_cranes/holding?id=' + userID + '&object_id=' + objectID)
			.then((response) => response.json())
			.then((json) => {
				const cranes = json.data
				this.setState({ cranes: cranes })

				// Нормализуем краны для пикера
				let cranesPicker = []
				this.state.cranes.map((item, i) => {
					cranesPicker.push({
						label: item.name,
						value: item.id
					})
				})

				this.setState({ cranes: cranesPicker })
			})
			.catch((error) => console.error(error))
			.finally(() => this.setState({ isLoading: false }));
	}

	// Обработчик выбора объекта
	handleObjectPickerSelect = async (objectID) => {
		this.setState({ selectedObject: objectID })
		this.setState({ cranes: [] })
		this.setState({ selectedCrane: null })

		this.fetchCranes(objectID)

		// Нормализуем краны для пикера
		const cranesPicker = []
		this.state.cranes.map((item, i) => {
			cranesPicker.push({
				label: item.name,
				value: item.id
			})
		})

		this.setState({ cranes: cranesPicker })
	}

	// Обработчик выбора крана
	handleCranePickerSelect(craneID) {
		this.setState({ selectedCrane: craneID })
	}

	// Обработчик выбора причины
	handleReasonPickerSelect(text) {
		this.setState({ selectedReason: text })
	}

	// Отправка заявки
	handlerOrderSubmit = async () => {
		this.setState({ isLoading: true })

		const message = {
			id: userID,
			contact_id: this.state.appState.userData.contact_id,
			object_id: this.selectedObject,
			crane_id: this.selectedCrane,
			purpose: this.selectedReason,
			detail: this.orderDetails
		};

		await fetch(API_URL + '/request2/add', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Accept-encoding': 'gzip, deflate',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(message),
		}).then((response) => {
			const data = JSON.stringify(response.json())
			RootNavigation.navigate('OrderCreateSuccessScreen')
			setLoading(false)
		})
	}

	render() {
		const { isLoading, objects, cranes } = this.state;

		if (this.userID) {

			return (
				<View style={{ marginBottom: 20 }}>

					<Text>{{ userID }}</Text>

					<RNPickerSelect
						style={pickerStyle}
						placeholder={{ label: 'Выберите объект', value: null }}
						doneText="Выбрать"
						useNativeAndroidPickerStyle={false}
						Icon={() => {
							return <DotsVerticalIcon style={pickerStyle.icon} />;
						}}
						onValueChange={(value) => this.handleObjectPickerSelect(value)}
						items={this.state.objects}
					/>

					<RNPickerSelect
						// disabled={Boolean(selectedObject)}
						style={pickerStyle}
						placeholder={{
							label: 'Выберите кран',
							value: null,
						}}
						doneText="Выбрать"
						useNativeAndroidPickerStyle={false}
						Icon={() => {
							return <DotsVerticalIcon style={pickerStyle.icon} />;
						}}
						onValueChange={(value) => this.handleCranePickerSelect(value)}
						items={this.state.cranes}
					/>

					<RNPickerSelect
						// disabled={Boolean(selectedObject)}
						style={pickerStyle}
						placeholder={{
							label: 'Выберите причину вызова',
							value: null,
						}}
						doneText="Выбрать"
						useNativeAndroidPickerStyle={false}
						Icon={() => {
							return <DotsVerticalIcon style={pickerStyle.icon} />;
						}}
						onValueChange={(value) => this.handleReasonPickerSelect(value)}
						items={[
							{
								label: 'Техподдержка',
								value: 'Техподдержка'
							},
							{
								label: 'Крановщики',
								value: 'Крановщики'
							},
							{
								label: 'Прочее',
								value: 'Прочее'
							}
						]}
					/>

					<TextInput
						style={styles.textarea}
						multiline={true}
						numberOfLines={4}
						onChangeText={text => this.setState({ orderDetails: text })}
						placeholder="Детали вызова"
						placeholderTextColor="#6e6e6e"
					/>

					<View style={styles.buttonArea}>
						<Button
							backgroundColor='#FED400'
							color="#000"
							onPress={() => { this.handlerOrderSubmit() }}
						>отправить</Button>
					</View>
				</View>
			)

		} else {
			return (
				<Text>Hello this is Test Execution </Text>
			)
		}
	}
}

OrderCreateForm.propTypes = {
	// errorMessage: PropTypes.string.isRequired,
	// loggingIn: PropTypes.bool.isRequired,
	login: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
	return {
		// loggingIn: state.auth.loggingIn,
		// errorMessage: state.auth.errorMessage,
	};
}

export default connect(mapStateToProps, {
	login,
	clearLoginErrorMessage,
})(OrderCreateForm);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// marginTop: StatusBar.currentHeight || 0,
		// marginHorizontal: 15,
	},

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

	textarea: {
		color: '#000',
		height: 100,
		textAlignVertical: 'top',
		backgroundColor: '#f0f0f0',
		borderRadius: 6,
		borderBottomColor: '#54C2EF',
		borderBottomWidth: 2,
		marginTop: 5,
		marginBottom: 20,
		marginHorizontal: 20,
		paddingTop: 15,
		paddingVertical: 30,
		paddingHorizontal: 15
	},

	buttonArea: {
		display: 'flex',
		alignItems: 'center',
		padding: 20
	},
});

const pickerStyle = {
	inputIOS: {
		height: 60,
		position: 'relative',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		paddingVertical: 20,
		marginHorizontal: 20,
		marginBottom: 10,
		backgroundColor: '#fff',
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.1,
		shadowRadius: 4.65,
		elevation: 8,

		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
	},

	inputAndroid: {
		color: '#000',
		height: 60,
		// position: 'relative',
		// display: 'flex',
		// flexDirection: 'row',
		// alignItems: 'center',
		// justifyContent: 'space-between',
		paddingHorizontal: 20,
		paddingVertical: 20,
		marginHorizontal: 20,
		marginBottom: 15,
		backgroundColor: '#fff',
		shadowColor: "#000",
		borderRadius: 10,
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.1,
		shadowRadius: 4,

		elevation: 8,
	},

	placeholderColor: '#000',

	underline: { borderTopWidth: 0 },

	icon: {
		position: 'absolute',
		top: 20,
		right: 37,

		// backgroundColor: 'red',
	},
};
