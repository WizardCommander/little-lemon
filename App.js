import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/Onboarding';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './screens/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import SplashScreen from './screens/SplashScreen';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';


const Stack = createNativeStackNavigator();

export default function App() {
  const [userToken, setUserToken] = useState(null);
  const [isReady, setIsReady] = useState(false);


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
    async function initializeApp() {
      let token;
      try {
        // Load fonts and retrieve user token in parallel
        const fontPromise = Font.loadAsync({
          'MarkaziText-Regular': require('./assets/MarkaziText-Regular.ttf'),
        });
        const tokenPromise = AsyncStorage.getItem('userToken');
        await Promise.all([fontPromise, tokenPromise]);

        // Set the user token if it exists
        token = await tokenPromise;
      } catch (e) {
        console.error('Error loading app resources:', e);
      }
      setUserToken(token);
      setIsReady(true);
    }

    initializeApp();
  }, []);

  if (!isReady) {
    
    return <AppLoading />
  }

  const isSignedIn = userToken !== null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isSignedIn ? (
          <Stack.Screen name="Profile" component={ProfileScreen} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
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
