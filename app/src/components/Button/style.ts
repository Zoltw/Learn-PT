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
  learnButton: {
    width: 150,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonBlack: {
    backgroundColor: '#000',
    borderColor: '#fff',
  },
  buttonBlackText: {
    color: '#fff',
  },
  buttonDefault: {
    backgroundColor: '#fff',
  },
  buttonDefaultText: {
    color: '#000',
  },
});
