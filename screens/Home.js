import { StyleSheet, Text, View, Image, TextInput, Pressable, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useState, useEffect, useLayoutEffect } from "react";
import Logo from '../assets/Logo.png'
import React from "react";
import Icon from 'react-native-vector-icons/MaterialIcons'
import * as ImagePicker from 'expo-image-picker'
import {MaterialIcons} from '@expo/vector-icons'
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen () {
    return (
        <View>
            <Text>This is the home screen</Text>
        </View>
    )
}