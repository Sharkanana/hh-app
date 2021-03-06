import * as React from 'react';
import { StyleSheet, View, FlatList, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axios from "axios";
import Emoji from 'react-native-emoji';

import {appContextStore} from "../stores/appContextStore";
import colors from '../constants/Colors';
import Touchable from "./pieces/Touchable";
import formStyles from "../styles/formStyles";
import HH_Text from "./pieces/Text";

/**
 * View for list of a plans
 */
export default function PlanList({ navigation }) {

  const [ plans, updatePlans ] = React.useState([]);

  const { state, dispatch } = React.useContext(appContextStore);
  const user = state.user;

  useFocusEffect(React.useCallback(() => {
      //load plans on focus
      loadPlans();

      // nothing on unfocus
      return () => {};
    }, [])
  );

  function PlanDisplay({plan}) {
    return (
      <View style={localStyles.planContainer}>
        <Touchable onPress={()=>loadPlan(plan.id)}>
          <View style={localStyles.planInfo}>
            <HH_Text style={{fontWeight: 'bold'}}>
              {plan.name}
            </HH_Text>
            <HH_Text>
              {plan.location}
            </HH_Text>
            <HH_Text>
              {plan.startDate} to {plan.endDate}
            </HH_Text>
          </View>
        </Touchable>
        <Touchable onPress={()=>deletePlan(plan.id)}>
          <Emoji name="wastebasket" style={localStyles.closeButton} />
        </Touchable>
      </View>
    );
  }

  return (
    <View>

      <HH_Text style={formStyles.title}>
        My Plans
      </HH_Text>

    <FlatList
      data={plans}
      keyExtractor={item => `${item.id}_${item.name}`}
      renderItem={({item}) => <PlanDisplay plan={item}/>}
    />
    </View>
  );

  function loadPlan(planId) {
    navigation.navigate('PlanOverview', { plan: planId } );
  }

  function deletePlan(planId) {

    Alert.alert('Delete plan?',
      'Are you sure you wish to delete this plan?',
      [
        { text: 'Cancel' },
        { text: 'Yes', onPress: ()=> {
            axios.post('api/deletePlan', {planId})
              .then(function(result) {
                if(result.data) {
                  Alert.alert('Plan successfully deleted.');
                  loadPlans()
                }
                else {
                  Alert.alert('Error deleting plan.');
                }
              })
              .catch(function(err) {
                Alert.alert('Error deleting plan.');
              });
          }}
      ]);
  }

  async function loadPlans() {

    dispatch({type: 'spin-on'});

    const results = await axios.post('api/loadPlans', {
      user: user.id
    });

    updatePlans(results.data);

    dispatch({type: 'spin-off'});
  }
}

const localStyles = StyleSheet.create({
  mealContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  spotText: {
    fontSize: 14,
    height: 80,
    borderColor: 'black',
    borderWidth: 1,
    padding: 5
  },
  planContainer: {
    borderWidth: 2,
    borderColor: colors.secondary,
    borderRadius: 4,
    margin: 2,
    padding: 3,
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  planInfo: {
    flex: 1
  },
  closeButton: {
    fontSize: 30,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: 5,
    color: 'red'
  }
});