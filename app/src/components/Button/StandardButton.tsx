import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style';

interface props {
  text: string,
  blackButton: boolean,
  onPressFunction: () => void,
}

export const StandardButton: React.FC<props> = (props) => {
  const buttonRegisterStyle = props.blackButton ? styles.buttonBlack : styles.button;
  const buttonTextStyle = props.blackButton ? styles.buttonBlackText : styles.buttonText;

  return (
    <View>
      <TouchableOpacity style={buttonRegisterStyle} onPress={props.onPressFunction}>
        <Text style={buttonTextStyle}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  );
};
