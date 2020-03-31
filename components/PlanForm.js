import * as React from "react";
import Autocomplete from "react-native-autocomplete-input";
import {Keyboard, Text, TouchableOpacity, View, StyleSheet} from "react-native";
import Button from "react-native-button";
import axios from 'axios';
import { debounce } from 'lodash';

import utils from '../helpers/utils';
import formStyles from "../styles/formStyles";
import Config from "../constants/Config";

/**
 * Form for new Plans
 */
export default function PlanForm({navigation, route}) {

  const [errorMsg, updateErrorMsg] = React.useState('');
  const [data, updateData] = React.useState([]);
  const [query, updateQuery] = React.useState('');
  const [uuid, updateUuid] = React.useState(utils.uuidv4());
  const [location, updateLocation] = React.useState();

  const throttleFilterData = debounce(filterData, 200);

  return (
    <>

      <View style={styles.container}>
        <Autocomplete
          data={location ? [] : data}
          defaultValue={query}
          onChangeText={(text) => throttleFilterData(text)}
          containerStyle={styles.autocompleteContainer}
          placeholder="Enter location"
          renderItem={({ item, i }) => (
            <TouchableOpacity onPress={() => selectLocation(item)}>
              <Text style={styles.itemText}>{item.description}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {errorMsg.length > 0 && <Text style={formStyles.errorDiv}>{errorMsg}</Text>}

      <View style={formStyles.buttonDiv}>
        <Button disabledContainerStyle={styles.disabledBtn} disabled={!validateForm()} style={formStyles.formBtn} containerStyle={formStyles.formBtnContainer} onPress={initPlan}>Create Plan</Button>
      </View>
    </>
  );

  // autocomplete lookup function
  async function filterData(query) {

    if(!query) {
      return [];
    }

    const results = await axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json', {
      params: {
        input: query,
        key: Config.googleApiKey,
        sessiontoken: uuid,
        types: 'geocode'
      }
    });

    updateData(results.data.predictions);
  }

  // invoked when location is selected
  function selectLocation(item) {
    updateUuid(utils.uuidv4);
    updateQuery(item.description);
    updateLocation(item.place_id);
    Keyboard.dismiss();
  }

  // true if form is valid
  function validateForm() {
    return !!location;
  }

  function initPlan() {

    axios.post('api/createPlan', { place_id: location })
      .then(function (result) {

        navigation.navigate('PlanOverview', { plan: result.data });

      });
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 25
  },
  disabledBtn: {
    backgroundColor: 'gray'
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1
  },
  itemText: {
    fontSize: 15,
    margin: 2
  },
  descriptionContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    backgroundColor: '#F5FCFF',
    marginTop: 25
  },
  infoText: {
    textAlign: 'center'
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center'
  },
  directorText: {
    color: 'grey',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center'
  },
  openingText: {
    textAlign: 'center'
  }
});