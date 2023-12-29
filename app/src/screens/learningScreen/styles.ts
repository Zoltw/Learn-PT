import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flexGrow: 1, // This ensures that the container takes up the full height if the content is not enough
    justifyContent: 'center', // Vertically center the content
    alignItems: 'center', // Horizontally center the content
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
  },
});
