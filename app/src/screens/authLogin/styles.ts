import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  button: {
    width: '100%',
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  loginPrompt: {
    fontSize: 16,
    color: '#000',
    marginTop: 15,
  },
  loginText: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
