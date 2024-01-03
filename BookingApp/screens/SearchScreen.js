import { StyleSheet, Text, View, SafeAreaView, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import SearchResults from "../components/SearchResults";
import useFetch from "../useFetch";
// import axios from "axios";

const SearchScreen = () => {
    const [input,setInput] = useState("");
    const { data, loading, error } = useFetch(`http://192.168.59.1:8800/api/hotels/?city=${input}`);
    // console.log(data)
    // console.log(loading)
    // console.log(error)
    return (
        <SafeAreaView>
            <View
                style={{
                    marginVertical:30,
                    padding: 10,
                    margin: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderColor: "#FFC72C",
                    borderWidth: 4,
                    borderRadius: 10
                }}
            >
                <TextInput value={input} onChangeText={(text) => setInput(text)} placeholder="Enter Your Destination" />
                <Feather name="search" size={22} color="black" />
            </View>
            
            <SearchResults data={data} input={input} setInput={setInput} />
        </SafeAreaView>
    )
}

export default SearchScreen;

const styles = StyleSheet.create({});