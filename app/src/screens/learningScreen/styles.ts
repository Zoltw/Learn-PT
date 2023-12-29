import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cont2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  grid: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    borderColor: '#ddd',
  },
  text: {
    marginBottom: 50,
    fontSize: 32,
    fontWeight: 'bold',
  },
});
