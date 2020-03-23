import * as React from 'react';
import { Text, View } from 'react-native';
import Button from "react-native-button";

import {userStore} from "../stores/userStore";
import formStyles from "../styles/formStyles";
import deviceStorage from "../services/deviceStorage";

/**
 * Screen for editing profile
 */
export default function ProfileScreen({navigation}) {

  const { state, dispatch } = React.useContext(userStore);

  return (
    <View style={formStyles.container}>

      <Text>Email: {state.email}</Text>

      <View style={formStyles.buttonDiv}>
        <Button style={formStyles.formBtn} containerStyle={formStyles.formBtnContainer} onPress={logout}>Logout</Button>
      </View>

    </View>
  );

  function logout() {

    //update user context to switch back to login stack
    dispatch({ type: 'logout' });

    //remove saved token
    deviceStorage.deleteUser();

    //reset and head back to login page
    navigation.reset({
      index: 0,
      routes: [ {name: 'Login', params: { loggedOut: true } }]
    });

  }
}