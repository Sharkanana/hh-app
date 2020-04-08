import * as React from 'react';
import {Platform, TouchableOpacity, TouchableNativeFeedback } from "react-native";

/**
 * Simple helper component to switch between proper touchables
 */
export default function Touchable(props) {

  return (
    <>
      {Platform.OS === 'ios' ?
        <TouchableOpacity {...props}/> :
        <TouchableNativeFeedback {...props}/>}
    </>
  );
}
