import * as React from 'react';
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axios from "axios";
import Emoji from 'react-native-emoji';

import {userStore} from "../stores/userStore";
import colors from '../constants/Colors';
import Touchable from "./Touchable";
import formStyles from "../styles/formStyles";

/**
 * View for list of a plans
 */
export default function PlanList({ navigation }) {

  const [ plans, updatePlans ] = React.useState([]);
  const { state } = React.useContext(userStore);

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
            <Text style={{fontWeight: 'bold'}}>
              {plan.name}
            </Text>
            <Text>
              {plan.location}
            </Text>
            <Text>
              {plan.startDate} to {plan.endDate}
            </Text>
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

      <Text style={formStyles.title}>
        My Plans
      </Text>

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

    const results = await axios.post('api/loadPlans', {
      user: state.id
    });

    updatePlans(results.data);
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