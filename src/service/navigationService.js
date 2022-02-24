import { NavigationActions } from "react-navigation";
import { CommonActions } from '@react-navigation/native';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  console.log('[INFO] Переходим на экран 1', routeName);

  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
  // _navigator.navigate({
  //   name: routeName,
  //   params: params,
  // })

  console.log('[INFO] Переходим на экран', routeName);
}

export default {
  navigate,
  setTopLevelNavigator,
};
