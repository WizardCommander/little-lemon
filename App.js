import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import loginScreen from './screens/Onboarding';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <loginScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
