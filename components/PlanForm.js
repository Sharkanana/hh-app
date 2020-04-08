import * as React from "react";
import {Keyboard, TextInput, TouchableOpacity, View, StyleSheet} from "react-native";
import Button from "react-native-button";
import axios from 'axios';
import { debounce } from 'lodash';

import utils from '../helpers/utils';
import formStyles from "../styles/formStyles";
import Config from "../constants/Config";
import HH_Autocomplete from "./pieces/fields/Autocomplete";
import HH_Datepicker from "./pieces/fields/Datepicker";
import {userStore} from "../stores/userStore";
import HH_Text from "./pieces/Text";

/**
 * Form for new Plans
 */
export default function PlanForm({navigation, route}) {

  const { state } = React.useContext(userStore);
  const [errorMsg, updateErrorMsg] = React.useState('');
  const [data, updateData] = React.useState([]);
  const [query, updateQuery] = React.useState('');
  const [uuid, updateUuid] = React.useState(utils.uuidv4());
  const [plan, updatePlan] = React.useState({});

  const throttleFilterData = debounce(filterData, 200);

  return (
    <View style={formStyles.container}>

      <TextInput value={plan.name} placeholder="Plan Name" style={formStyles.textField} onChangeText={(text)=>{updatePlan({...plan, name: text})}} />

      <View style={formStyles.dateRangeContainer}>
        <HH_Datepicker
          style={{flex: 1}}
          date={plan.startDate}
          onDateChange={(date)=>updatePlan({...plan, startDate: date})}
          placeholder="Start Date"
        />
        <HH_Datepicker
          style={{flex: 1}}
          date={plan.endDate}
          onDateChange={(date)=>updatePlan({...plan, endDate: date})}
          placeholder="End Date"
        />
      </View>

      <HH_Autocomplete
        data={plan.place_id ? [] : data}
        defaultValue={query}
        onChangeText={(text) => throttleFilterData(text)}
        placeholder="Enter location"
        renderItem={({ item, i }) => (
          <TouchableOpacity onPress={() => selectLocation(item)}>
            <HH_Text style={styles.itemText}>{item.description}</HH_Text>
          </TouchableOpacity>
        )}
      />

      {errorMsg.length > 0 && <HH_Text style={formStyles.errorDiv}>{errorMsg}</HH_Text>}

      <View style={formStyles.buttonDiv}>
        <Button disabledContainerStyle={styles.disabledBtn} disabled={!validateForm()} style={formStyles.formBtn} containerStyle={formStyles.formBtnContainer} onPress={createPlan}>Create Plan</Button>
      </View>
    </View>
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
    updatePlan({
      ...plan,
      place_id: item.place_id
    });
    Keyboard.dismiss();
  }

  // true if form is valid
  function validateForm() {
    return !!plan.place_id;
  }

  function createPlan() {

    updateErrorMsg('');

    axios.post('api/createPlan', {plan: {...plan, user: state.id}})
      .then(function (result) {

        navigation.navigate('PlanOverview', { plan: result.data });

      })
      .catch(function(err) {
        updateErrorMsg("Server error.");
      });
  }

}

const styles = StyleSheet.create({
  disabledBtn: {
    backgroundColor: 'gray'
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