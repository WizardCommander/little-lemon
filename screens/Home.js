import { StyleSheet, Text, View, Image, TextInput, Pressable, TouchableOpacity, ScrollView, Alert, } from "react-native";
import { useState, useEffect, useLayoutEffect } from "react";
import Logo from '../assets/Logo.png'
import Title from '../assets/title.jpg'
import React from "react";
import {MaterialIcons} from '@expo/vector-icons'
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen ({route, navigation}) {

    const {profileImage} = route.params
    const [menuData, setMenuData] = useState(null);

    async function fetchMenuData() {
        try {
            const response = await fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setMenuData(data)
            console.log(data);
        } catch (error) {
            setError('There has been a problem with your fetch operation')
            Alert.alert('Error', error.message)
        }
    }

    useEffect(() => {
        fetchMenuData();
      }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
           <View style={styles.headerContainer}>
            <View style={styles.imageContainer}>
            <Image style={styles.headerImage} source={Logo} />
            </View>
           <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.imagePlaceholder}>
              {profileImage ? (
                <Image source={{uri: profileImage}} style={styles.profileImage} />
              ) : (
                <MaterialIcons name="person" size={25} color="gray" />
              )}
              </TouchableOpacity>
           </View>

           <View style={styles.titleContainer}>
                <Text style={styles.titleHeaderText}>Little Lemon</Text>
                <Text style={styles.subTitleText}>Chicago</Text>
                <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}>We are a family owned Mediterranean restaurant, focusing on traditional recipes served with a modern twist.</Text>
                </View>
                <View style={styles.titleImageContainer}>
                    <Image source={Title} style={styles.titleImage}></Image>
                </View>
           </View>

           <View style={styles.filterHeaderContainer}>
            <Text style={styles.filterTitleText}>Order For Delivery!</Text>
            <View style={styles.filterButtonsContainer}>
                <Pressable style={styles.filterButton} ><Text style={styles.filterButtonText}>Starters</Text></Pressable>
                <Pressable style={styles.filterButton} ><Text style={styles.filterButtonText}>Mains</Text></Pressable>
                <Pressable style={styles.filterButton} ><Text style={styles.filterButtonText}>Desserts</Text></Pressable>
                <Pressable style={styles.filterButton} ><Text style={styles.filterButtonText}>Drinks</Text></Pressable>
            </View>
            <View style={styles.separator}></View>
           </View>

           <View style={styles.menuContainer}>

           </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create ({
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
        marginTop: 30,
    },
    headerImage: {
        marginTop: 20,
        width: 200,
        height: 50,
        resizeMode: 'contain',
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
      },
      imagePlaceholder: {
        width: 45,
        height: 45,
        borderRadius: 50,
        backgroundColor: '#e1e1e1',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        marginTop: 20,
        position: 'absolute',
        top: 0,
        right: 0,
        marginRight: 20
      },
      imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: .5,
      },
     titleContainer: {
        width: '100%',
        alignItems: 'left',
        flexDirection: 'column',
        paddingBottom: 30,
        justifyContent: 'flex-start',
        marginTop: 10,
        backgroundColor: '#495E57'
     },
     titleHeaderText: {
        fontSize: 42,
        fontFamily: 'MarkaziText-Regular',
        color: '#F4CE14',
        marginLeft: 20
     },
     subTitleText: {
        fontSize: 26,
        fontFamily: 'MarkaziText-Regular',
        color: '#fff',
        marginLeft: 20,
     },
     descriptionContainer: {
        width: '70%',
        alignItems: 'left',
        flexDirection: 'column',
        justifyContent: 'flex-start',
     },
     descriptionText: {
        fontSize: 18,
        fontFamily: 'Karla-Regular',
        color: '#fff',
        marginLeft: 20,
        marginTop: 20,
     },
     titleImage: {
        width: '100%',
        height: '100%',
        marginRight: 20,
        resizeMode: 'contain',
        borderRadius: 200,
     },
     titleImageContainer: {
        width: 100,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        right: 0,
     },
     filterHeaderContainer: {
        width: '100%',
        flexDirection: 'column',
        paddingBottom: 30,
        justifyContent: 'flex-start',
        marginTop: 10,
     },
     filterButtonsContainer: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        paddingBottom: 30,
        justifyContent: 'flex-start',
        marginTop: 10,
        marginLeft: 10
     },
     filterButton: {
      backgroundColor: '#495E57',
      borderRadius: 10,
      margin: 5,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      paddingHorizontal: 10
    
     },
     filterButtonText:{
        fontFamily: 'Karla-Regular',
        fontSize: 16,
        color: 'white'
     },
     filterTitleText: {
        fontSize: 26,
        fontFamily: 'MarkaziText-Regular',
        color: 'black',
        marginLeft: 20,
     },
     separator: {
        height: 2,
        backgroundColor: '#ccc',
        marginBottom: 10,
        marginLeft: 15,
        marginRight: 15
     },
     menuContainer: {
        width: '100%',
        alignItems: 'left',
        flexDirection: 'column',
        paddingBottom: 30,
        justifyContent: 'flex-start',
     }
})