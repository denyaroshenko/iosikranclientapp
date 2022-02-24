import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Modal,
	SectionList,
	SafeAreaView,
	TouchableOpacity
} from 'react-native';

import { DocumentListItem } from '../components';

import FilterIcon from '../assets/Icons/FilterIcon';

import AppMetrica from 'react-native-appmetrica';
AppMetrica.activate({
	apiKey: '091bb5a6-12b1-42f9-923d-429852d99030',
	sessionTimeout: 120,
	firstActivationAsUpdate: true,
	installedAppCollecting: true,
});
AppMetrica.reportEvent('Открыта страница: Документы');

const DocumentsScreen = ({ route, navigation }) => {

	const { id, name, documents } = route.params.item;

	const [mainSections, setMainSections] = useState([]);
	const [filteredSections, setFilteredSections] = useState([])
	const [modalVisible, setModalVisible] = useState(false)

	useEffect(() => {
		getSections()
	}, []);

	// Получаем массив статусов документов 
	const getDocumentTypes = () => {
		var flags = [], output = [], l = documents.length, i;
		for (i = 0; i < l; i++) {
			if (flags[documents[i].typeDescription]) continue;
			flags[documents[i].typeDescription] = true;
			output.push(documents[i].typeDescription);
		}

		return output
	}

	// Фильтр группы документов
	const searchFilterFunction = (text) => {
		if (text) {
			if (text == 'Все типы') {
				getSections()
			} else {

				const newData = documents.filter(function (el) {
					return el.typeDescription == text;
				});

				console.log('[INFO] Фильтрованые данные', newData)

				setFilteredSections([
					{
						data: newData,
						title: text
					}
				]);
			}
		} else {
			// Inserted text is blank
			// Update FilteredDataSource with masterDataSource
			// setFilteredDataSource(masterDataSource);
			// setSearch(text);
		}
	};

	// Формируем главный список
	const getSections = async () => {
		if (documents) {

			const sectionTitles = getDocumentTypes() // Неоплаченные счета, Договор, Акт монтажа ...

			const mainSections = sectionTitles.map(function (title) {
				// Фильтруем документы со статусом TITLE
				let data = documents.filter(function (item) {
					return item.typeDescription == title;
				})

				return {
					title: title,
					data: data
				};
			});

			setFilteredSections(mainSections)
		}
	}

	navigation.setOptions({
		'title': 'Документы',
		headerRight: () => (
			<TouchableOpacity onPress={() => setModalVisible(true)}>
				<FilterIcon style={{ marginRight: 20 }} />
			</TouchableOpacity>
		)
	});

	const types = getDocumentTypes()

	return (
		<SafeAreaView style={styles.container}>
			<SectionList
				sections={filteredSections}
				keyExtractor={(item, index) => item.id}
				renderItem={({ item }) =>
					<DocumentListItem
						navigation={navigation}
						item={item}
					/>
				}
				renderSectionHeader={({ section: { title } }) => (
					<Text style={styles.sectionHeader}>{title}</Text>
				)}
			/>

			<Modal
				animationType="fade"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert("Modal has been closed.");
					setModalVisible(!modalVisible);
				}}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text style={styles.modalTitle}>Выберите тип документа</Text>
						<View style={styles.modalNavList}>

							<TouchableOpacity onPress={() => { setModalVisible(!modalVisible); searchFilterFunction('Все типы') }}>
								<Text style={styles.modalNavItem}>Все типы</Text>
							</TouchableOpacity>

							{types.map((title, key) => {
								return (
									<TouchableOpacity
										onPress={() => { setModalVisible(!modalVisible); searchFilterFunction(title) }}
										key={key}
									>
										<Text style={styles.modalNavItem}>{title}</Text>
									</TouchableOpacity>
								)
							})}
						</View>

						<View style={styles.modalFooter}>
							<TouchableOpacity
								onPress={() => setModalVisible(!modalVisible)}
							>
								<Text style={styles.modalButtonClose}>Отмена</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>

		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		// marginHorizontal: 16
	},

	rowStyle: {
		flex: 1,
	},

	sectionHeader: {
		color: '#000',
		fontWeight: '300',
		fontSize: 20,
		lineHeight: 23,
		display: 'flex',
		alignContent: 'center',
		paddingLeft: 15,
		marginTop: 15,
		marginBottom: 10,
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

		paddingTop: 25,
		paddingHorizontal: 25,
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

	modalButtonClose: {
		display: 'flex',
		color: '#2C98F0',
		fontWeight: '500',
		fontSize: 14,
		lineHeight: 24,
		letterSpacing: 0.16,
		textTransform: 'uppercase',
		// backgroundColor: "#2196F3",
	},
});

export default DocumentsScreen;