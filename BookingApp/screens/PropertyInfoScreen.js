import { StyleSheet, Text, View, SafeAreaView, Pressable, Image, ScrollView } from "react-native";
import react, { useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { pixelNormalize } from "../components/Normalise";
import { MaterialIcons } from "@expo/vector-icons";
import Amenities from "../components/Amenities";
const PropertyInfoScreen = () => {
    const route = useRoute();
    console.log(route.params.item.photos.slice(0,5));
    console.log(route.params.item)
    data = route.params.item
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: `${route.params.item.name}`,
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
    return (
        <SafeAreaView>
          <ScrollView>
            <Pressable
            style={{ flexDirection: "row", flexWrap: "wrap", margin: 10 }}
            >
              {route.params.item.photos.slice(0,5).map((photo, index) => (
                <View >
                  <Image key={index}
                    style={{
                      width: 120,
                      // height: pixelNormalize(80),
                      // borderRadius: pixelNormalize(40),
                    }}
                    source={{ uri: photo }}
                  />
                  <Text>{photo}</Text>
                </View>
              ))}
              <Pressable
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <Text style={{ textAlign: "center", marginLeft: 20 }}>
                  Show More
                </Text>
              </Pressable>
            </Pressable>

            <View
              style={{
                marginHorizontal: 12,
                marginTop: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                  {data.name}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6,
                    marginTop: 7,
                  }}
                >
                  <MaterialIcons name="stars" size={24} color="green" />
                  {/* <Text>{route.params.rating}</Text> */}
                  <View
                    style={{
                      backgroundColor: "#003580",
                      paddingVertical: 3,
                      borderRadius: 5,
                      width: 100,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: 15,
                      }}
                    >
                      Genius Level
                    </Text>
                  </View>
                </View>
              </View>

              {/* <View
                style={{
                  backgroundColor: "#17B169",
                  paddingHorizontal: 6,
                  paddingVertical: 4,
                  borderRadius: 6,
                }}
              >
                <Text style={{ color: "white", fontSize: 13 }}>
                  Travel sustainable
                </Text>
              </View> */}
            </View>
            
            <Text
              style={{
                borderColor: "#E0E0E0",
                borderWidth: 3,
                height: 1,
                marginTop: 15,
              }}
            />

            <Text
              style={{
                marginTop: 10,
                fontSize: 17,
                fontWeight: "500",
                marginHorizontal: 12,
              }}
            >
              Price for 1 Night and {route.params.adults} adults
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: 12,
                marginTop: 4,
                gap: 8,
              }}
            >
              {/* <Text
                style={{
                  color: "red",
                  fontSize: 20,
                  textDecorationLine: "line-through",
                }}
              >
                {route.params.item.cheapestPrice * route.params.adults}
              </Text> */}
              <Text style={{ fontSize: 20 }}>
                Rs {data.cheapestPrice * route.params.adults} $
              </Text>
            </View>
            
            <Text
              style={{
                borderColor: "#E0E0E0",
                borderWidth: 3,
                height: 1,
                marginTop: 15,
              }}
            />

            <View
              style={{
                margin: 12,
                flexDirection: "row",
                alignItems: "center",
                gap: 60,
              }}
            >
              <View>
                <Text
                  style={{ fontSize: 16, fontWeight: "600", marginBottom: 3 }}
                >
                  Check In
                </Text>
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "#007FFF" }}
                >
                  {route.params.selectedDates.startDate}
                </Text>
              </View>

              <View>
                <Text
                  style={{ fontSize: 16, fontWeight: "600", marginBottom: 3 }}
                >
                  Check Out
                </Text>
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "#007FFF" }}
                >
                  {route.params.selectedDates.endDate}
                </Text>
              </View>
            </View>
            <View style={{ margin: 12 }}>
              <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 3 }}>
                Rooms and Guests
              </Text>
              <Text
                style={{ fontSize: 16, fontWeight: "bold", color: "#007FFF" }}
              >
                {route.params.rooms} rooms {route.params.adults} adults{" "}
                {route.params.children} children
              </Text>
            </View>
            <Text 
            style = {{
              borderColor: "#E0E0E0",
              borderWidth: 3,
              height: 1,
              marginTop: 15,
            }}/>
            
            {/* <Amenities/> */}
            
      <Pressable
      onPress={() => navigation.navigate("Rooms",{
        price:data.cheapestPrice * route.params.adults,
        name:data.name,
        // rooms:data.rooms,
        children:route.params.children,
        adults:route.params.adults,
        startDate:route.params.selectedDates.startDate,
        endDate:route.params.selectedDates.endDate,
        id:data._id
      })}
        style={{
          backgroundColor: "#6CB4EE",
          position: "absolute",
          bottom: 20,
          padding: 15,
          width:"95%",
          marginHorizontal:10,
        }}
      >
        <Text style={{ textAlign: "center", color: "white",fontWeight:"bold",fontSize:17 }}>
          Select Availabilty
        </Text>
      </Pressable>
          </ScrollView>
        </SafeAreaView>

        
    )
}

export default PropertyInfoScreen

const styles = StyleSheet.create({})