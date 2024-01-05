import { Dimensions, StyleSheet, Text, View, ScrollView, Pressable, Image } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import Amenities from "../components/Amenities";
import useFetch from "../useFetch";
import axios from "axios";
import { CheckBox, TouchableOpacity } from "react-native";
const RoomsScreen = () => {
    const route = useRoute();
    const input = route.params.id;
    const { width, height } = Dimensions.get("window");
    // console.log(input);
    const { data, loading, error } = useFetch(`http://192.168.56.1:8800/api/hotels/room/${input}`);
    // console.log(data)
    const navigation = useNavigation();
    const [checkboxselected, setCheckboxSelected] = useState([]);
    // console.log(checkboxselected)
    var selection = checkboxselected;
    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
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
    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate.replace(/\//g, '-'));
        const end = new Date(endDate.replace(/\//g, '-'));

        const date = new Date(start.getTime());

        const dates = [];

        while (date <= end) {
            dates.push(new Date(date).getTime());
            date.setDate(date.getDate() + 1);
        }

        return dates;
    };

    const alldates = getDatesInRange(route.params.startDate, route.params.endDate);
    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) =>
            alldates.includes(new Date(date).getTime())
        );

        return !isFound;
    };
    function dayDifference(date1, date2) {
        date1 = new Date(date1.replace(/\//g, '-'))
        date2 = new Date(date2.replace(/\//g, '-'))
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
        return diffDays;
    }

    const dayDistance = dayDifference(route.params.startDate, route.params.endDate);
    // console.log("daydistance", dayDistance)
    const updateCheckbox = (value, id, price) => {
        console.log(id)
        let index = selection.findIndex((item) => item[0] === value)
        if (index !== -1) {
            selection.splice(index, 1)
        } else {
            selection.push([value, id, price])
        }

        console.log(selection)
        setCheckboxSelected([...selection]);
        console.log(checkboxselected)
    }

    const reserveRoom = async () => {
        try {
            await Promise.all(
                checkboxselected.map((room) => {
                    console.log(room)
                    console.log(alldates)
                    const res = axios.put(`http://192.168.56.1:8800/api/rooms/availability/${room[1]}`, {
                        dates: alldates,
                    });

                    const upload = axios.post(`http://192.168.56.1:8800/api/orders/${room[1]}`, {
                        username: 'dat123',
                        roomNumbers: room[0],
                        start: route.params.startDate,
                        end: route.params.endDate,
                        price: room[2],
                        hotelid: input
                    });


                    return res.data;
                })

            );
            // setOpen(false);

        } catch (err) { console.log(err) }
        // console.log("User đặt" + user._id)
        // console.log("So Phòng đặt" + selectedRoomsNumber)
        // console.log("Ngày phòng đặt" + dates[0].endDate)

        // console.log("Giá hóa đơn" + selectedRoomsPrice * selectedRooms.length * dayDistance)


        alert("Successful reserve")
        navigation.navigate("Home")
    };

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
                                {item.price}
                            </Text>
                            <Text style={{ fontSize: 18 }}> {item.price * dayDistance} for {dayDistance} days</Text>
                        </View>

                        <View style={{
                            // display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap"
                        }}>
                            {item.roomNumbers.map((roomNumber) => (
                                <>
                                    {isAvailable(roomNumber) ? (
                                        <>
                                            {(checkboxselected.findIndex((item) => item[0] === roomNumber.number) === -1) ? (
                                                <Pressable
                                                    onPress={() =>
                                                        updateCheckbox(roomNumber.number, roomNumber._id, item.price * dayDistance)}
                                                    style={{
                                                        borderColor: "#007FFF",
                                                        backgroundColor: "#F0F8FF",
                                                        borderWidth: 2,
                                                        padding: 10,
                                                        borderRadius: 5,
                                                        flexWrap: "wrap",
                                                        alignItems: "center",
                                                        margin: 10,

                                                    }}
                                                    disabled={!isAvailable(roomNumber)}
                                                >

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
                                                        updateCheckbox(roomNumber.number, roomNumber._id, item.price * dayDistance)}
                                                    style={{
                                                        borderColor: "#007FFF",
                                                        backgroundColor: "#007FFF",
                                                        borderWidth: 2,
                                                        padding: 10,
                                                        borderRadius: 5,
                                                        flexWrap: "wrap",
                                                        alignItems: "center",
                                                        margin: 10
                                                    }}
                                                    disabled={!isAvailable(roomNumber)}
                                                >

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
                                    ) : null}
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
                        // navigation.navigate("User", {
                        //     oldPrice: route.params.oldPrice,
                        //     newPrice: route.params.newPrice,
                        //     name: route.params.name,
                        //     children: route.params.children,
                        //     adults: route.params.adults,
                        //     rating: route.params.rating,
                        //     startDate: route.params.startDate,
                        //     endDate: route.params.endDate,
                        // })
                        reserveRoom()
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