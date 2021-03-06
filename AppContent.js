import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Spinner from "react-native-loading-spinner-overlay";

import BottomTabNavigator from './navigation/BottomTabNavigator';
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { appContextStore } from "./stores/appContextStore";
import Colors from "./constants/Colors";

const Stack = createStackNavigator();

export default function AppContent({ containerRef, initialNavigationState}) {

  const { state } = React.useContext(appContextStore);

  return (
    <>
      <Spinner
        visible={state.spinning}
        color={Colors.primary}
        overlayColor={Colors.primaryFaded}
        textContent={'Loading...'}
      />

      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
        <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
          <Stack.Navigator headerMode="none">
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Register" component={RegisterScreen}/>
            <Stack.Screen name="Root" component={BottomTabNavigator}/>
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
