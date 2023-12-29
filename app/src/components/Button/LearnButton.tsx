import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style';

interface Props {
  text: string;
  onPressFunction: () => void;
}

export const LearnButton: React.FC<Props> = ({ text, onPressFunction }) => {
  return (
    <View>
      <TouchableOpacity style={[styles.button, styles.learnButton]} onPress={onPressFunction}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};
