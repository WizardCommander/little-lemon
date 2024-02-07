import { StyleSheet, Text, View, Image, TextInput, Pressable } from "react-native";
import { useState, useEffect } from "react";
import Logo from '../assets/Logo.png'
import * as Font from 'expo-font';
import {NavigationContatiner} from '@react-navigation/native'

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
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