import { StyleSheet, Text, View, Image, TextInput, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import Logo from '../assets/Logo.png'
import validator from 'validator'
import { useNavigation } from '@react-navigation/native'


export default function LoginScreen() {
    const navigation = useNavigation();

    const [firstNameInput, setNameInput] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [emailInput, setEmail] = useState('')

    const validateName = (text) => {
        const isAllLetters = text.split('').every((char) => {
            const code = char.charCodeAt(0);
            return (code >= 65 && code <= 90) ||
                    (code >= 97 && code <= 122) ||
                    (char === ' ')
        });
    
        if (text.length == 0) {
            setErrorMessage("First Name Field Cannot Be Left Blank")
        } else if (!isAllLetters) {
            setErrorMessage("Must Contain Letters Only")
        } else {
            setErrorMessage("")
        }
        setNameInput(text);
    };
    
    const validateEmail = (text) => {
        setEmail(text);
        if(!validator.isEmail(text)) {
            setErrorMessage("Please enter a valid email address")
        } else {
            setErrorMessage("")
        }
    ;}
    
    const handleSubmit = () => {
        if (!validator.isEmail(emailInput)) {
            alert("Please enter a valid email before submitting.")
            return;
        }
        alert("Email submitted successfully!");
    }
    
    const isFormIncomplete = firstNameInput.trim() === '' || !validator.isEmail(emailInput);

    return (
         <View style={styles.container}>
            <Image source={Logo} style={styles.image}></Image>

             <Text style={styles.textRegular}>Sign up to continue!</Text>
            {errorMessage !== '' && <Text style={styles.errorText}>{errorMessage}</Text>}
            <TextInput
             placeholder={"First Name"}
            onChangeText={validateName}
            style={styles.input}/>
                
            <TextInput
            placeholder={"Email Address"}
            onChangeText={validateEmail}
            style={styles.input}/>

            <Pressable
            style={styles.button}
            disabled={isFormIncomplete}
            onPress={() => navigation.navigate('Home', {firstNameInput, emailInput})}>
                <Text style={styles.buttonText}>Submit</Text>
            </Pressable>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 100,
        backgroundColor: '#FBDABB',
      },
      input: {
        height: 50,
        width: 300,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
      },
      textRegular : {
        fontSize: 20,
        fontFamily: 'MarkaziText-Regular',
      },
      button: {
        marginTop: 20,
        backgroundColor: '#495E57',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
      },
      buttonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
      },
      image: {
        resizeMode: 'contain',
        height: 100,
        width: 300,
      }
    });
    
