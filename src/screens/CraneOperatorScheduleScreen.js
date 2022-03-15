import React from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';

import { Button } from '../components';

import { CraneOperatorScheduleItem } from '../components';

// import AppMetrica from 'react-native-appmetrica';
// AppMetrica.activate({
//   apiKey: '091bb5a6-12b1-42f9-923d-429852d99030',
//   sessionTimeout: 120,
//   firstActivationAsUpdate: true,
//   installedAppCollecting: true,
// });
// AppMetrica.reportEvent('Открыта страница: Графики крановщиков');

const CraneOperatorScheduleScreen = ({ navigation, route }) => {

  const schedules = route.params.schedules

  const item = route.params.item
  const { id } = item

  React.useLayoutEffect(() => {
    navigation.setOptions({
      'title': 'График крановщиков',
    });
  }, [navigation, 'График крановщиков']);

  return (
    <View style={styles.screen}>

      {/* <Text>CRANE ID: {id}</Text> */}

      <SafeAreaView>
        <Text style={styles.worktime}>Время работы крана по договору составляет - <Text style={styles.worktimeRed}>12&nbsp;ч/сутки с 08:00 по 21:00</Text></Text>

        <FlatList
          data={schedules}
          style={styles.flatList}
          scrollEnabled={false}
          keyExtractor={item => item.id}
          renderItem={({ item }) =>
            <CraneOperatorScheduleItem
              navigation={navigation}
              item={item}
            />
          }
        />

      </SafeAreaView>

      <View style={styles.stickyArea}>
        <Text style={styles.alert}>Вы можете отправить нам заявку на изменение графика работы крановщиков. Заявка должна быть подана не менее, чем за 3 рабочих дня!</Text>

        <Button onPress={() => navigation.navigate('CraneOperatorScheduleEditScreen', { item: item })}>создать заявку</Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    marginHorizontal: 15
  },
  flatList: {
    // paddingHorizontal: 15,
    paddingBottom: 20,
  },
  rowStyle: {
    flex: 1,
  },
  worktime: {
    color: '#000000',
    fontWeight: '300',
    fontSize: 14,
    lineHeight: 18,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    maxWidth: '90%',
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 15
  },
  worktimeRed: {
    color: 'red',
    fontWeight: '600'
  },
  alert: {
    color: '#DF5649',
    borderWidth: 1,
    borderColor: '#DF5649',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 20,
    marginBottom: 20
  },
  stickyArea: {
    display: 'flex',
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: 0,
    alignItems: 'center',

    width: '100%',
    padding: 20
  }
});

export default CraneOperatorScheduleScreen;