import React from 'react';
import { TextInput, View } from 'react-native';
import { styles } from './styles';

interface props {
  blankText: string,
  type?: fieldTypes,
}

export const TypingField: React.FC<props> = (props) => {
  return (
    <View style={styles.container}>
      <TextInput>{props.blankText}</TextInput>
    </View>
  );
};
