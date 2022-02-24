import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from "axios";

import { config } from '../config'

const { API_URL } = config

class AuthService {
  login(username, password) {

    // let data = new FormData();
    // data.append('login', username);
    // data.append('password', password);

    // axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    // axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

    // axios.defaults.params = {
    //   'login': username,
    //   'password': password
    // };

    let url = API_URL + "/auth?login=" + username + "&password=" + password;

    const params = new URLSearchParams();
    params.append('login', username);
    params.append('password', password);

    return axios
      .get(url)
      .then((response) => {
        // if (response.data.accessToken) {
        if (response.data.success) {
          // localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  // logout() {
  //   console.log('[INFO] Очищаем AsyncStorage');
  //   AsyncStorage.removeItem('userData'); // Очищаем AsyncStorage
  // }

  register(username, email, password) {
    return axios.post(API_URL + "/signup", {
      username,
      email,
      password,
    });
  }
}

export default new AuthService();
