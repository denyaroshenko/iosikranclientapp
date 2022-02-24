import React from 'react';
import { StyleSheet, Animated, View, Text } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

const headerBg = '#282f3f';
const activeBg = '#384153';
const normalBg = '#434e64';
const activeText = '#ffffff';
const normalText = '#222222';

const styles = StyleSheet.create({
  text: {
    lineHeight: 20,
    paddingTop: 9,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 9,
    textAlign: 'center',
  },
  tabStyle: {
    opacity: 1,
    width: 'auto',
    marginRight: 2,
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    backgroundColor: headerBg,
  },
  tab: {
    backgroundColor: headerBg,
    paddingRight: 5,
    paddingLeft: 20,
    paddingTop: 20,
    marginTop: 2,
  },
  indicator: {
  },
  content: {
    padding: 20,
    backgroundColor: activeBg
  },
  contentText: {
    color: activeText,
  },
});

const FirstRoute = () => (
  <View style={styles.content}>
    <Text style={styles.contentText}>First</Text>
  </View>
);
const SecondRoute = () => (
  <View style={styles.content}>
    <Text style={styles.contentText}>Second</Text>
  </View>
);
const ThirdRoute = () => (
  <View style={styles.content}>
    <Text style={styles.contentText}>Third</Text>
  </View>
);
const FourthRoute = () => (
  <View style={styles.content}>
    <Text style={styles.contentText}>Fourth</Text>
  </View>
);

export default class TabsTestScreen extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'First' },
      { key: 'second', title: 'Second' },
      { key: 'third', title: 'Third' },
      { key: 'fourth', title: 'Fourth' },
    ],
  };
  _renderLabel(scene) {
    const { position, navigationState, getLabelText } = this;
    const { routes } = navigationState;
    const { route } = scene;

    const label = getLabelText(scene);
    const inputRange = routes.map((x, i) => i);

    const backgroundColor = position.interpolate({
      inputRange,
      outputRange: routes.map(r => (r === route ? activeBg : normalBg)),
      extrapolate: 'clamp',
    });
    const color = position.interpolate({
      inputRange,
      outputRange: routes.map(r => (r === route ? activeText : normalText)),
      extrapolate: 'clamp',
    });

    return (
      <Animated.Text
        numberOfLines={1}
        style={[
          styles.text,
          {
            color,
            backgroundColor,
          },
        ]}
      >
        {label}
      </Animated.Text>
    );
  }
  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: FirstRoute,
          second: SecondRoute,
          third: ThirdRoute,
          fourth: FourthRoute,
        })}
        renderTabBar={props => (
          <TabBar
            {...props}
            renderLabel={this._renderLabel}
            getLabelText={({ route: { title } }) => title}
            indicatorStyle={styles.indicator}
            tabStyle={styles.tabStyle}
            style={styles.tab}
          />
        )}
        onIndexChange={index => this.setState({ index })}
      />
    );
  }
}