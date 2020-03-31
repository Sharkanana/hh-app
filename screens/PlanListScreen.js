import * as React from 'react';
import { Text } from 'react-native';
import formStyles from "../styles/formStyles";
import PlanOverview from "../components/PlanOverview";
import PlanList from "../components/PlanList";
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();

/**
 * Screen for listing plans
 */
export default function PlanListScreen() {
  return (
    <>

      <Text style={formStyles.title}>
        My Plans
      </Text>

      <Stack.Navigator headerMode="none">
        <Stack.Screen name="PlanList" component={PlanList}/>
        <Stack.Screen name="PlanOverview" component={PlanOverview}/>
      </Stack.Navigator>

    </>
  );
}