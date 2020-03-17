import * as React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import Colors from "../constants/Colors";

/**
 * Screen for creating plans
 */
export default function LoginScreen({navigation}) {

  return (
    <View style={styles.container}>

      <Text>
        Login to Hungry Helper
      </Text>
      <TextInput placeholder="Email"/>
      <TextInput placeholder="Password" />
      <Button onPress={login} title="Login"/>
      <Button onPress={register} title="Register"/>

    </View>
  );

  function login() {

  }

  function register() {
    navigation.navigate('Register');
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingTop: 20
  }
});
