import { useCallback, useEffect, useRef, useState } from 'react';
import { formTypes } from '../components/Form/types';
import i18n from '../localization/i18n';

const useAuthState = (
  type: formTypes,
  performAction: (email: string, password: string, baseLanguage?: string, repeatPassword?: string) => Promise<void>,
  errors: { [key: string]: string },
) => {
  const isMounted = useRef<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [baseLanguage, setBaseLanguage] = useState<string>(i18n.language);

  const isFormFilled = email && password && Object.values(errors).every((error) => error === '') && (type === formTypes.REGISTER ? repeatPassword : true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleSubmit = useCallback(async () => {
    if (isFormFilled && isMounted.current) {
      try {
        await performAction(email, password, baseLanguage, repeatPassword);
      } catch (error) {
        console.error(error);
      }
    }
  }, [isFormFilled, performAction, email, password, baseLanguage, repeatPassword]);

  return {
    email,
    setEmail,
    password,
    setPassword,
    baseLanguage,
    setBaseLanguage,
    repeatPassword,
    setRepeatPassword,
    isFormFilled,
    handleSubmit,
  };
};

export default useAuthState;
