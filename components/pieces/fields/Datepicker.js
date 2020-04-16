import React from 'react'
import {View, Text, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';

import Touchable from "../Touchable";
import Colors from "../../../constants/Colors";

/**
 * Datepicker component
 *
 * value, onChange, placeholder, minDate, maxDate, style
 */
export default function HH_Datepicker(props) {

  // update value if prop value changed
  React.useEffect(function() {
    updateValue(props.value);
  }, [props.value]);

  const [showDate, updateShowDate] = React.useState(false);
  const [value, updateValue] = React.useState(props.value);

  return (
    <View style={{...styles.containerStyle, ...props.style}}>
      <Touchable onPress={()=>updateShowDate(true)}>
        <Text style={[styles.touchStyle, !value ? styles.placeholderStyle : {}]}>{value ? Moment(value).format('MMM Do, YYYY (ddd)') : props.placeholder || 'Select Date'}</Text>
      </Touchable>
      {showDate && (
        <DateTimePicker
          mode="date"
          value={value || props.minDate || new Date()}
          minimumDate={props.minDate || new Date()}
          maximumDate={props.maxDate}
          onChange={onChange}
        />
      )}
    </View>
  );

  function onChange(evt, date) {

    //don't update anything on cancel
    if(evt.type === 'dismissed') {
      updateShowDate(false);
      return;
    }

    updateShowDate(false);
    updateValue(date);
    props.onChange && props.onChange(date);
  }

}

const styles = StyleSheet.create({
  containerStyle: {
    borderWidth: 1,
    borderColor: Colors.grayBorder,
    height: 40,
    backgroundColor: 'white'
  },
  touchStyle: {
    padding: 4,
    paddingTop: 8
  },
  placeholderStyle: {
    color: Colors.grayBorder
  }
});