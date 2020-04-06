import * as React from 'react';
import { StyleSheet, Text, View, FlatList, Image, Platform } from 'react-native';
import formStyles from "../styles/formStyles";
import Colors from "../constants/Colors";
import axios from 'axios';
import images from "../assets/images/images";

/**
 * View for overview of a plan
 */
export default function PlanOverview({ route }) {

  React.useEffect(() => {
    if (route.params && route.params.plan) {
      loadPlan(route.params.plan);
    }
  }, [route.params]);

  const [plan, updatePlan] = React.useState();

  return (
    <>

      {
        plan &&
        <>
          <Text style={formStyles.title}>
            {plan.name} - {plan.location}
          </Text>

          <View style={styles.container}>

            <FlatList
              data={plan.days}
              keyExtractor={item => `day_${item.date}`}
              renderItem={({item}) => <DayView day={item}/>}
            />

          </View>
        </>
      }
    </>
  );

  function DayView({day}) {

    return (
      <View style={styles.dayContainer}>
        <Text style={styles.dateTab}>{day.date}</Text>
        <MealView title="Breakfast" data={day.b}/>
        <MealView title="Lunch" data={day.l}/>
        <MealView title="Dinner" data={day.d}/>
      </View>
    );
  }

  function MealView({title, data}) {

    return (
      <View style={styles.mealContainer}>
        <Text style={styles.mealTitle}>
          {title}
        </Text>

        <Text style={styles.nameDisplay}>
          {data.name}
        </Text>
        <Text>
          {data.categories}
        </Text>

        <View style={styles.ratingRow}>
          <Image style={styles.ratingImage} source={images.ratings[Platform.OS === 'ios' ? 'web_and_ios' : 'android'][data.rating]}/>
          <Text style={styles.ratingCount}>{data.review_count} reviews</Text>
        </View>

      </View>
    );
  }

  async function loadPlan(planId) {

    const plan = await axios.post('api/loadPlan', {
      planId: planId
    });

    updatePlan(plan.data);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
    paddingBottom: 0
  },
  dayContainer: {
    marginBottom: 5
  },
  dateTab: {
    backgroundColor: 'white',
    width: 100,
    padding: 3,
    borderColor: Colors.grayBorder,
    borderWidth: 1,
    borderRadius: 5,
    borderBottomWidth: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  nameDisplay: {
    fontWeight: 'bold'
  },
  planTitle: {
    padding: 5,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: Colors.secondary
  },
  ratingRow: {
    flexDirection: 'row'
  },
  ratingImage: {
    height: 30,
    width: 150,
    resizeMode: 'contain',
  },
  ratingCount: {
    paddingLeft: 10,
    paddingTop: 4
  },
  mealContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 3,
    borderColor: Colors.grayBorder,
    borderWidth: 1,
    borderRadius: 5
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.secondary,
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