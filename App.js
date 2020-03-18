import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';

import deviceStorage from "./services/deviceStorage";
import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

const Stack = createStackNavigator();

export default function App(props) {

  // Included bootstrapping
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState(null);
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  const [currentUser, updateUser] = React.useState({});

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
        // axios.defaults.baseURL = 'https://hungryhelper-server.herokuapp.com/';
        axios.defaults.baseURL = 'http://192.168.50.205:8000/';

        // Check for user
        const userObj = await deviceStorage.loadUser();

        // set auth
        axios.defaults.Authorization = userObj.jwt;

        // test our session
        await axios.get('/api/test');

        // success? set the user state, allowing app access
        updateUser(userObj.user);

      } catch (e) {
        //that's fine...expected...user just isn't logged in, or their token is expired.
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
          currentUser.id ?
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
                <Stack.Screen name="Login">
                  {props => <LoginScreen {...props} updateUser={updateUser}/>}
                </Stack.Screen>
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
