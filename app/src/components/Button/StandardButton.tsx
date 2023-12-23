import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style';

interface Props {
  text: string;
  blackButton: boolean;
  onPressFunction: () => void;
}

export const StandardButton: React.FC<Props> = ({ text, blackButton, onPressFunction }) => {
  const buttonStyle = [styles.button, blackButton ? styles.buttonBlack : styles.buttonDefault];
  const textStyle = [styles.buttonText, blackButton ? styles.buttonBlackText : styles.buttonDefaultText];

  return (
    <View>
      <TouchableOpacity style={buttonStyle} onPress={onPressFunction}>
        <Text style={textStyle}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};
