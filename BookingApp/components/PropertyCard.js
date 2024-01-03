import { Dimensions, Pressable, StyleSheet, Text, View, Image } from "react-native";
import React from "react"
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const PropertyCard = ({ rooms, children, adults, selectedDates, city, item }) => {
    const { width, height } = Dimensions.get("window")
    // console.log(city)
    // console.log(selectedDates)
    // console.log(photos)
    console.log(rooms)
    const navigation = useNavigation();
    return (
        <View>
            <Pressable 
            onPress={() => navigation.navigate("Info",{
                selectedDates:selectedDates,
                adults:adults,
                children:children,
                item:item
            })}
            style={{ margin: 15, flexDirection: "row", backgroundColor: "white" }}>
                <View>
                    <Image style={{ height: height / 4, width: width - 200 }} source={{ uri: item.photos[0] }} />
                </View>

                <View style={{ padding: 10 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text style={{ width: 130 }}>{item.name}</Text>
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
                        {item.address.length > 50 ? item.address.substr(0, 50) : item.address}
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
                        {item.cheapestPrice}
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