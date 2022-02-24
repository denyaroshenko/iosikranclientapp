import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as RootNavigation from '../helpers/RootNavigation';

import {
  SettingsScreen,
  SetCodeScreen,
  AboutCompanyScreen,
  ContactsScreen,
  AboutAppScreen,
  NotificationsTestScreen,
  AuthScreen
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

const SettingsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="SetCodeScreen" component={SetCodeScreen} />
      <Stack.Screen name="AboutCompanyScreen" component={AboutCompanyScreen} />
      <Stack.Screen name="ContactsScreen" component={ContactsScreen} />
      <Stack.Screen name="AboutAppScreen" component={AboutAppScreen} />
      <Stack.Screen name="NotificationsTestScreen" component={NotificationsTestScreen} />
    </Stack.Navigator>
  );
}

export { SettingsStackNavigator };