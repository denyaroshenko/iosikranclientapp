import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
  HomeScreen,
  ObjectScreen,
  PDFScreen,
  DebtListScreen,
  NewsDetailsScreen,
  NewsListScreen,
  SpecialOfferListScreen,
  SpecialOfferDetailsScreen,
  CommercialOfferScreen,
  CommercialOfferSuccessScreen,
  NotificationListScreen,
  OnlineChatScreen,
  OrderDetailScreen,
  OrderEditSuccessScreen,
  OrderStatusEditScreen
} from '../screens';

import { ObjectsStackNavigator } from './ObjectsStackNavigator';
import { CatalogStackNavigator } from './CatalogStackNavigator';

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

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Объекты" component={ObjectsStackNavigator} />
      <Stack.Screen name="ObjectScreen" component={ObjectScreen} />
      <Stack.Screen name="Каталог" component={CatalogStackNavigator} />
      <Stack.Screen name="DebtListScreen" component={DebtListScreen} />
      <Stack.Screen name="NotificationListScreen" component={NotificationListScreen} />
      <Stack.Screen name="OrderDetailScreen" component={OrderDetailScreen} />
      <Stack.Screen name="OrderEditSuccessScreen" component={OrderEditSuccessScreen} />
      <Stack.Screen name="OrderStatusEditScreen" component={OrderStatusEditScreen} />

      {/* Онлайн-чат */}
      <Stack.Screen name="OnlineChatScreen" component={OnlineChatScreen} />

      {/* Запросы КП */}
      <Stack.Screen name="CommercialOfferScreen" component={CommercialOfferScreen} />
      <Stack.Screen name="CommercialOfferSuccessScreen" component={CommercialOfferSuccessScreen} />

      {/* Новости */}
      <Stack.Screen name="NewsListScreen" component={NewsListScreen} />
      <Stack.Screen name="NewsDetailsScreen" component={NewsDetailsScreen} />

      {/* Спецпредложения */}
      <Stack.Screen name="SpecialOfferListScreen" component={SpecialOfferListScreen} />
      <Stack.Screen name="SpecialOfferDetailsScreen" component={SpecialOfferDetailsScreen} />

      {/* Helpers */}
      <Stack.Screen name="PDFScreen" component={PDFScreen} />

      {/* <Stack.Screen name="CranScreen" component={CranScreen} />
      <Stack.Screen name="DocumentsScreen" component={DocumentsScreen} />
      <Stack.Screen name="DocumentFileScreen" component={DocumentFileScreen} />
      <Stack.Screen name="PDFScreen" component={PDFScreen} />
      <Stack.Screen name="VideoStreamScreen" component={VideoStreamScreen} />
       */}

    </Stack.Navigator>
  );
}

export { HomeStackNavigator };