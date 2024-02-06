import { StyleSheet, Text, View, Image, TextInput, Button } from "react-native";
import { useState } from "react";
import Logo from '../assets/Logo.png'
import validator from 'validator'

const firstName = () => {
    const [firstNameInput, setInputValue] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
}

const email = () => {
    const [emailInput, setEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
}

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
    setInputValue(text);
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
    if (!validateEmail.isEmail(email)) {
        alert("Please enter a valid email before submitting.")
        return;
    }
    alert("Email submitted successfully!");
}

const isFormIncomplete = firstName.trim() === '' || !isValidEmail(email);

export default function loginScreen() {
    return (
        <View style={styles.container}>
            <Image source={Logo}></Image>

            <Text style={styles.textRegular}>Sign up to continue!</Text>

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
            disabled={isFormIncomplete}>
                <Text style={styles.buttonText}>Next</Text>
            </Pressable>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f0f0f0',
      },
      input: {
        height: 50,
        width: '100%',
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
      },
      button: {
        marginTop: 20,
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
      },
      buttonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
      }
    });
    
