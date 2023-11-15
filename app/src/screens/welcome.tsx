import { StyleSheet, Text, View } from 'react-native';
import { useChatGPT } from '../hooks/useChatGPT';


const Welcome: React.FC = () => {
  const gpt = useChatGPT();
  console.log(gpt);
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Welcome;
