import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/Onboarding';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './screens/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import SplashScreen from './screens/SplashScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const storeUserAuthentication = async(userToken) => {
    try {
      await AsyncStorage.setItem('userToken', userToken);
    } catch (error) {
      
      return null;
    }
  }
  
  const retrieveUserToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      return userToken;
    } catch (error) {
  
      return null;
    }
  }

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const token = await retrieveUserToken();
        setUserToken(token);
      } catch (e) {
          console.error('Error during token retrieval:', e);
      }
      setIsLoading(false);
    };
    bootstrapAsync();
  }, []);

  if (isLoading) {
    
    return <SplashScreen />
  }

  const isSignedIn = userToken !== null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isSignedIn ? (
          <>
          <Stack.Screen name="Profile" component={ProfileScreen}/>
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen}/>
        )}
      </Stack.Navigator>
    </NavigationContainer>
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
