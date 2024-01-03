import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import Amenities from "../components/Amenities";
import useFetch from "../useFetch";
import { CheckBox, TouchableOpacity } from "react-native";
const RoomsScreen = () => {
    const route = useRoute();
    const input = route.params.id
    console.log(input);
    const { data, loading, error } = useFetch(`http://192.168.59.1:8800/api/hotels/room/${input}`);
    console.log(data)
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: "Available Rooms",
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
        });
    }, []);
    const [selected, setSelected] = useState([]);
    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) =>
            alldates.includes(new Date(date).getTime())
        );

        return !isFound;
    };
    const [checkboxselected, setcheckboxselected] = useState(false)

    return (
        <>
            <ScrollView>
                {data.map((item) => (
                    <Pressable
                        style={{ margin: 10, backgroundColor: "white", padding: 10 }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Text
                                style={{ color: "#007FFF", fontSize: 17, fontWeight: "500" }}
                            >
                                {item.desc}
                            </Text>
                            <AntDesign name="infocirlceo" size={24} color="#007FFF" />
                        </View>
                        <Text style={{ marginTop: 3, fontSize: 16 }}>
                            pay at the property
                        </Text>
                        <Text style={{ marginTop: 3, color: "green", fontSize: 16 }}>
                            Free cancellation Available
                        </Text>
                        <View
                            style={{
                                marginTop: 4,
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 10,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 18,
                                    color: "red",

                                }}
                            >
                                {route.params.price}
                            </Text>
                            <Text style={{ fontSize: 18 }}>Rs{route.params.price * route.params.adults}</Text>
                        </View>
                        <View styles={{
                            display:"flex",
                            flexDirection:"row",
                            backgroundColor:"red",
                        }}>
                       
                        {item.roomNumbers.map((roomNumber) => (
                            
                                <Pressable 
                                   style={{
                                    borderColor: "#318CE7",
                                    backgroundColor: "#F0F8FF",
                                    borderWidth: 2,
                                    width: "30%",
                                    padding: 10,
                                    borderRadius: 5,
                                    display:"flex",
                                    alignItems: "center",
                                    alignContent:"center"
                                }}>
                                    <Text >{roomNumber.number}</Text>
                                </Pressable>

                            
                        ))}
                     
                        </View>
                        <Amenities />
                        {selected.includes(item.desc) ? (
                            <Pressable
                                style={{
                                    borderColor: "#318CE7",
                                    backgroundColor: "#F0F8FF",
                                    borderWidth: 2,
                                    width: "100%",
                                    padding: 10,
                                    borderRadius: 5,
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <Text
                                    style={{
                                        textAlign: "center",
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                        color: "#318CE7",
                                        fontWeight: "bold",
                                        fontSize: 16,
                                    }}
                                >
                                    SELECTED
                                </Text>
                                <Entypo
                                    onPress={() => setSelected([])}
                                    name="circle-with-cross"
                                    size={24}
                                    color="red"
                                />
                            </Pressable>
                        ) : (
                            <Pressable
                                onPress={() => setSelected(item.desc)}
                                style={{
                                    borderColor: "#007FFF",
                                    borderWidth: 2,
                                    borderRadius: 5,
                                    padding: 10,
                                }}
                            >
                                <Text
                                    style={{
                                        textAlign: "center",
                                        fontWeight: "700",
                                        fontSize: 16,
                                        color: "#007FFF",
                                    }}
                                >
                                    SELECT
                                </Text>
                            </Pressable>
                        )}
                    </Pressable>
                ))}
            </ScrollView>
        </>
    );
};

export default RoomsScreen;

const styles = StyleSheet.create({});