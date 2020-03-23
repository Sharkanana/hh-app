import { AsyncStorage } from 'react-native';

const deviceStorage = {

  async saveItem(key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log('AsyncStorage Save Error: ' + error.message);
    }
  },

  async loadUser() {
    try {

      const user = await AsyncStorage.getItem('hh_user');
      return JSON.parse(user);

    } catch (error) {
      console.log('AsyncStorage Load User Error: ' + error.message);
    }
  },

  async deleteUser() {
    try{
      await AsyncStorage.removeItem('hh_user');
    } catch (error) {
      console.log('AsyncStorage Delete User Error: ' + error.message);
    }
  },

};

export default deviceStorage;