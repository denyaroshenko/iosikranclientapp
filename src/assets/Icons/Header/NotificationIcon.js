import * as React from "react"
import Svg, { Path } from "react-native-svg"

import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Linking
} from 'react-native';

function NotificationIcon(props) {
  const { count } = props;

  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <Path
          d="M21.673 18.553A9.601 9.601 0 0120 16.6a8.42 8.42 0 01-.9-3.207V10.1a7.207 7.207 0 00-6.293-7.167v-.86a.89.89 0 00-1.78 0v.874a7.207 7.207 0 00-6.22 7.153v3.293a8.42 8.42 0 01-.9 3.207 9.598 9.598 0 01-1.647 1.953.667.667 0 00-.227.5v.907a.667.667 0 00.667.667h18.533a.667.667 0 00.667-.667v-.907a.666.666 0 00-.227-.5zm-18.253.74c.62-.599 1.166-1.27 1.627-2a9.493 9.493 0 001.1-3.9V10.1a5.827 5.827 0 1111.646 0v3.293a9.492 9.492 0 001.1 3.9c.46.73 1.007 1.401 1.627 2H3.42zM12 22.853a1.78 1.78 0 001.72-1.52h-3.507A1.78 1.78 0 0012 22.853z"
          fill="#fff"
        />
      </Svg>
      {count ? <View style={styles.hasNotificationsDot}></View> : <></>}
    </Svg>
  )
}

const styles = StyleSheet.create({

  // Точка для иконки нотификаций
  hasNotificationsDot: {
    width: 7,
    height: 7,
    borderRadius: 10,
    backgroundColor: 'red',
    position: 'absolute',
    top: 0,
    right: 0,
  }

});

export default NotificationIcon
