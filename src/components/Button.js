import { LinearGradient } from 'expo-linear-gradient';
import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Dimensions, Text, SafeAreaView, Image } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

export function Button({text, style, radius, color, size, background}){
    return(
        <View style={[style,
            {
                alignContent: "center",
                justifyContent: 'center',
                borderRadius: radius,
                backgroundColor: background
            }]}>
                <FontAwesome name={text} size={size} style={{color: color}}></FontAwesome>
        </View>
    );

}