import React from "react";
import { Picker, StyleSheet, Text, View, Button } from "react-native";

export default class App extends React.Component {
  state = {
    kisses: []
  };
  kiss = () => {
    const kiss = ["👄", "👩‍❤️‍💋‍👨", "😚", "💋"];
    this.setState({
      kisses: [
        ...this.state.kisses,
        kiss[Math.floor(Math.random() * kiss.length)]
      ]
    });
  };
  render() {
    const kisses = <Text>{this.state.kisses.map(kiss => kiss)}</Text>;
    return (
      <View style={styles.container}>
        <Text>Hallo Mini Maus</Text>
        <Button title="Klick" onPress={this.kiss} />
        {kisses}
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
