import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import Header from "../components/Header";

const HomeScreen = () => {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: true,
          title: "Booking.com",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
            color: "white",
          },
          headerStyle: {
            backgroundColor: "#003580",
            height: 110,
            borderBottomColor: "transparent",
            shadowColor: "transparent",
          },
          headerRight: () => (
            <Ionicons
              name="notifications-outline"
              size={24}
              color="white"
              style={{ marginRight: 12 }}
            />
          ),
        });
      }, []);

    return (
        <View>
            <Header/>
          <Text>Home Screen</Text>
        </View>
      );
}

export default HomeScreen

const styles = StyleSheet.create({})