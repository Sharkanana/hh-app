import Autocomplete from "react-native-autocomplete-input";
import {StyleSheet, View} from "react-native";
import * as React from "react";

/**
 * autocomplete field
 */
export default function HH_Autocomplete(props) {

  return (
    <View style={styles.container}>
      <Autocomplete containerStyle={styles.autocompleteContainer} {...props}/>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 25
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1
  }
});