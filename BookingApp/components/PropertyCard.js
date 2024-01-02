import { Dimensions, Pressable, StyleSheet, Text, View, Image } from "react-native";
import React from "react"
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const PropertyCard = ({ rooms, children, adults, selectedDates, city, name, photos, address, price }) => {
    const { width, height } = Dimensions.get("window")
    // console.log(city)
    // console.log(selectedDates)
    // console.log(photos)
    return (
        <View>
            <Pressable style={{ margin: 15, flexDirection: "row", backgroundColor: "white" }}>
                <View>
                    <Image style={{ height: height / 4, width: width - 200 }} source={{ uri: photos }} />
                </View>

                <View style={{ padding: 10 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text style={{ width: 130 }}>{name}</Text>
                        <AntDesign name="hearto" size={24} color="red" />
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 6,
                            marginTop: 7,
                        }}>
                        <MaterialIcons name="stars" size={24} color="green" />
                        <View
                            style={{
                                backgroundColor: "#6CB4EE",
                                paddingVertical: 3,
                                borderRadius: 5,
                                width: 100,
                            }}
                        >
                            <Text
                                style={{ textAlign: "center", color: "white", fontSize: 15 }}
                            >
                                Genius Level
                            </Text>
                        </View>
                    </View>
                    <Text
                        style={{
                            width: 210,
                            marginTop: 6,
                            color: "gray",
                            fontWeight: "bold",
                        }}
                    >
                        {address.length > 50 ? address.substr(0, 50) : address}
                    </Text>

                    <Text style={{ marginTop: 4, fontSize: 11, fontWeight: "500" }}>
                        Price for 1 Night and {adults} adults
                    </Text>

                    <Text
                        style={{
                            color: "red",
                            fontSize: 18,
                            // textDecorationLine: "line-through",
                        }}
                    >
                        {price}
                    </Text>

                    <View style={{ marginTop: 6 }}>
                        <Text style={{ fontSize: 13, color: "gray" }}>Deluxe Room</Text>
                        <Text style={{ fontSize: 13, color: "gray" }}>
                            Hotel Room : 1 bed
                        </Text>
                    </View>

                    <View
                        style={{
                            backgroundColor: "#6082B6",
                            paddingVertical: 2,
                            marginTop: 2,
                            borderRadius: 5,
                            width: 150,
                            paddingHorizontal: 3,
                        }}
                    >
                        <Text style={{ textAlign: "center", color: "white" }}>Limited Time deal</Text>
                    </View>

                </View>
            </Pressable>
        </View>
    )
}


export default PropertyCard;

const styles = StyleSheet.create({});