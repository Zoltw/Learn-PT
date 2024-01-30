
const SERVICE_URL = process.env.EXPO_PUBLIC_SERVER_URL;

export const sendUserLevel = async (goal: string, userId: string) => {
  try {
    const response = await fetch(`${SERVICE_URL}/v1/users/level/${userId}`, {
      method: 'PUT',
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
  } catch (error) {
    console.error('Error in sendUserLevel:', error);
    throw error;
  }
};


export const sendUserGoalLanguage = async (goalLanguage: string, userId: string) => {
  try {
    const response = await fetch(`${SERVICE_URL}/v1/users/goalLanguage/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ goalLanguage }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Send level failed');
    }

    return response.json();
  } catch (error) {
    console.error('Error in sendUserLevel:', error);
    throw error;
  }
};

export const sendUserLanguages = async (baseLanguage: string, userId: string) => {
  try {
    const response = await fetch(`${SERVICE_URL}/v1/users/baseLanguage/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ baseLanguage }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Send language failed');
    }
  } catch (error) {
    console.error('Error in sendUserLanguages:', error);
  }
};

export const fetchUserDetails = async (email: string, password: string) => {
  try {
    const response = await fetch(`${SERVICE_URL}/v1/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    return response.json();
  } catch (error) {
    console.error('Error in fetchUserDetails:', error);
    throw error;
  }
};

export const sendRegistrationUserDetails = async (email: string, password: string, baseLanguage: string, repeatPassword: string) => {
  try {
    if (password !== repeatPassword) {
      throw new Error('Passwords do not match');
    }

    const response = await fetch(`${SERVICE_URL}/v1/users/register`, {
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

    return response.json();
  } catch (error) {
    console.error('Error in sendRegistrationUserDetails:', error);
    throw error;
  }
};

export const fetchDashboardDetails = async (userId: string) => {
  try {
    const response = await fetch(`${SERVICE_URL}/v1/users/statistics/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  } catch (error) {
    console.error('Error in fetchDashboardDetails:', error);
    throw error;
  }
};

export const deleteUserAccount = async (userId: string) => {
  try {
    const response = await fetch(`${SERVICE_URL}/v1/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Delete account failed');
    }

    return response.json();
  } catch (error) {
    console.error('Error in deleteUserAccount:', error);
    throw error;
  }
};

export const sendWordsFromSession = async (userId: string, knownWords: Array<string>, unknownWords: Array<string>) => {
  try {
    const response = await fetch(`${SERVICE_URL}/v1/users/words/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ knownWords, unknownWords }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Send words failed');
    }

    return response.json();
  } catch (error) {
    console.error('Error in sendWordsFromSession:', error);
    throw error;
  }
};

