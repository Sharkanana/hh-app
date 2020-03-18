import * as React from 'react';
import { Text, View } from 'react-native';
import t from "tcomb-form-native";
import refinements from "../helpers/refinements";
import axios from "axios";
import formStyles from "../styles/formStyles";
import Button from "react-native-button";
import deviceStorage from "../services/deviceStorage";
import {userStore} from "../stores/userStore";

/**
 * Screen for creating plans
 */
export default function LoginScreen({navigation, route}) {

  // Messaging from other routes
  React.useEffect(() => {
    if (route.params) {

      if(route.params.registered) {
        updateSuccessMsg('Account created. Please log in.');
      }
      if(route.params.loggedOut) {
        updateSuccessMsg('Successfully logged out.');
        updateFormValues({
          ...formValues,
          password: ''
        });
      }
    }
  }, [route.params]);

  /** Login Stuff **/

  const { dispatch } = React.useContext(userStore);

  React.useEffect(function() {

    async function checkLogin() {

      try {
        // Check for user
        const userObj = await deviceStorage.loadUser();

        // set auth
        axios.defaults.headers.common['Authorization'] = `Bearer ${userObj.jwt}`;

        // test our session
        await axios.get('/api/test');

        // success? set the user state
        dispatch({type: 'setuser', user: userObj.user});

        // now navigate to root
        navigation.navigate('Root');

      } catch(e) {
        //durr
      }
    }

    checkLogin();
  }, []);

  /** Form Stuff **/

  const [successMsg, updateSuccessMsg] = React.useState('');
  const [errorMsg, updateErrorMsg] = React.useState('');
  const [formValues, updateFormValues] = React.useState({});

  const User = t.struct({
    email: refinements.Email,
    password: refinements.Password
  });

  const options = {
    auto: 'placeholders',
    fields: {
      password: {
        password: true,
        secureTextEntry: true
      }
    }
  };

  const Form = t.form.Form;
  const formRef = React.useRef();

  return (
    <>

      <Text style={formStyles.title}>
        Login to Hungry Helper
      </Text>

      <View style={formStyles.container}>

        <Form ref={formRef} type={User} options={options} onChange={onChange} value={formValues}/>

        {successMsg.length > 0 && <Text style={formStyles.successDiv}>{successMsg}</Text>}
        {errorMsg.length > 0 && <Text style={formStyles.errorDiv}>{errorMsg}</Text>}

        <View style={formStyles.buttonDiv}>
          <Button style={formStyles.formBtn} containerStyle={formStyles.formBtnContainer} onPress={login}>Login</Button>
          <Button style={formStyles.formBtn} containerStyle={formStyles.formBtnContainer} onPress={register}>Register</Button>
        </View>

      </View>
    </>
  );

  function onChange(value) {
    updateFormValues(value);
  }

  function login() {

    clearParams();

    if(formRef.current.getValue()) {

      axios.post('/auth/login', formValues)
        .then(function(response) {

          let data = response.data;

          if(data.errors) {
            updateErrorMsg(data.errors);
          }
          else {

            deviceStorage.saveItem('hh_user', JSON.stringify({
              user: data.payload.user,
              jwt: data.payload.token
            }));

            axios.defaults.headers.common['Authorization'] = `Bearer ${data.payload.token}`;

            // update user context
            dispatch({ type: 'setuser', user: data.payload.user });

            // now navigate to root
            navigation.navigate('Root');
          }
        });
    }

  }

  function register() {
    clearParams();
    navigation.navigate('Register');
  }

  function clearParams() {
    updateErrorMsg('');
    updateSuccessMsg('');
    navigation.setParams({ loggedOut: null, registered: null});
  }
}