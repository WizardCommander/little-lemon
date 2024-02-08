import { StyleSheet, Text, View, Image, TextInput, Pressable, TouchableOpacity } from "react-native";
import { useState, useEffect, useLayoutEffect } from "react";
import Logo from '../assets/Logo.png'
import Splash from '../assets/splash.png'
import * as Font from 'expo-font';
import {NavigationContatiner} from '@react-navigation/native'
import React from "react";

export default function ProfileScreen({route, navigation}) {

    useLayoutEffect(() => {
        navigation.setOptions({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text>Back</Text>
            </TouchableOpacity>
          ),
        });
      }, [navigation]);
      

    const {firstName, email} = route.params

    return (
        <View style={styles.container}>
             <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Text style={styles.backButton}>Back</Text>
              </TouchableOpacity>

            <View style={styles.headerContainer}>
                <Image style={styles.headerImage} source={Logo} />
             </View>

            <View style={styles.container}>
                <TextInput style={styles.input} placeholder="First Name" />
                <TextInput style={styles.input} placeholder="Email" />
                <TextInput style={styles.input} placeholder="Phone" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'fff',
        justifyContent: 'center',
    },
    headerContainer: {
        width: '100%', // Take up the full width of the screen
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 20, // Optional: add padding at the top for some space
        paddingBottom: 10,
    },
    input: {
        height: 40,
        width: 300,
        marginVertical: 20,
        marginLeft: 30,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    headerImage: {
        marginTop: 20,
        width: 200,
        height: 50,
        resizeMode: 'contain',
    },
    splashImage: {
        
    },
    backButton: {
        marginTop: 20,
        marginLeft: 10,
        fontSize: 16,
      },
});