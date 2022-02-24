import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import {
  AuthScreen,
  RegisterScreen,
  PasswordRecoveryScreen,
  ThankyouScreen
} from '../screens';

const Stack = createStackNavigator();

const screenOptions = {
  headerBackTitle: 'Назад',
  headerTintColor: '#000000',
  headerStyle: {
    backgroundColor: '#FED000',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
};

const AuthStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="AuthScreen" component={AuthScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="PasswordRecoveryScreen" component={PasswordRecoveryScreen} />
        <Stack.Screen name="ThankyouScreen" component={ThankyouScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export { AuthStackNavigator };