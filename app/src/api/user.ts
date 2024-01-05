export const sendUserLevel = async (goal: string, userId: string) => {
  const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/v1/users/level/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ goal }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Send level failed');
  }

  return response.json();
};

export const sendUserLanguages = async (baseLanguage: string, userId: string) => {
  const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/v1/users/baseLanguage/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ baseLanguage }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Send language failed');
  }

  return response.json();
};


export const fetchUserDetails = async (email: string, password: string) => {
  const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/v1/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }

  return response.json();
};

export const sendRegistrationUserDetails = async (email: string, password: string, baseLanguage: string, repeatPassword: string) => {
  if (password !== repeatPassword) {
    console.error('Passwords do not match');
    return;
  }

  const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/v1/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, baseLanguage, passwordConfirmation: repeatPassword }),
  });

  if (!response.ok) {
    const responseData = await response.json();
    throw new Error(responseData.message || 'Registration failed');
  }
};

export const fetchDashboardDetails = async (userId: string) => {
  const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/v1/users/statistics/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const deleteUserAccount = async (userId: string) => {
  const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/v1/users/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Send level failed');
  }
  return response.json();
};

export const sendWordsFromSession = async (userId: string, knownWords: Array<string>, unknownWords: Array<string>) => {
  const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/v1/users/words/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ knownWords, unknownWords }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Send level failed');
  }
  return response.json();
};
