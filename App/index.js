import React from "react";
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  Easing,
  ScrollView
} from "react-native";
let backgroundColor = "rgb(146, 156, 42)";
class FadeView extends React.Component {
  state = {
    isFaded: false,
    fadeAnim: new Animated.Value(1)
  };

  startAnimation = () => {
    let { isFaded } = this.state;
    Animated.timing(this.state.fadeAnim, {
      toValue: isFaded ? 1 : 0,
      duration: 1000
    }).start(() => {
      this.setState({ isFaded: !isFaded });
    });
  };

  render() {
    let { fadeAnim, isFaded } = this.state;
    let text = isFaded ? "  in" : "out";
    text = "Fade " + text;
    var interpolatedColorAnimation = fadeAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ["rgba(255,255,255, 1)", backgroundColor]
    });
    var textColor = fadeAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ["rgba(0, 0, 0, 1)", "rgba(255, 255, 255, 1)"]
    });
    return (
      <Animated.View
        style={[
          {
            backgroundColor: interpolatedColorAnimation,
            width: 250,
            height: 50,
            margin: 20
          }
        ]}
      >
        <TouchableOpacity
          onPress={() => this.startAnimation(this.state.isFaded)}
        >
          <Animated.Text
            style={[
              {
                fontSize: 28,
                textAlign: "center",
                margin: 10,
                color: textColor
              }
            ]}
          >
            {text}
          </Animated.Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

class RotateView extends React.Component {
  state = {
    isFaded: true,
    fadeAnim: new Animated.Value(0)
  };

  startAnimation = () => {
    let { isFaded } = this.state;
    Animated.timing(this.state.fadeAnim, {
      toValue: isFaded ? 1 : 0,
      duration: 1000
    }).start(() => {
      this.setState({ isFaded: !isFaded });
    });
  };

  render() {
    let { rotation } = this.props;
    let { fadeAnim, isFaded } = this.state;

    const rotate = fadeAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"]
    });
    const rotateXorY = fadeAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "180deg"]
    });
    let rotatePanel =
      rotation == "x"
        ? { rotateX: rotateXorY }
        : rotation == "y" ? { rotateY: rotateXorY } : { rotate };

    let text = rotation ? rotation : isFaded ? " front" : "back";
    text = "Rotate " + text;

    return (
      <Animated.View
        style={[
          {
            backgroundColor: backgroundColor,
            width: 250,
            height: 50,
            margin: 20
          },
          { transform: [rotatePanel] }
        ]}
      >
        <TouchableOpacity
          onPress={() => this.startAnimation(this.state.isFaded)}
        >
          <Animated.Text
            style={[
              {
                fontSize: 28,
                textAlign: "center",
                margin: 10,
                color: "white"
              }
            ]}
          >
            {text}
          </Animated.Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}
class ScaleView extends React.Component {
  state = {
    isFaded: false,
    isScaled: true,
    fadeAnim: new Animated.Value(1),
    scaleAnim: new Animated.Value(0)
  };

  startAnimation = () => {
    let { isFaded, isScaled, fadeAnim, scaleAnim } = this.state;
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: isScaled ? 1 : 0,
        friction: 1
      }).start(() => this.setState({ isScaled: !isScaled })),
      Animated.timing(fadeAnim, {
        toValue: isFaded ? 1 : 0.5,
        duration: 1000
      }).start(() => {
        this.setState({ isFaded: !isFaded });
      })
    ]);
  };

  render() {
    let { scaling } = this.props;
    let { scaleAnim, fadeAnim, isScaled, isFaded } = this.state;

    const scale = scaleAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.2]
    });

    let scalePanel =
      scaling == "x"
        ? { scaleX: scale }
        : scaling == "y" ? { scaleY: scale } : { scale: scale };
    let text = scaling ? scaling : isScaled ? "" : "back";
    text = "Scale " + text;

    return (
      <Animated.View
        style={[
          {
            backgroundColor: backgroundColor,
            width: 250,
            height: 50,
            margin: 20
          },
          { transform: [scalePanel] }
        ]}
      >
        <TouchableOpacity onPress={() => this.startAnimation()}>
          <Animated.Text
            style={[
              {
                fontSize: 28,
                textAlign: "center",
                margin: 10,
                color: "white"
              }
            ]}
          >
            {text}
          </Animated.Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}
class TranslateView extends React.Component {
  state = {
    isFaded: true,
    fadeAnim: new Animated.Value(0)
  };

  startAnimation = () => {
    let { isFaded } = this.state;
    Animated.timing(this.state.fadeAnim, {
      toValue: isFaded ? 1 : 0,
      duration: 1000
    }).start(() => {
      this.setState({ isFaded: !isFaded });
    });
  };

  render() {
    let { translation } = this.props;
    let { fadeAnim, isFaded } = this.state;

    const translate = fadeAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 30]
    });

    let translatePanel =
      translation == "x"
        ? { translateX: translate }
        : { translateY: translate };
    let text = translation ? translation : isFaded ? "" : "back";
    text = "Translate " + text;

    return (
      <Animated.View
        style={[
          {
            backgroundColor: backgroundColor,
            width: 250,
            height: 50,
            margin: 20
          },
          { transform: [translatePanel] }
        ]}
      >
        <TouchableOpacity onPress={() => this.startAnimation()}>
          <Animated.Text
            style={[
              {
                fontSize: 28,
                textAlign: "center",
                margin: 10,
                color: "white"
              }
            ]}
          >
            {text}
          </Animated.Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

import PushNotification from "react-native-push-notification";

PushNotification.configure({
  onRegister: function(token) {
    console.log("TOKEN:", token);
  },
  onNotification: function(notification) {
    console.log("NOTIFICATION:", notification);
  },
  senderID: "YOUR GCM SENDER ID",
  permissions: {
    alert: true,
    badge: true,
    sound: true
  },
  popInitialNotification: true,
  requestPermissions: true
});
PushNotification.localNotification({
  id: "0",
  ticker: "My Notification Ticker",
  autoCancel: true,
  largeIcon: "ic_launcher",
  smallIcon: "ic_notification",
  bigText: "My big text that will be shown when notification is expanded",
  subText: "This is a subText",
  color: "red",
  vibrate: true,
  vibration: 300,
  tag: "some_tag",
  group: "group",
  ongoing: false,
  title: "My Notification Title",
  message: "My Notification Message",
  playSound: false,
  soundName: "default",
  number: 5,
  repeatType: "day",
  actions: '["Yes", "No"]',
  category: "Notification"
});
PushNotification.localNotificationSchedule({
  message: "My Notification Message",
  number: 5, // (required)
  date: new Date(Date.now() + 10 * 1000) // in 60 secs
});
//PushNotification.cancelAllLocalNotifications();

const App = () => {
  return (
    <ScrollView
      style={{ flex: 1, marginTop: 20 }}
      contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
    >
      <FadeView />
      <RotateView />
      <RotateView rotation="x" />
      <RotateView rotation="y" />
      <ScaleView />
      <ScaleView scaling="x" />
      <ScaleView scaling="y" />
      <TranslateView translation="x" />
      <TranslateView translation="y" />
    </ScrollView>
  );
};
export default App;
