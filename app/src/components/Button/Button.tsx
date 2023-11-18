import React from 'react';
import { GestureResponderEvent, Text, TouchableHighlight, View } from 'react-native';
import { styles } from './style';

interface props {
  text: string,
  onPressFunction: () => void
}

export const Button: React.FC<props> = (props) => {
  return (
    <View>
      <TouchableHighlight style={styles.container} onPress={props.onPressFunction}>
        <Text style={styles.text}>{props.text}</Text>
      </TouchableHighlight>
    </View>
  );
};
