import * as React from 'react';
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

      <Stack.Navigator headerMode="none">
        <Stack.Screen name="PlanList" component={PlanList}/>
        <Stack.Screen name="PlanOverview" component={PlanOverview}/>
      </Stack.Navigator>

    </>
  );
}