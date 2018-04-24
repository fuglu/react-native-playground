import React from "react";
import { Picker, StyleSheet, Text, View, Button } from "react-native";
import JsSIP from "jssip";
import {
  RTCPeerConnection,
  RTCMediaStream,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStreamTrack,
  getUserMedia
} from "react-native-webrtc";

window.RTCPeerConnection = RTCPeerConnection;
window.RTCMediaStream = RTCMediaStream;
window.RTCIceCandidate = RTCIceCandidate;
window.RTCSessionDescription = RTCSessionDescription;
window.RTCView = RTCView;
window.MediaStreamTrack = MediaStreamTrack;
window.getUserMedia = getUserMedia;

export default class App extends React.Component {
  state = { language: "" };
  componentDidMount() {
    const socket = new JsSIP.WebSocketInterface("wss://tls01.sipgate.de:443");

    const ua = new JsSIP.UA({
      sockets: [socket],
      uri: "sip:2617685e0@sipgate.de",
      password: "bNNxYhTZPuFS"
    });

    ua.on("registered", () => {
      console.log("registered");

      this.setState({ registered: true });
    });

    ua.on("newRTCSession", () => {
      console.log("foo");
    });
    ua.start();

    this.setState({
      ua
    });
  }

  call = number => {
    this.state.ua.call("491787777973", {
      mediaConstraints: { audio: true, video: false }
    });
  };
  render() {
    const registered = this.state.registered ? (
      <Text>Registered</Text>
    ) : (
      <Text>Unregistered</Text>
    );
    return (
      <View style={styles.container}>
        {registered}
        <Button title="Call" onPress={this.call} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
