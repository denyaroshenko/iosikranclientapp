import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Modal, Pressable } from 'react-native';

import CheckSuccessIcon from '../assets/Icons/CheckSuccessIcon';
import DangerIcon from '../assets/Icons/DangerIcon';

const DocumentListItem = ({ navigation, item }) => {

	const [modalVisible, setModalVisible] = useState(false);

	const { icon, name, typeDescription, url } = item;

	function Icon(icon) {
		if (typeDescription !== 'Неоплаченные счета') {
			return <CheckSuccessIcon style={styles.icon} />;
		} else {
			return <DangerIcon style={styles.icon} />;
		}
	}

	return (
		<TouchableOpacity
			style={styles.item}
			onPress={() => navigation.navigate('PDFScreen', { pdf: item })}
		>
			<Icon icon={icon} />
			<View style={styles.details}>
				<Text style={styles.name}>{name}</Text>
			</View>
		</TouchableOpacity >
	);
}

const styles = StyleSheet.create({
	item: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		paddingVertical: 18,
		marginHorizontal: 15,
		marginTop: 5,
		marginBottom: 10,
		backgroundColor: '#fff',
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 2,
			height: 4,
		},
		shadowOpacity: 0.1,
		shadowRadius: 3.84,
		elevation: 8,
	},

	icon: {
		marginRight: 20
	},
	details: {
		flex: 1,
		flexGrow: 1
	},
	name: {
		fontSize: 15,
		lineHeight: 18,
		display: 'flex',
		alignItems: 'center',
		color: '#000',
		marginBottom: 5
	},
	info: {
		color: '#000',
		fontSize: 9,
		fontWeight: '300',
		lineHeight: 11,
		display: 'flex',
		alignItems: 'center',
		marginVertical: 1
	},
	button: {
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexGrow: 0,
		paddingHorizontal: 20,
		// backgroundColor: 'green'
	},

	// Позиционирование модальног окна
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: 'rgba(0,0,0,0.5)'
	},

	// Стили модального окна
	modalView: {
		width: '80%',
		backgroundColor: "#FAFAFA",
		borderRadius: 2,

		paddingTop: 35,
		paddingHorizontal: 35,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},

	modalTitle: {
		fontWeight: '500',
		fontSize: 20,
		lineHeight: 24,
		color: 'rgba(0, 0, 0, 0.87)',
		marginBottom: 20
	},

	modalFooter: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		paddingVertical: 20
	},

	modalNavList: {
		marginBottom: 20
	},

	modalNavItem: {
		fontSize: 16,
		lineHeight: 40,
		color: 'rgba(117, 117, 117, 0.87)',
	},

	buttonOpen: {
		backgroundColor: "#F194FF",
	},
	buttonClose: {
		display: 'flex',
		color: '#2C98F0',
		fontWeight: '500',
		fontSize: 14,
		lineHeight: 24,
		letterSpacing: 0.16,
		textTransform: 'uppercase',
		// backgroundColor: "#2196F3",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center"
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center"
	}
});

export default DocumentListItem;