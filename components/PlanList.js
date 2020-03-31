import * as React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

/**
 * View for list of a plans
 */
export default function PlanList({ navigation }) {

  const [ plans, updatePlans ] = React.useState([]);

  useFocusEffect(React.useCallback(() => {
      //load plans on focus
      loadPlans();

      // nothing on unfocus
      return () => {};
    }, [])
  );

  return (
    <>
      <FlatList
        data={plans}
        keyExtractor={item => `${item.id}_${item.name}`}
        renderItem={({item}) => <Text style={localStyles.spotText} title={item.name}>{item.name}</Text>}
      />
    </>
  );

  async function loadPlans() {

    // todo: lookup plans by user id

    updatePlans([
      {
        id: '125235623f3asd',
        name: 'Eurotrip 2020'
      },
      {
        id: '125235623f3asdffff',
        name: 'Miami 2021'
      }
    ]);

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
  }
});