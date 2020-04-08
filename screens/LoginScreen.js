import * as React from 'react';
import { View } from 'react-native';
import t from "tcomb-form-native";
import refinements from "../helpers/refinements";
import axios from "axios";
import formStyles from "../styles/formStyles";
import Button from "react-native-button";
import deviceStorage from "../services/deviceStorage";
import {userStore} from "../stores/userStore";
import HH_Text from "../components/pieces/Text";

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
        let userObj = await deviceStorage.loadUser();

        // set auth
        axios.defaults.headers.common['Authorization'] = `Bearer ${userObj.jwt}`;

        // test our session
        await axios.get('/api/test')
          .catch(async function(err) {

            // so we have a user, but errored out...try to refresh

            const result = await axios.post('/auth/token', {
              userId: userObj.user.id,
              refreshToken: userObj.refreshToken
            });

            userObj.jwt = result.data.token;

            await deviceStorage.saveItem('hh_user', userObj);

            await checkLogin();
          });

        // success? set the user state
        dispatch({type: 'setuser', user: userObj.user});

        // now reset and navigate to root
        navigation.reset({
          index: 0,
          routes: [ {name: 'Root' }]
        });

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

      <HH_Text style={formStyles.title}>
        Login to Hungry Helper
      </HH_Text>

      <View style={formStyles.container}>

        <Form ref={formRef} type={User} options={options} onChange={onChange} value={formValues}/>

        {successMsg.length > 0 && <HH_Text style={formStyles.successDiv}>{successMsg}</HH_Text>}
        {errorMsg.length > 0 && <HH_Text style={formStyles.errorDiv}>{errorMsg}</HH_Text>}

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

            deviceStorage.saveItem('hh_user', {
              user: data.payload.user,
              jwt: data.payload.token
            });

            axios.defaults.headers.common['Authorization'] = `Bearer ${data.payload.token}`;

            // update user context
            dispatch({ type: 'setuser', user: data.payload.user });

            // now reset and navigate to root
            navigation.reset({
              index: 0,
              routes: [ {name: 'Root' }]
            });
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