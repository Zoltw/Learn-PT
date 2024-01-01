import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  languagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  languageItem: {
    margin: 8,
    width: 150,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  selectedLanguageItem: {
    borderColor: 'red',
  },
  selectedText: {
    fontWeight: 'bold',
    color: 'red',
    fontSize: 13,
  },
  text: {
    fontSize: 13,
  },
});
