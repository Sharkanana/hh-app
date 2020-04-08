import React from 'react';
import { Text } from 'react-native';

/**
 * Defaults for Text component
 */
export default function HH_Text(props) {

  return (
    <Text
      style={{
        fontFamily: 'sans-serif'
      }}
      {...props}
    />
  );

}