import * as React from 'react';
import PlanForm from "../components/PlanForm";
import {createStackNavigator} from "@react-navigation/stack";
import formStyles from "../styles/formStyles";
import HH_Text from "../components/pieces/Text";

const Stack = createStackNavigator();


/**
 * Screen for creating plans
 */
export default function CreatePlanScreen({navigation}) {

  return (
    <>

      <HH_Text style={formStyles.title}>
        Create a Plan
      </HH_Text>

      <Stack.Navigator headerMode="none">
        <Stack.Screen name="PlanForm" component={PlanForm}/>
      </Stack.Navigator>
    </>
  );
}