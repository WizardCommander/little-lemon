import { StyleSheet, Text, View, Image, TextInput, Pressable, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useState, useEffect, useLayoutEffect } from "react";
import Logo from '../assets/Logo.png'
import * as Font from 'expo-font';
import {NavigationContatiner} from '@react-navigation/native'
import React from "react";
import Icon from 'react-native-vector-icons/MaterialIcons'
import * as ImagePicker from 'expo-image-picker'
import {MaterialIcons} from '@expo/vector-icons'
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen({route, navigation}) {

    const {firstNameInput, emailInput} = route.params
    const [profileImage, setProfileImage] = useState('')
    const [emailForm, setEmailForm] = useState(emailInput)
    const [name, setName] = useState(firstNameInput);
    const [phone, setPhone] = useState('')
    const [ogProfileData, setOgProfileData] = useState(null);

    const getPermissionAsync = async () => {
      const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions!')
        return false;
      }
      return true;
    }

    const pickImage = async () => {
      const hasPermission = await getPermissionAsync();
      if (!hasPermission) return;
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        aspect: [4,3],
      })

      console.log('Image picker result:', result) // DEBUG

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri
        console.log('Selected image Uri:', typeof imageUri, imageUri);
        setProfileImage(imageUri);
      }

    };

    const saveAllChanges = async () => {
      try {
        const profileData = {
          firstNameInput,
          emailForm,
          phone,
          profileImageUri: profileImage
        };

        const jsonValue = JSON.stringify(profileData);
        await AsyncStorage.setItem('userProfile', jsonValue);

        Alert.alert(
          "Profile Saved",
          "Your profile information has been successfully saved.",
          [
            {text: "OK"}
          ]
        );
        console.log('Profile saved successfully');
      } catch (e) {
        Alert.alert(
          "Save Failed",
          "Failed to save your profile. Please try again.",
          [
            {text: "OK"}
          ]
        );
        console.log('Failed to save the profile')
      }
    };

    const discardChanges = () => {
      if (ogProfileData) {
        setName(ogProfileData.firstNameInput)
        setEmailForm(ogProfileData.emailForm)
        setPhone(ogProfileData.phone)
        setProfileImage(ogProfileData.profileImageUri)

      } else {
        console.log("No profile data to revert to")
      }
    };


    const loadProfileData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('userProfile');
        if (jsonValue != null) {
          const profileData = JSON.parse(jsonValue);
          setName(profileData.firstNameInput);
          setEmailForm(profileData.emailForm);
          setPhone(profileData.phone);
          setProfileImage(profileData.profileImageUri);
          setOgProfileData(profileData)
        } else {
          console.log('No profile data found')
        }
      } catch(e) {
        console.log('Failed to load the profile:', e)
      }
    };

    useEffect(() => {
      loadProfileData();
    }, []);

    const handleLogout = () => {
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>

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
                <TextInput style={styles.input} placeholder={'First Name'} value={name} onChangeText={setName} />
                <TextInput style={styles.input} placeholder={'Email'} value={emailForm} onChangeText={setEmailForm} />
                <TextInput style={styles.input} placeholder="Phone" value={phone} onChangeText={setPhone} />
            </View>

            <View style={styles.footerContainer}>
              <Pressable style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>Log Out</Text>
              </Pressable>
             </View>

             <View style={styles.saveContainer}>
              <Pressable style={styles.saveChanges} onPress={saveAllChanges}>
                <Text style={styles.saveChangesText}>Save Changes</Text>
              </Pressable>
              <Pressable style={styles.discard} onPress={discardChanges} >
                <Text style={styles.discardText}>Discard Changes</Text>
              </Pressable>
             </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
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