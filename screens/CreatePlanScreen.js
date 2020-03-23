import * as React from 'react';
import { Text, View } from 'react-native';
import formStyles from "../styles/formStyles";
import t from "tcomb-form-native";
import Button from "react-native-button";
import axios from 'axios';
import PlanOverview from "../components/PlanOverview";

/**
 * Screen for creating plans
 */
export default function CreatePlanScreen({navigation}) {

  const [formValues, updateFormValues] = React.useState({});
  const [errorMsg, updateErrorMsg] = React.useState('');
  const [plan, updatePlan] = React.useState(null);

  const NewPlan = t.struct({
    location: t.String
  });

  const options = {
    auto: 'placeholders'
  };

  const Form = t.form.Form;
  const formRef = React.useRef();

  return (
    <>

      <Text style={formStyles.title}>
        Create a Plan
      </Text>

      <View style={formStyles.container}>

        {
          plan ?
            <PlanOverview plan={plan}/>
            :
            <PlanForm/>
        }

      </View>
    </>
  );

  function PlanForm() {
    return (
      <>
        <Form ref={formRef} type={NewPlan} options={options} onChange={onChange} value={formValues}/>

        {errorMsg.length > 0 && <Text style={formStyles.errorDiv}>{errorMsg}</Text>}

        <View style={formStyles.buttonDiv}>
          <Button style={formStyles.formBtn} containerStyle={formStyles.formBtnContainer} onPress={initPlan}>Create Plan</Button>
        </View>
      </>
    );
  }

  function onChange(value) {
    updateFormValues(value);
  }

  function initPlan() {

    if(formRef.current.getValue()) {

      axios.post('api/initPlan', formValues)
        .then(function(result) {

          updatePlan(result.data);

        });
    }

  }
}