import * as React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import formStyles from "../styles/formStyles";

/**
 * View for overview of a plan
 */
export default function PlanOverview({ route }) {

  React.useEffect(() => {
    if (route.params && route.params.plan) {
      updatePlan(route.params.plan);
    }
  }, [route.params]);

  const [plan, updatePlan] = React.useState();

  return (
    <>

      {
        plan &&
        <>
          <Text>
            Location: {plan.location}
          </Text>

          <View style={formStyles.container}>

            <MealView title="Breakfast" data={plan.b}/>
          <MealView title="Lunch" data={plan.l}/>
          <MealView title="Dinner" data={plan.d}/>

          </View>
        </>
      }
    </>
  );

  function MealView({title, data}) {

    return (
      <View style={localStyles.mealContainer}>
        <Text style={localStyles.mealTitle}>
          {title}
        </Text>

        <FlatList
          data={data}
          keyExtractor={item => `${title}_${item.name}`}
          renderItem={({item}) => <Text style={localStyles.spotText} title={item.name}>{item.name}</Text>}
        />

      </View>
    );

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