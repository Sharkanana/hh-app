import * as React from 'react';
import { View } from 'react-native';
import Button from "react-native-button";

import {appContextStore} from "../stores/appContextStore";
import formStyles from "../styles/formStyles";
import deviceStorage from "../services/deviceStorage";
import HH_Text from "../components/pieces/Text";

/**
 * Screen for editing profile
 */
export default function ProfileScreen({navigation}) {

  const { state, dispatch } = React.useContext(appContextStore);

  return (
    <>

      <HH_Text style={formStyles.title}>
        Profile
      </HH_Text>

      <View style={formStyles.container}>

        <HH_Text>Email: {state.user.email}</HH_Text>

        <View style={formStyles.buttonDiv}>
          <Button style={formStyles.formBtn} containerStyle={formStyles.formBtnContainer} onPress={logout}>Logout</Button>
        </View>

      </View>
    </>
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