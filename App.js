import * as React from 'react';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

import useLinking from './navigation/useLinking';
import { AppContextProvider } from "./stores/appContextStore";
import AppContent from "./AppContent";

export default function App(props) {

  // Included bootstrapping
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState(null);
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
          'roboto': require('./assets/fonts/Roboto-Regular.ttf'),
          'montserrat': require('./assets/fonts/Montserrat-Regular.ttf'),
        });

        // Setup axios
        // axios.defaults.baseURL = 'https://hungryhelper-server.herokuapp.com/';
        axios.defaults.baseURL = 'http://192.168.50.205:8000/';

      } catch (e) {
        //fine!
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
      <AppContextProvider>
        <AppContent
          containerRef={containerRef}
          initialNavigationState={initialNavigationState}
        />
      </AppContextProvider>
    );
  }
}