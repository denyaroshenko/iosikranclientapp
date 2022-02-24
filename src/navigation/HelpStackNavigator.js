import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
  HelpScreen,
  OrderDetailScreen,
  OrderCreateScreen,
  OrderCreateSuccessScreen,
  OrderEditSuccessScreen,
  OrderStatusEditScreen
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

const HelpStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="HelpScreen" component={HelpScreen} />
      <Stack.Screen name="OrderDetailScreen" component={OrderDetailScreen} />
      <Stack.Screen name="OrderCreateScreen" component={OrderCreateScreen} />
      <Stack.Screen name="OrderCreateSuccessScreen" component={OrderCreateSuccessScreen} />
      <Stack.Screen name="OrderEditSuccessScreen" component={OrderEditSuccessScreen} />
      <Stack.Screen name="OrderStatusEditScreen" component={OrderStatusEditScreen} />
    </Stack.Navigator>
  );
}

export { HelpStackNavigator };