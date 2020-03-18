import * as React from 'react';
import { Text, View } from 'react-native';
import t from "tcomb-form-native";
import refinements from "../helpers/refinements";
import axios from "axios";
import formStyles from "../styles/formStyles";
import Button from "react-native-button";
import deviceStorage from "../services/deviceStorage";

/**
 * Screen for creating plans
 */
export default function LoginScreen({navigation, updateUser, route}) {

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

        {route && route.params && route.params.successMsg.length > 0 && <Text style={formStyles.successDiv}>{route.params.successMsg}</Text>}
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

    updateErrorMsg('');

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

            axios.defaults.Authorization = data.payload.token;
            updateUser(data.payload.user);

          }
        });
    }

  }

  function register() {
    navigation.navigate('Register');
  }
}