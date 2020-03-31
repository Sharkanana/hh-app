import * as React from 'react';
import PlanForm from "../components/PlanForm";
import {createStackNavigator} from "@react-navigation/stack";
import {Text} from "react-native";
import formStyles from "../styles/formStyles";

const Stack = createStackNavigator();


/**
 * Screen for creating plans
 */
export default function CreatePlanScreen({navigation}) {

  return (
    <>

      <Text style={formStyles.title}>
        Create a Plan
      </Text>

      <Stack.Navigator headerMode="none">
        <Stack.Screen name="PlanForm" component={PlanForm}/>
      </Stack.Navigator>
    </>
  );
}