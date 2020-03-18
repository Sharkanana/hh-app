import * as React from 'react';
import { Text, View } from 'react-native';
import axios from "axios";
import t from 'tcomb-form-native';
import refinements from "../helpers/refinements";
import Button from "react-native-button";
import formStyles from "../styles/formStyles";

/**
 * Screen for registering a new user
 */
export default function RegisterScreen({navigation}) {

  const [errorMsg, updateErrorMsg] = React.useState('');
  const [formValues, updateFormValues] = React.useState({});

  const User = t.struct({
    email: refinements.Email,
    password: refinements.Password,
    confirm: refinements.Password
  });

  const options = {
    auto: 'placeholders',
    fields: {
      password: {
        password: true,
        secureTextEntry: true
      },
      confirm: {
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
        Register to Hungry Helper
      </Text>

      <View style={formStyles.container}>

        <Form ref={formRef} type={User} options={options} onChange={onChange} value={formValues}/>

        {errorMsg.length > 0 && <Text style={formStyles.errorDiv}>{errorMsg}</Text>}

        <View style={formStyles.buttonDiv}>
          <Button style={formStyles.formBtn} containerStyle={formStyles.formBtnContainer} onPress={cancel}>Cancel</Button>
          <Button style={formStyles.formBtn} containerStyle={formStyles.formBtnContainer} onPress={register}>Register</Button>
        </View>

      </View>
    </>
  );

  function onChange(value) {
    updateFormValues(value);
  }

  function cancel() {
    navigation.navigate('Login', { successMsg: ''});
  }

  function register() {

    updateErrorMsg('');

    if(formRef.current.getValue()) {

      if(formValues.password !== formValues.confirm) {

        updateErrorMsg('Password and Confirm do not match.');

        return;
      }

      axios.post('/auth/register', formValues)
        .then(function(response) {

          let data = response.data;

          if(data.errors) {
            updateErrorMsg(data.errors);
          }
          else {
            navigation.navigate('Login', { registered: true});
          }
        });
    }
  }
}