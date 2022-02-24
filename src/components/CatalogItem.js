import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	Dimensions,
	TouchableOpacity
} from 'react-native';
import styled from 'styled-components/native';

import { Button } from '../components';

const win = Dimensions.get('window');
const ratio = win.width / 541; // 541 is actual image width

const CatalogItem = ({ navigation, item }) => {
	const { name, image, hit, height, length, weight, weight_end } = item;

	return (
		<View style={styles.item}>
			<TouchableOpacity style={styles.link} onPress={() => navigation.navigate('CraneDetailScreen', { item: item })}>
				<View style={{ position: 'relative' }}>
					<Image
						style={styles.image}
						source={{
							uri: image
						}}
					/>
					{hit ? <View style={styles.hit}><Text style={styles.hitText}>ХИТ</Text></View> : null}
				</View>

				<Text style={styles.title}>{name}</Text>

				<Props>
					<Row>
						<Label>Высота подъема:</Label>
						<Value>{height} м</Value>
					</Row>
					<Row>
						<Label>Длина стрелы</Label>
						<Value>{length} м</Value>
					</Row>
					<Row>
						<Label>Грузоподъемность:</Label>
						<Value>{weight} т.</Value>
					</Row>
					<Row>
						<Label>Грузоподъемность на конце стрелы:</Label>
						<Value>{weight_end} т.</Value>
					</Row>
				</Props>
			</TouchableOpacity>

			<Button onPress={() => navigation.navigate('CommercialOfferScreen')}>заказать предложение</Button>
		</View>
	);
}

CatalogItem.defaultProps = {
	key: 'Untitled',
};

const styles = StyleSheet.create({
	item: {
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#f3f3f3',
		paddingVertical: 20,
		marginHorizontal: 15,

		// borderColor: 'green',
		// borderWidth: 1,
	},

	link: {
		display: 'flex',
		width: '100%',

		// borderColor: 'red',
		// borderWidth: 1,
	},

	image: {
		position: 'relative',
		// width: win.width - 30,
		// height: 362 * ratio, //362 is actual height of image
		width: '100%',
		height: 250,
		marginBottom: 10,

		// borderColor: 'red',
		// borderWidth: 1,
	},

	hit: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: 50,
		height: 50,
		backgroundColor: '#DF5649',
		borderRadius: 100,
		position: 'absolute',
		bottom: 20,
		right: 10,
		transform: [
			{ rotate: "-30deg" },
		]
	},

	hitText: {
		fontSize: 16,
		color: '#fff',
		fontWeight: '700',
	},

	title: {
		width: '100%',
		fontWeight: '500',
		fontSize: 18,
		display: 'flex',
		color: '#000000',
		marginBottom: 10,

		// borderColor: 'red',
		// borderWidth: 1,
	},
});

const GroupItem = styled.View`
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #f3f3f3;
  padding: 20px 15px;
`;

const Props = styled.View`
  width: 100%;
  margin-bottom: 15px;
`

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
`

const Label = styled.Text`
  font-weight: 500;
  font-size: 14px;
  display: flex;
  align-items: center;
  color: #000000;
`

const Value = styled.Text`
  font-weight: normal;
  font-size: 14px;
  display: flex;
  align-items: center;
  text-align: right;
  color: #000000;
`

export default CatalogItem;