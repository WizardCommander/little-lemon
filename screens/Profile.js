import { StyleSheet, Text, View, Image, TextInput, Pressable } from "react-native";
import { useState, useEffect } from "react";
import Logo from '../assets/Logo.png'
import * as Font from 'expo-font';
import {NavigationContatiner} from '@react-navigation/native'
import React from "react";

export default function ProfileScreen({route}) {

    const {firstName, email} = route.params

    return (
        <View style={styles.container}>
            <TextInput>{firstName}</TextInput>
            <TextInput>{email}</TextInput>
            <Image source={Logo}></Image>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'fff',
    }
})