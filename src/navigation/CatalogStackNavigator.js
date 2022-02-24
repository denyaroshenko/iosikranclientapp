import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
  CatalogListScreen,
  CraneDetailScreen,
  CommercialOfferScreen
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

const CatalogStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Catalog" component={CatalogListScreen} />
      <Stack.Screen name="CraneDetailScreen" component={CraneDetailScreen} />
      <Stack.Screen name="CommercialOfferScreen" component={CommercialOfferScreen} />
    </Stack.Navigator>
  );
}

export { CatalogStackNavigator };