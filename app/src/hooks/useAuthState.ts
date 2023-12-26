import { useCallback, useEffect, useRef, useState } from 'react';
import { formTypes } from '../components/Form/formTypes';

const useAuthState = (
  type: formTypes,
  performAction: (email: string, password: string, repeatPassword?: string) => Promise<void>,
  onNavigate: () => void,
) => {
  const isMounted = useRef<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');

  const isFormFilled = email && password && (type === formTypes.REGISTER ? repeatPassword : true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleSubmit = useCallback(async () => {
    if (isFormFilled && isMounted.current) {
      try {
        await performAction(email, password, repeatPassword);
        onNavigate();
      } catch (error) {
        console.error(error);
      }
    }
  }, [email, password, repeatPassword, isFormFilled, onNavigate, performAction]);

  return {
    email,
    setEmail,
    password,
    setPassword,
    repeatPassword,
    setRepeatPassword,
    isFormFilled,
    handleSubmit,
  };
};

export default useAuthState;
