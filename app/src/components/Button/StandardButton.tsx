import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { styles } from './style';

interface props {
  text: string,
  onPressFunction: () => void
}

export const StandardButton: React.FC<props> = (props) => {
  return (
    <View>
      <TouchableHighlight style={styles.container} onPress={props.onPressFunction}>
        <Text style={styles.text}>{props.text}</Text>
      </TouchableHighlight>
    </View>
  );
};
