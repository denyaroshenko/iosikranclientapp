import React, { useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Modal,
} from 'react-native';

import CheckIcon from '../assets/Icons/CheckIcon';
import DotsVerticalIcon from '../assets/Icons/DotsVerticalIcon';

const CraneListItem = ({ navigation, item }) => {
	const [modalVisible, setModalVisible] = useState(false);

	let {
		id,
		name,
		date_start,
		date_end,
		videos, // видео
		schedules // график крановщиков
	} = item;

	if (date_end == '-') {
		date_end = ''
	}

	return (
		<TouchableOpacity style={styles.item} onPress={() => setModalVisible(true)}>
			<CheckIcon style={styles.icon} />
			<View style={styles.details}>
				{/* <Text style={styles.name}>{id}</Text> */}
				<Text style={styles.name}>{name}</Text>
				<Text style={styles.info}>Монтаж - {date_start}</Text>
				<Text style={styles.info}>Демонтаж - {date_end}</Text>
				<Text style={styles.info}>Количество видео - {videos.length}</Text>
			</View>

			<Modal
				animationType="fade"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text style={styles.modalTitle}>Выберите ниже</Text>
						<View style={styles.modalNavList}>
							<TouchableOpacity onPress={() => { setModalVisible(!modalVisible); navigation.navigate('DocumentsScreen', { item: item }) }}>
								<Text style={styles.modalNavItem}>Документы</Text>
							</TouchableOpacity>

							{videos.length ?
								<TouchableOpacity onPress={() => { setModalVisible(!modalVisible); navigation.navigate('VideoStreamScreen', { videos: videos }) }}>
									<Text style={styles.modalNavItem}>Видео</Text>
								</TouchableOpacity>
								: <></>}

							<TouchableOpacity onPress={() => { setModalVisible(!modalVisible); navigation.navigate('CraneOperatorScheduleScreen', { item: item, schedules: schedules }) }}>
								<Text style={styles.modalNavItem}>График крановщиков</Text>
							</TouchableOpacity>
						</View>

						<View style={styles.modalFooter}>
							<TouchableOpacity
								onPress={() => setModalVisible(!modalVisible)}
							>
								<Text style={styles.buttonClose}>Отмена</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>

			<View style={styles.button}>
				<DotsVerticalIcon />
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	item: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: '100%',
		paddingLeft: 20,
		paddingVertical: 18,
		backgroundColor: '#fff',
		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.1,
		shadowRadius: 4.65,

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

export default CraneListItem;