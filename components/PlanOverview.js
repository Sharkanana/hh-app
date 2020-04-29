import * as React from 'react';
import { StyleSheet, View, FlatList, Image, Platform, Linking } from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import axios from 'axios';

import formStyles from "../styles/formStyles";
import Colors from "../constants/Colors";
import images from "../assets/images/images";
import Touchable from "./pieces/Touchable";
import HH_Text from "./pieces/Text";
import { appContextStore } from "../stores/appContextStore";

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
  const { dispatch } = React.useContext(appContextStore);

  return (
    <>

      {
        plan &&
        <>
          <HH_Text style={formStyles.title}>
            {plan.name}
          </HH_Text>

          <HH_Text style={formStyles.subTitle}>
            Location: {plan.location}
          </HH_Text>

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
        <HH_Text style={styles.dateTab}>{day.date}</HH_Text>
        <MealView title="Breakfast" data={day.b} date={day.date}/>
        <MealView title="Lunch" data={day.l} date={day.date}/>
        <MealView title="Dinner" data={day.d} date={day.date}/>
      </View>
    );
  }

  function MealView({title, data, date}) {

    return (
      <View style={styles.mealContainer}>
        <HH_Text style={styles.mealTitle}>
          {title}
        </HH_Text>

        <View style={styles.mealContent}>

          <View style={styles.mealInfo}>

            <HH_Text style={styles.nameDisplay}>
              {data.name}
            </HH_Text>

            <View style={styles.priceAndCat}>
              <HH_Text style={styles.priceDisplay}>
                {data.price} ·
              </HH_Text>
              <HH_Text>
                 {data.categories}
              </HH_Text>
            </View>

            <View style={styles.ratingRow}>
              <Image style={styles.ratingImage} source={images.ratings[Platform.OS === 'ios' ? 'web_and_ios' : 'android'][data.rating]}/>
              <HH_Text style={styles.ratingCount}>{data.review_count} reviews</HH_Text>
            </View>

          </View>
          <View style={styles.mealActions}>
            <Touchable onPress={()=>Linking.openURL(data.url)}>
              <Image
                source={images.yelp_logo}
                style={styles.yelpIcon}
              />
            </Touchable>
            <Touchable onPress={()=>newSuggestion(date, title)}>
              <Ionicons
                name='md-close-circle'
                size={30}
                color={Colors.errorRed}
              />
            </Touchable>
          </View>

        </View>

      </View>
    );
  }

  async function newSuggestion(date, meal) {

    dispatch({type: 'spin-on'});

    const result = await axios.post('api/newSuggestion', {
      id: plan._id,
      date,
      meal
    });

    // copy days, but update the date/meal in question
    const updatedDays = plan.days.map(function(day) {
      if(day.date === date) {
        day[meal.charAt(0).toLowerCase()] = result.data;
        return day;
      }

      return day;
    });

    // update plan state
    updatePlan({
      ...plan,
      days: updatedDays
    });

    dispatch({type: 'spin-off'});
  }

  async function loadPlan(planId) {

    dispatch({type: 'spin-on'});

    const plan = await axios.post('api/loadPlan', {
      planId: planId
    });

    updatePlan(plan.data);

    dispatch({type: 'spin-off'});
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
    width: 145,
    padding: 3,
    borderColor: Colors.grayBorder,
    borderWidth: 1,
    borderRadius: 5,
    borderBottomWidth: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  priceAndCat: {
    display: 'flex',
    flexDirection: 'row'
  },
  priceDisplay: {
    color: Colors.moneyGreen,
    paddingRight: 5
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
    height: 25,
    width: 130,
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
  yelpIcon: {
    marginLeft: 20,
    height: 30,
    width: 80,
    marginRight: 10,
    resizeMode: 'contain',
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.secondary,
    textAlign: 'center'
  },
  mealContent: {
    flexDirection: 'row'
  },
  mealInfo: {
    flex: 1
  },
  mealActions: {
    paddingTop: 10,
    width: 150,
    flexDirection: 'row'
  },
  spotText: {
    fontSize: 14,
    height: 80,
    borderColor: 'black',
    borderWidth: 1,
    padding: 5
  }
});