import { Text, TextInput, View } from 'react-native';
import { styles } from './styles';
import { Dispatch, SetStateAction } from 'react';

interface props {
  emailValue: string;
  passwordValue: string;
  repeatPasswordValue: string;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  setRepeatPassword: Dispatch<SetStateAction<string>>;
}

const Form: React.FC<props> = (props) => {
  return (
    <>
      <Text style={styles.header}>Register</Text>
      <TextInput
        style={styles.input}
        onChangeText={props.setEmail}
        value={props.emailValue}
        placeholder="jane@example.com"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        onChangeText={props.setPassword}
        value={props.passwordValue}
        placeholder="password"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        onChangeText={props.setRepeatPassword}
        value={props.repeatPasswordValue}
        placeholder="repeat password"
        secureTextEntry
      />
    </>
  );
};


export default Form;

