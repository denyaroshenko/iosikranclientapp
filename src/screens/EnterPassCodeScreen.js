import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';

// import H1 from '../../Common/Inheritance/h1';
// import { config } from '../../../theme/config';

// import { Actions } from 'react-native-router-flux';

class EnterPassCodeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passCode: ''
    };
    this.onBack = this.onBack.bind(this);
  }
  onBack() {
    Actions.EnterTouchId();
  }
  onChangePassCode() { }
  render() {
    return (
      <View style={styles.pad}>
        <TouchableOpacity style={styles.backButton} onPress={this.onBack}>
          {/* <Image source={require('../../../assets/img/back_arrow_black.png')} /> */}
        </TouchableOpacity>
        <View style={styles.title}>
          <Text>Create a passcode</Text>
        </View>
        <View style={styles.codeWrapper}>
          <View style={styles.passcodeEnter}>
            <TextInput
              secureTextEntry={true}
              style={styles.textBox}
              keyboardType='numeric'
              maxLength={4}
              autoFocus={true}
              onChange={this.onChangePassCode.bind(this)}
              onChangeText={passCode => this.setState({ passCode })}
            />
          </View>
          <View style={styles.circleBlock}>
            <View
              style={[
                styles.circle,
                this.state.passCode.length >= 1 && styles.circleFill
              ]}
            ></View>
            <View
              style={[
                styles.circle,
                this.state.passCode.length >= 2 && styles.circleFill
              ]}
            ></View>
            <View
              style={[
                styles.circle,
                this.state.passCode.length >= 3 && styles.circleFill
              ]}
            ></View>
            <View
              style={[
                styles.circle,
                this.state.passCode.length >= 4 && styles.circleFill
              ]}
            ></View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pad: {
    paddingTop: 75,
    margin: 5
  },
  backButton: {
    display: 'flex',
    left: 10,
    top: 30,
    position: 'absolute',
    zIndex: 9999,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 90,
    paddingTop: 40
  },
  codeWrapper: {
    position: 'relative'
  },
  passcodeEnter: {
    height: '100%',
    opacity: 0,
    position: 'absolute',
    width: '100%',
    zIndex: 9
  },
  textBox: {
    fontSize: 30,
    letterSpacing: 15,
    textAlign: 'center'
  },
  circleBlock: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  circle: {
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#000',
    height: 25,
    marginLeft: 23,
    marginRight: 23,
    width: 25
  },
  circleFill: {
    backgroundColor: 'green',
    borderRadius: 30,
    borderWidth: 3,
    borderColor: 'green',
    height: 25,
    marginLeft: 23,
    marginRight: 23,
    width: 25
  }
});

export default EnterPassCodeScreen;