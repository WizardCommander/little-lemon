import { StyleSheet, Text, View, Image, TextInput, Pressable, TouchableOpacity, Alert, FlatList, } from "react-native";
import { useState, useEffect, useLayoutEffect } from "react";
import Logo from '../assets/Logo.png'
import Title from '../assets/title.jpg'
import React from "react";
import {MaterialIcons} from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite';




export default function HomeScreen ({route, navigation}) {

    const {profileImage, firstNameInput, emailInput} = route.params
    
    const [menuData, setMenuData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState('')
    const [error, setError] = useState('');
    const [pressedButton, setPressedButton] = useState(null);

    const db = SQLite.openDatabase('little_lemon.db');

  useEffect(() => {
   async function fetchMenuData() {
      try {
          const response = await fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json');
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setMenuData(data.menu)
          setFilteredData(data.menu)
      } catch (error) {
          setError('There has been a problem with your fetch operation')
          Alert.alert('Error', error.message)
      }
  }
      fetchMenuData();
    }, []);

    useEffect(() => {
      db.transaction(tx => {
         tx.executeSql(
            `CREATE TABLE IF NOT EXISTS menu (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            price REAL,
            category TEXT,
            image TEXT
            );`,
            [],
         );
      });
    }, []);


   const handlePress = (category) => {
      if (pressedButton === category) {
         setFilteredData(menuData)
         setPressedButton(null)
      } else {
         const filteredItems = menuData.filter(item => item.category === category);
         setFilteredData(filteredItems);
         setPressedButton(category);
      }
   };

   useEffect(() => {
      let filteredItems = menuData
      if (pressedButton) {
         filteredItems = filteredItems.filter(item => item.category === pressedButton)
      }

      if (searchText) {
         filteredItems = filteredItems.filter(item =>
            item.name.toLowerCase().includes(searchText.toLowerCase())
            );
      }
      setFilteredData(filteredItems);
   }, [menuData, pressedButton, searchText])

    const renderItemSeparator = () => {
      return (
         <View
         style={{
            height: 1,
            width: "100%",
            backgroundColor: '#CED0CE',
         }}
         />
      )
   }

    const renderItem = ({item}) => {
      const baseUrl = `https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/images/${item.image}`
      return (
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
         <View style={{ flex: 1 }}>
            <Text style={styles.menuTitleText}>{item.name}</Text>
            <Text style={styles.menuDescription} numberOfLines={2} ellipsizeMode="tail">{item.description}</Text>
            <Text style={styles.menuPrice}>{'$' + item.price}</Text>
         </View>
         {item.image && (
         <View style={styles.menuImageContainer}>
            <Image source={{uri: baseUrl}} style={styles.menuImage} />
         </View>
         )}
      </View>
      );
    };

    return (
        <FlatList contentContainerStyle={styles.container}
         ListHeaderComponent={
            <>
           <View style={styles.headerContainer}>
            <View style={styles.imageContainer}>
            <Image style={styles.headerImage} source={Logo} />
            </View>
           <TouchableOpacity onPress={() => navigation.navigate('Profile', firstNameInput, emailInput,)} style={styles.imagePlaceholder}>
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
               <TextInput style={styles.input} placeholder="Search..." value={searchText} onChangeText={setSearchText} />
                </View>
                <View style={styles.titleImageContainer}>
                    <Image source={Title} style={styles.titleImage}></Image>
                </View>
           </View>

           <View style={styles.filterHeaderContainer}>
            <Text style={styles.filterTitleText}>Order For Delivery!</Text>
            <View style={styles.filterButtonsContainer}>
                <Pressable style={pressedButton === 'starters' ? [styles.filterButton, styles.pressedFilterButton] : styles.filterButton} onPress={() => handlePress('starters')}><Text style={pressedButton === 'starters' ? styles.filteredButtonText : styles.filterButtonText}>Starters</Text></Pressable>
                <Pressable style={pressedButton === 'mains' ? [styles.filterButton, styles.pressedFilterButton] : styles.filterButton} onPress={() => handlePress('mains')}><Text style={pressedButton === 'mains' ? styles.filteredButtonText : styles.filterButtonText}>Mains</Text></Pressable>
                <Pressable style={pressedButton === 'desserts' ? [styles.filterButton, styles.pressedFilterButton] : styles.filterButton} onPress={() => handlePress('desserts')}><Text style={pressedButton === 'desserts' ? styles.filteredButtonText : styles.filterButtonText}>Desserts</Text></Pressable>
                <Pressable style={pressedButton === 'drinks' ? [styles.filterButton, styles.pressedFilterButton] : styles.filterButton} onPress={() => handlePress('drinks')}><Text style={pressedButton === 'starters' ? styles.filteredButtonText : styles.filterButtonText}>Drinks</Text></Pressable>
            </View>
            <View style={styles.separator}></View>
           </View>

        </>
         }
         data={filteredData}
         renderItem={renderItem}
         keyExtractor={item => item.name}
         ItemSeparatorComponent={renderItemSeparator}
         />
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
     input: {
      height: 40,
      width: 300,
      marginVertical: 20,
      marginLeft: 30,
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      paddingTop: 10,
      borderRadius: 5,
      backgroundColor: '#fff',
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
        marginLeft: 15,
        marginRight: 15
     },
     menuContainer: {
        width: '100%',
        alignItems: 'left',
        flexDirection: 'column',
        paddingBottom: 30,
        justifyContent: 'flex-start',
     },
     menuTitleText: {
      fontFamily: 'Karla-Regular',
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 5,
      marginLeft: 5,
      marginTop: 10
     },
     menuPrice: {
      fontFamily: 'Karla-Regular',
      fontSize: 18,
      marginLeft: 5
     },
     menuDescription: {
      fontFamily: 'Karla-Regular',
      fontSize: 16,
      marginBottom: 10,
      marginLeft: 5
     },
     menuImage: {
      width: '100%',
      height: '100%',

     },
     menuImageContainer: {
      flex: 0, alignItems: 'flex-end', width: 100, height: 100
     },
     pressedFilterButton: {
      backgroundColor: '#F4CE14',
      borderRadius: 10,
      margin: 5,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      paddingHorizontal: 10
     },
     filteredButtonText: {
      fontFamily: 'Karla-Regular',
        fontSize: 16,
        color: 'black'
     }
})