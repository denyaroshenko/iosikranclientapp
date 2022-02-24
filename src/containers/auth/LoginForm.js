import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, ActivityIndicator, Alert, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { clearLoginErrorMessage, login } from '../../store/actions/auth';

import * as RootNavigation from '../../helpers/RootNavigation';

import { Button } from '../../components';

class LoginForm extends Component {
	state = {
		username: '',
		password: '',
	};

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

	signInAsync = async () => {
		const { password, username } = this.state;
		await this.props.login(username, password);
	};

	render() {
		const { username, password } = this.state;
		const isEnabledSubmit = (username.length >= 4 && password.length >= 5);

		return (
			<View style={{ marginBottom: 20 }}>
				<TextInput
					style={styles.input}
					value={username}
					onChangeText={text => this.setState({ username: text })}
					placeholder="Логин"
					placeholderTextColor="#6e6e6e"
				/>

				<TextInput
					secureTextEntry={true}
					style={styles.input}
					onChangeText={pass => this.setState({ password: pass })}
					placeholder="Пароль"
					placeholderTextColor="#6e6e6e"
				/>

				<View style={{ display: 'flex', alignItems: 'center' }}>
					<Button onPress={this.signInAsync} backgroundColor='#DF5649' color="#fff">войти</Button>

					<TouchableOpacity
						onPress={() => {
							RootNavigation.navigate('PasswordRecoveryScreen')
						}}>
						<Text style={styles.link}>не получается войти?</Text>
					</TouchableOpacity>
				</View>
			</View>

			// <React.Fragment>
			//   <Input
			//     autoCapitalize="none"
			//     placeholder="Username"
			//     onChangeText={usr => this.setState({ username: usr })}
			//     value={username}
			//   />
			//   <Input
			//     placeholder="Password"
			//     onChangeText={pass => this.setState({ password: pass })}
			//     secureTextEntry
			//   />
			//   <Button
			//     disabled={!isEnabledSubmit}
			//     icon={loggingIn ? (
			//       <ActivityIndicator size="small" color="#ffffff" />
			//     ) : null}
			//     onPress={this.signInAsync}
			//     title="Login"
			//   />
			// </React.Fragment>
		);
	}
}

LoginForm.propTypes = {
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
})(LoginForm);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// marginTop: StatusBar.currentHeight || 0,
		// marginHorizontal: 15,
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

	newsGridView: {
		marginTop: 10
	},
	
	gridView: {
		// marginTop: 10,
	},
	homeNavItem: {
		width: 75
	},
	navGrid: {
		marginBottom: 40
	},
	homeNavItemIcon: {
		// position: 'relative',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: 75,
		height: 75,
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
		marginBottom: 6,
	},
	homeNavItemIconImage: {
		width: 35,
		height: 35,
		resizeMode: 'contain'
	},
	homeNavItemTitle: {
		fontSize: 9,
		fontWeight: '400',
		lineHeight: 10,
		textAlign: 'center'
	},
	homeNavItemBadge: {
		position: 'absolute',
		bottom: 10,
		width: 18,
		height: 18,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#DF5649',
		borderRadius: 9,
		overflow: 'hidden',
		borderColor: '#fff',
		borderWidth: 2,
	},
	homeNavItemBadgeNumber: {
		color: '#fff',
		fontSize: 8,
		fontWeight: '400',
	},
	homeNewsItem: {
		position: 'relative',
		height: 110,
		maxWidth: '48%',
		backgroundColor: '#FFFFFF',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		// shadowColor: '#000000',
		// shadowOffset: {
		//   width: 2,
		//   height: 4,
		// },
		// shadowOpacity: 0.1,
		// shadowRadius: 3.84,
		// elevation: 8,
		padding: 15,

		flex: 1,
		flexDirection: 'column',
		margin: 1
	},
	homeNewsItemCaption: {
		color: '#54C2EF',
		fontSize: 12,
		lineHeight: 14,
		marginBottom: 10
	},
	homeNewsItemTitle: {
		width: '100%',
		color: '#747474',
		fontSize: 12,
		lineHeight: 16,
		fontWeight: '300'
	},
	companyCardWrapper: {
		position: 'relative',
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
	companyName: {
		color: '#747474',
		fontSize: 16,
		fontWeight: '300',
		lineHeight: 22,
		marginBottom: 15,
		textAlign: 'center'
	},
	priceTitle: {
		color: '#747474',
		fontSize: 12,
		fontWeight: '300',
		lineHeight: 14
	},
	priceValue: {
		color: '#DF5649',
		fontSize: 36,
		fontWeight: '500',
		lineHeight: 42,
		marginRight: 10
	},
	priceDate: {
		color: '#747474',
		fontSize: 9,
		lineHeight: 11,
		fontWeight: '300'
	},
	specialOffer: {
		flex: 1,
		backgroundColor: '#DF5649',
		padding: 20,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		marginBottom: 20
	},
	specialOfferCaption: {
		color: '#ffffff',
		marginBottom: 10
	},
	specialOfferText: {
		color: '#ffffff'
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
	labelInput: {
		color: '#673AB7',
	},
	formInput: {
		borderBottomWidth: 1.5,
		marginLeft: 20,
		borderColor: '#333',
	},

	link: {
		marginTop: 25,
		fontWeight: '300',
		fontSize: 12,
		lineHeight: 14,
		textAlign: 'center',
		textDecorationLine: 'underline',
		color: '#747474'
	},

	registerLink: {
		fontWeight: '300',
		fontSize: 12,
		lineHeight: 14,
		textAlign: 'center',
		textDecorationLine: 'underline',
		color: '#FC4A1A'
	},
	spinnerContainer: {
		flex: 1,
		alignItems: 'center',
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
