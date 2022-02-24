import { Alert } from 'react-native';
import * as RootNavigation from '../../helpers/RootNavigation';

import TabNavigator from "../../navigation/TabNavigator";

import {
  // isLoggedIn
  SET_LOGGED_IN,
  REMOVE_LOGGED_IN,

  AUTH_LOGGING_IN,
  AUTH_LOGGED_IN,
  AUTH_ERROR_LOG_IN,
  AUTH_LOGOUT,
  AUTH_CLEAR_LOGIN_ERROR_MESSAGE,

  // Данные пользователя
  SET_USER_DATA,
  CLEAR_USER_DATA,

  SET_PINCODE,
  CLEAR_PINCODE,

  SET_AUTH_TOKEN,
  REMOVE_AUTH_TOKEN,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from "./types";

import { userService } from '../../service/userService';
import { errorParser } from '../../service/apiErrorParser';
import navigationService from '../../service/navigationService';

// Пользователь залогинен. Ставим отметку в сторе
export const setLoginSuccess = () => ({
  type: SET_LOGGED_IN,
});

export const removeLoggedIn = () => ({
  type: REMOVE_LOGGED_IN,
});

// Пользователь залогинен
export const loggedIn = data => ({
  type: AUTH_LOGGED_IN,
  payload: data,
});

// Очистка сообщения об ошибке
export const clearLoginErrorMessage = () => ({
  type: AUTH_CLEAR_LOGIN_ERROR_MESSAGE,
});

export const errorLogIn = errorMessage => ({
  type: AUTH_ERROR_LOG_IN,
  payload: errorMessage,
});

export const loggingIn = () => ({
  type: AUTH_LOGGING_IN,
});

// dispatch logout
export const loggedOut = () => ({
  type: REMOVE_LOGGED_IN,
});

// Устанавливаем данные пользователя
export const setAuthToken = token => ({
  type: SET_AUTH_TOKEN,
  payload: token,
});

// Устанавливаем данные пользователя
export const setUserData = data => ({
  type: SET_USER_DATA,
  payload: data,
});

// Авторизация (РАБОТАЕТ)
export const login = (username, password) => (dispatch) => {

  dispatch(loggingIn());

  userService.login(username, password).then(async (res) => {
    await dispatch(setAuthToken(res.id))
    // await dispatch(loggedIn(res))
    await dispatch(setUserData(res))

    await dispatch(setLoginSuccess())

    RootNavigation.navigate('TabNavigator', { screen: 'Главная' }) // После успешной авторизации переходим на основное приложение
  }).catch((err) => {
    dispatch(errorLogIn(errorParser.parseLoginError(err).message));
    alert('Неправильный логин или пароль')
    console.log('[ERROR]', errorLogIn(errorParser.parseLoginError(err).message));
  });
};

// Выход из аккаунта
export const logout = () => async (dispatch, getState) => {
  await userService.logout(getState).then((res) => {
    dispatch(loggedOut());
  }).catch((err) => { });
};

//-------- Внизу на удаление

const showErrorHandler = () => {
  //function to make simple alert
  Alert.alert(
    //title
    'Ошибка',
    //body
    'Неверный логин или пароль',
    [
      {
        text: 'ОК',
        onPress: () => console.log('No Pressed'), style: 'cancel'
      },
    ],
    { cancelable: false },
    //clicking out side of alert will not cancel
  );
};

export const register = (username, email, password) => (dispatch) => {
  return AuthService.register(username, email, password).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};