import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    width: 50,
  },
  button: {
    padding: 15,
    borderRadius: 5,
    borderWidth: 2,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonBlack: {
    backgroundColor: '#fff',
    borderColor: '#000',
  },
  buttonBlackText: {
    color: '#000',
  },
  buttonDefault: {
    backgroundColor: '#000',
  },
  buttonDefaultText: {
    color: '#fff',
  },
});
