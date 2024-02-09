import { StyleSheet, Text, View, Image, TextInput, Pressable, TouchableOpacity } from "react-native";
import { useState, useEffect, useLayoutEffect } from "react";
import Logo from '../assets/Logo.png'
import Splash from '../assets/splash.png'
import * as Font from 'expo-font';
import {NavigationContatiner} from '@react-navigation/native'
import React from "react";
import Icon from 'react-native-vector-icons/MaterialIcons'
import * as ImagePicker from 'expo-image-picker'
import {MaterialIcons} from '@expo/vector-icons'

export default function ProfileScreen({route, navigation}) {

    const {firstName, email} = route.params
    const [profileImage, setProfileImage] = useState(null)
    
    

    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        aspect: [4,3],
      },
      console.log(result));

      if (!result.canceled) {
        setProfileImage(result.uri);
      }

    };

    return (
        <View style={styles.container}>

            <View style={styles.headerContainer}>
              <View style={styles.imageContainer}>
                <Image style={styles.headerImage} source={Logo} />
                </View>

              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Icon name="arrow-back" size={24} color="#495E57" />
              </TouchableOpacity>
             </View>

             <Text style={styles.headerText}>Personal Information</Text>
             <View style={styles.avatarContainer}>
              <TouchableOpacity onPress={pickImage} style={styles.imagePlaceholder}>
              {profileImage ? (
                <Image source={{uri: profileImage}} style={styles.profileImage} />
              ) : (
                <MaterialIcons name="person" size={50} color="gray" />
              )}
              </TouchableOpacity>
              <Pressable style={styles.changeButton}
              onPress={pickImage}>
                
                <Text style={styles.changeButtonText}>Change</Text>
              </Pressable>
              <Pressable style={styles.removeButton}
              onPress={() => setProfileImage(null)}>
                <Text style={styles.removeButtonText}>Remove</Text>
              </Pressable>
             </View>

            <View style={styles.container}>
                <TextInput style={styles.input} placeholder={firstName} />
                <TextInput style={styles.input} placeholder={email} />
                <TextInput style={styles.input} placeholder="Phone" />
            </View>

            <View style={styles.footerContainer}>
              <Pressable style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}>Log Out</Text>
              </Pressable>
             </View>

             <View style={styles.saveContainer}>
              <Pressable style={styles.saveChanges}>
                <Text style={styles.saveChangesText}>Save Changes</Text>
              </Pressable>
              <Pressable style={styles.discard}>
                <Text style={styles.discardText}>Discard Changes</Text>
              </Pressable>
             </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'fff',
        justifyContent: 'flex-start',
    },
    headerContainer: {
        width: '100%', // Take up the full width of the screen
        alignItems: 'center',
        flexDirection: 'row',
        paddingBottom: 30,
        justifyContent: 'center',
        marginTop: 20
    },
    headerText: {
      fontSize: 20,
      marginLeft: 30,
      paddingBottom: 30,
      fontFamily: 'Karla-Regular',
    },
    avatarContainer: {
      width: '100%',
      flexDirection: "row",
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginLeft: 30
    },
    footerContainer: {
      width: '100%',
      flexDirection: "row",
      alignItems: 'center',
      justifyContent: 'center',

      paddingBottom: 30,
    },
    logoutButton: {
      padding: 10,
      backgroundColor: '#F4CE14',
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      width: 300,
      borderWidth: 1,
      borderColor: '#EE9972'

    },
    logoutButtonText: {
      color: 'black',
      fontSize: 16,
    },
    saveContainer: {
      width: '100%',
      flexDirection: "row",
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingBottom: 30
    },
    saveChanges: {
      padding: 10,
      backgroundColor: '#495E57',
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 30,
      borderWidth: 1,
      borderColor: 'black'
    },
    saveChangesText: {
      color: '#FFFFFF',
      fontSize: 16,
    },
    discard: {
      padding: 10,
      backgroundColor: '#fff',
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 30,
      borderWidth: 1,
      borderColor: '#495E57'
    },
    discardText: {
      color: '#495E57',
      fontSize: 16,
    },
    imagePlaceholder: {
      width: 75,
      height: 75,
      borderRadius: 50,
      backgroundColor: '#e1e1e1',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    profileImage: {
      width: '100%',
      height: '100%',
      borderRadius: 50,
    },
    changeButton: {
      padding: 10,
      backgroundColor: '#495E57',
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 30,
      borderWidth: 1,
      borderColor: 'black'
    },
    removeButton: {
      padding: 10,
      backgroundColor: '#fff',
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 30,
      borderWidth: 1,
      borderColor: '#495E57'
    },
    changeButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
    },
    removeButtonText: {
      color: '#495E57',
      fontSize: 16,
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
        width: 175,
        height: 50,
        resizeMode: 'contain',
    },
    imageContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    backButton: {
        flex: 1,
        marginTop: 20,
        marginLeft: 10,
        fontSize: 16,
        position: 'absolute',
        top: 0,
        left: 0
      },
});