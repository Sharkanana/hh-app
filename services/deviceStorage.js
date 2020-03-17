import { AsyncStorage } from 'react-native';

const deviceStorage = {

  async saveItem(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },

  async loadJWT(setJWT) {
    try {

      setJWT(await AsyncStorage.getItem('id_token'));
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },

  async deleteJWT(setJWT) {
    try{
      await AsyncStorage.removeItem('id_token');
      setJWT(null);
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },

};

export default deviceStorage;