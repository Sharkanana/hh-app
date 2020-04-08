import React from 'react'
import DatePicker from 'react-native-datepicker'

/**
 * Defaults for date picker
 *
 * must configure: date, onDateChange
 */
export default function HH_Datepicker(props) {

  return (
    <DatePicker
      style={{

      }}
      mode="date"
      placeholder="Select date"
      format="YYYY-MM-DD"
      minDate={new Date()}
      confirmBtnText="Confirm"
      cancelBtnText="Cancel"
      customStyles={{
        dateIcon: {
          position: 'absolute',
          left: 0,
          top: 4,
          marginLeft: 0
        },
        dateInput: {
          marginLeft: 36
        }
      }}
      {...props}
    />
  );

}