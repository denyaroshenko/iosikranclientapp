// Корневой навигатор
import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/AuthScreen';
import HomeScreen from '../screens/HomeScreen';

// получаем текущий state
import store from '../store/store'
import { Provider } from 'react-redux';

const state = store.getState();

// if (!state.authToken) {

//   const RootNavigationStack = createStackNavigator();

//   const RootStackScreen = () => {
//     console.log('state.authToken:', state.authToken);

//   };

//   const NavigationContainerStack = () => (
//     <NavigationContainer>
//       <RootStackScreen />
//     </NavigationContainer>
//   );

//   return (
//     <RootNavigationStack.Navigator
//       screenOptions={{
//         headerTransparent: true,
//         headerBackTitleVisible: false,
//         headerTitle: () => null,
//       }}
//     >

//       <RootNavigationStack.Screen name="Login" component={Login} />
//     </RootNavigationStack.Navigator>
//   );
// } else {
//   return (
//     // <Provider store={store}>
//     <HomeScreen />
//     // </Provider>
//   )

//   return
// }

const RootStackScreen = () => {
  if (!state.authToken) {
    const RootNavigationStack = createStackNavigator();

    return (
      <RootNavigationStack.Navigator
        screenOptions={{
          headerTransparent: true,
          headerBackTitleVisible: false,
          headerTitle: () => null,
        }}
      >

        <RootNavigationStack.Screen name="Login" component={Login} />
      </RootNavigationStack.Navigator>
    )
  } else {

    return (
      <HomeScreen />
    )
  }
};

const NavigationContainerStack = () => (
  <NavigationContainer>
    <RootStackScreen />
  </NavigationContainer>
);

export default NavigationContainerStack;