// Form.js
import React from 'react';
import { Text, TextInput } from 'react-native';
import useTranslations from '../../hooks/useTranslations';
import { formTypes, inputTypes } from './types';
import { styles } from './styles';

interface Props {
  emailValue: string;
  passwordValue: string;
  repeatPasswordValue?: string;
  onFieldChange: (field: string, value: string) => void;
  errors: { [key: string]: string };
  type: formTypes;
}

const Form: React.FC<Props> = ({ emailValue, passwordValue, repeatPasswordValue, onFieldChange, errors, type }) => {
  const { translate } = useTranslations();

  const renderInputField = (field: string, placeholder: string, secureTextEntry = false) => (
    <TextInput
      style={styles.input}
      onChangeText={(value) => onFieldChange(field, value)}
      value={field === inputTypes.EMAIL ? emailValue : field === inputTypes.PASSWORD ? passwordValue : repeatPasswordValue}
      placeholder={translate(placeholder)}
      secureTextEntry={secureTextEntry}
    />
  );

  return (
    <>
      <Text style={styles.header}>{type === formTypes.REGISTER ? translate('Register') : translate('Sign in')}</Text>
      {renderInputField(inputTypes.EMAIL, translate('email address'))}
      {renderInputField(inputTypes.PASSWORD, translate('password'), true)}
      {type === formTypes.REGISTER && renderInputField(inputTypes.REPEAT_PASSWORD, translate('repeat password'), true)}
      {Object.keys(errors).map((key) => (
        errors[key] ? <Text key={key} style={styles.errorText}>{errors[key]}</Text> : null
      ))}
    </>
  );
};

export default Form;
