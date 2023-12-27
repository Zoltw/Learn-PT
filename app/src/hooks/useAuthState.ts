import { useCallback, useEffect, useRef, useState } from 'react';
import { formTypes } from '../components/Form/types';

const useAuthState = (
  type: formTypes,
  performAction: (email: string, password: string, repeatPassword?: string) => Promise<Response>,
  onNavigate: () => void,
  errors: { [key: string]: string },
) => {
  const isMounted = useRef<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');

  const isFormFilled = email && password && Object.values(errors).every((error) => error === '') && (type === formTypes.REGISTER ? repeatPassword : true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleSubmit = useCallback(async () => {
    if (isFormFilled && isMounted.current) {
      try {
        await performAction(email, password, repeatPassword).then((response) => {
          if (response.ok) {
            onNavigate();
          }
        }).catch((error) => {
          console.error(error);
        });
      } catch {}
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
