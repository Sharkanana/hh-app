import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import deviceStorage from "./services/deviceStorage";

import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import userContext from "./contexts/userContext";
import axios from 'axios';

const Stack = createStackNavigator();


export default function App(props) {

  let currentUser = React.useContext(userContext);

  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState(null);
  const [jwt, setJWT] = React.useState(null);

  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        });

        // Setup axios
        axios.defaults.baseURL = 'https://hungryhelper-server.herokuapp.com/';
        // axios.defaults.baseURL = 'http://192.168.50.205:8000/';

        // Check for login
        await deviceStorage.loadJWT(setJWT);

      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <>
        {
          currentUser ?
            <View style={styles.container}>
              {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
              <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
                <Stack.Navigator>
                  <Stack.Screen name="Root" component={BottomTabNavigator}/>
                </Stack.Navigator>
              </NavigationContainer>
            </View>
            :
            <NavigationContainer>
              <Stack.Navigator headerMode="none">
                <Stack.Screen name="Login" component={LoginScreen}/>
                <Stack.Screen name="Register" component={RegisterScreen}/>
              </Stack.Navigator>
            </NavigationContainer>
        }
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
    marginTop: 100
  },
});
