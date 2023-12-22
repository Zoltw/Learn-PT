import { Text, TextInput } from 'react-native';
import { styles } from './styles';
import { Dispatch, SetStateAction } from 'react';
import { useTranslations } from '../../../../localization/useTranslations';
import { formTypes } from './formTypes';

interface props {
  emailValue: string;
  passwordValue: string;
  repeatPasswordValue?: string;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  setRepeatPassword?: Dispatch<SetStateAction<string>>;
  type: formTypes;
}

const Form: React.FC<props> = (props) => {
  const { translate } = useTranslations();

  return (
    <>
      <Text style={styles.header}>{ props.type === formTypes.REGISTER ? translate('Register') : translate('Sign in')}</Text>
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
        placeholder={translate('password')}
        secureTextEntry
      />
      { props.type === formTypes.REGISTER && (
        <TextInput
          style={styles.input}
          onChangeText={props.setRepeatPassword}
          value={props.repeatPasswordValue}
          placeholder={translate('repeat password')}
          secureTextEntry
        />
      )}
    </>
  );
};


export default Form;

