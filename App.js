import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/Onboarding';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './screens/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';


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
          'Karla-Regular': require('./assets/Karla-Regular.ttf'),
        });
        const tokenPromise = AsyncStorage.getItem('userToken');
        const [, tokenResult] = await Promise.all([fontPromise, tokenPromise]);

        token = tokenResult;
      } catch (e) {
        console.error('Error loading app resources:', e);
      }
      setUserToken(token);
      setIsReady(true);
    }

    initializeApp();
  }, []);

  if (!isReady) {
    return null;
  }


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={userToken ? "Profile" : "Login"}>
        <Stack.Screen name='Login' component={LoginScreen} options={{headerShown: false}} />
        <Stack.Screen name='Profile' component={ProfileScreen} options={{headerShown: false}}/>
       <Stack.Screen name= 'Home' component={HomeScreen} />
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
