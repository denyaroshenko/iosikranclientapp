import axios from 'axios';
// import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {config} from '../config';

// получаем текущий state
import store from '../store/store';
import {LOGIN_SUCCESS} from '../store/actions/types';
import {removeLoggedIn} from '../store/actions/auth';
const state = store.getState();

const {API_URL} = config;

// import AppMetrica from 'react-native-appmetrica';

// // Starts the statistics collection process.
// AppMetrica.activate({
//   apiKey: '091bb5a6-12b1-42f9-923d-429852d99030',
//   sessionTimeout: 120,
//   firstActivationAsUpdate: true,
//   installedAppCollecting: true,
// });

// Получаем данные пользователя
const fetchCompanyInfo = id => {
  return new Promise(function (resolve, reject) {
    fetch(`${API_URL}/company_info?id=${id}`)
      .then(response => response.json())
      .then(json => {
        const contact = json.data;
        resolve(contact);
      })
      .catch(error => {
        console.error(error);
        reject();
      })
      .finally(() => setLoading(false));
  });
};

// Логинимся (РАБОТАЕТ)
function login(username, password) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}/auth?login=${username}&password=${password}`)
      .then(response => {
        const {success, data} = response.data;

        fetchCompanyInfo(data.id).then(companyInfo => {
          // const FIO = companyInfo.contacts[0].last_name + ' ' + companyInfo.contacts[0].first_name + ' ' + companyInfo.contacts[0].middle_name
          let profileId = '';

          const contact = companyInfo.contacts.find(
            contact =>
              contact.last_name || contact.first_name || contact.middle_name,
          );

          if (contact) {
            profileId = `${contact.last_name} ${contact.first_name} ${contact.middle_name} (${data.contact_id})`;
          } else if (companyInfo.company.company) {
            profileId = `${companyInfo.company.company} (${data.contact_id})`;
          }

          // Отправляем статистику в Метрику
          if (profileId) {
            // AppMetrica.setUserProfileID(profileId); // Устанавливаем профиль пользователя в репорт
            AsyncStorage.setItem('AppMetricaProfileID', profileId);
          }
          // AppMetrica.reportEvent('Successful authorization'); // Отправляем событие успешной авторизации
          console.log('[AppMetrica REPORT] Successful authorization', data);
        });

        AsyncStorage.setItem('authToken', data.id).then(() => {
          resolve(data);
        });

        AsyncStorage.setItem('userData', JSON.stringify(data)).then(() => {
          resolve(data);
        });

        // store.dispatch({ type: LOGIN_SUCCESS })
      })
      .catch(err => reject(err));
  });
}

// Разлогиниваемся
async function logout(getState) {
  return new Promise(async (resolve, reject) => {
    const currentState = await getState();
    const {token} = currentState.authToken;

    store.dispatch(removeLoggedIn());

    // await AsyncStorage.removeItem('userData');
    // await AsyncStorage.removeItem('userToken');

    // axios.post(`${API_URL}/user/logout`, {}, {
    //   headers: {
    //     authorization: `Bearer ${token}`,
    //   },
    // })
    //   .then(async (response) => {
    //     resolve(response);
    //     await AsyncStorage.removeItem('userData');
    //     await AsyncStorage.removeItem('userToken');
    //   })
    //   .catch(err => reject(err));
  });
}

// Устанавливаем пинкод
async function setPincode(pincode) {
  return new Promise(async (resolve, reject) => {
    AsyncStorage.setItem('pincode', pincode).then(() => {
      resolve(data);
    });
  });
}

export const userService = {
  login,
  logout,
  setPincode,
};
