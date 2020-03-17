import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from "../constants/Colors";
import axios from "axios";
import t from 'tcomb-form-native';
import refinements from "../helpers/refinements";
import Button from "react-native-button";

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
      <Text style={styles.title}>
        Register to Hungry Helper
      </Text>

      <View style={styles.container}>

        <Form ref={formRef} type={User} options={options} onChange={onChange} value={formValues}/>

        {errorMsg.length > 0 && <Text style={styles.errorDiv}>{errorMsg}</Text>}

        <View style={styles.buttonDiv}>
          <Button style={styles.formBtn} containerStyle={styles.formBtnContainer} onPress={cancel}>Cancel</Button>
          <Button style={styles.formBtn} containerStyle={styles.formBtnContainer} onPress={register}>Register</Button>
        </View>

      </View>
    </>
  );

  function onChange() {
    updateFormValues(formRef.current.getValue());
  }

  function cancel() {
    navigation.navigate('Login');
  }
  function register() {

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
            navigation.navigate('Login');
          }
        });
    }
  }
}

const styles = StyleSheet.create({
  hidden: {
    display: 'none'
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 24,
    backgroundColor: Colors.primary,
    color: Colors.white,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    padding: 10
  },
  errorDiv: {
    backgroundColor: Colors.errorBackground,
    color: Colors.errorText,
    fontSize: 18,
    padding: 3,
    marginBottom: 5
  },
  buttonDiv: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center'
  },
  formBtnContainer: {
    flex: 1,
    borderRadius: 4,
    backgroundColor: Colors.secondary,
    padding: 5,
    margin: 5
  },
  formBtn: {
    color: Colors.white
  }
});
