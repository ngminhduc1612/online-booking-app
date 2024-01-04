import { Dimensions, StyleSheet, Text, View, ScrollView, Pressable, Image } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import Amenities from "../components/Amenities";
import useFetch from "../useFetch";
import { CheckBox, TouchableOpacity } from "react-native";
const RoomsScreen = () => {
    const route = useRoute();
    const input = route.params.id;
    const { width, height } = Dimensions.get("window");
    console.log(input);
    const { data, loading, error } = useFetch(`http://192.168.56.1:8800/api/hotels/room/${input}`);
    // console.log(data)
    const navigation = useNavigation();
    const [checkboxselected, setCheckboxSelected] = useState([]);
    console.log(checkboxselected)
    var selection = checkboxselected;
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
        // data.map((item)=>{
        //     setCheckboxSelected({[item._id]:''})
        // })
    }, []);
    const [selected, setSelected] = useState([]);
    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) =>
            alldates.includes(new Date(date).getTime())
        );

        return !isFound;
    };
    const updateCheckbox = (value) => {
        let index = selection.findIndex((item) => item === value)
        if (index !== -1) {
            selection.splice(index, 1)
        } else {
            selection.push(value)
        }

        console.log(selection)
        setCheckboxSelected([...selection]);
        console.log(checkboxselected)
    }

    return (
        <>
            <ScrollView>
                {data.map((item, index) => (
                    <Pressable
                        key={index}
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

                        <View style={{
                            // display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap"
                        }}>
                            {item.roomNumbers.map((roomNumber) => (
                                <>
                                    {(checkboxselected.findIndex((item) => item === roomNumber.number) === -1) ? (
                                        <Pressable
                                            onPress={() =>
                                                updateCheckbox(roomNumber.number)}
                                            style={{
                                                borderColor: "#007FFF",
                                                backgroundColor: "#F0F8FF",
                                                borderWidth: 2,
                                                padding: 10,
                                                borderRadius: 5,
                                                flexWrap: "wrap",
                                                alignItems: "center",
                                                margin: 10
                                            }}>


                                            <Text style={{
                                                textAlign: "center",
                                                color: "#007FFF",
                                            }}>
                                                {roomNumber.number}
                                            </Text>
                                        </Pressable>
                                    ) : (
                                        <Pressable
                                            onPress={() =>
                                                updateCheckbox(roomNumber.number)}
                                            style={{
                                                borderColor: "#007FFF",
                                                backgroundColor: "#007FFF",
                                                borderWidth: 2,
                                                padding: 10,
                                                borderRadius: 5,
                                                flexWrap: "wrap",
                                                alignItems: "center",
                                                margin: 10
                                            }}>
                                            <Text
                                                style={{
                                                    textAlign: "center",
                                                    color: "white",
                                                }}
                                            >
                                                {roomNumber.number}
                                            </Text>
                                        </Pressable>
                                    )}
                                </>
                            ))}
                        </View>
                        <Amenities />
                        {/* {selected.includes(item.desc) ? (
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
                        )} */}
                    </Pressable>
                ))}
            </ScrollView>

            {checkboxselected.length > 0 ? (
                <Pressable
                    onPress={() =>
                        navigation.navigate("User", {
                            oldPrice: route.params.oldPrice,
                            newPrice: route.params.newPrice,
                            name: route.params.name,
                            children: route.params.children,
                            adults: route.params.adults,
                            rating: route.params.rating,
                            startDate: route.params.startDate,
                            endDate: route.params.endDate,
                        })
                    }
                    style={{
                        backgroundColor: "#007FFF",
                        padding: 8,
                        marginBottom: 30,
                        borderRadius: 3,
                        marginHorizontal: 15,
                    }}
                >
                    <Text
                        style={{ textAlign: "center", color: "white", fontWeight: "bold" }}
                    >
                        Reserve
                    </Text>
                </Pressable>
            ) : null}
        </>
    );
};

export default RoomsScreen;

const styles = StyleSheet.create({});