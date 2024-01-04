
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Octicons, Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from "@expo/vector-icons";
import useFetch from "../useFetch"
import { BottomModal, ModalButton, ModalContent, ModalFooter, ModalTitle, SlideAnimation } from "react-native-modals";
import PropertyCard from "../components/PropertyCard";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const PlacesScreen = () => {
  const route = useRoute()
  const input = route.params?.city
  const { data, loading, error } = useFetch(`http://192.168.56.1:8800/api/hotels/?city=${input}`);
  const navigation = useNavigation()
  const [modalVisible, setModalVisible] = useState(false)
  const filters = [
    {
      id: "0",
      filter: "cost:Low to High",
    },
    {
      id: "1",
      filter: "cost:High to Low",
    },
  ];
  const [selectedFilter, setSelectedFilter] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Popular Places",
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

  const searchPlaces = data
  const [sortedData,setSortedData] = useState(data)
  useEffect(() => {
    setSortedData(data);
  }, [data]);

  const compare = (a,b) => {
    if (a.cheapestPrice > b.cheapestPrice){
      return -1;
    }
    if (a.cheapestPrice < b.cheapestPrice){
      return 1;
    }
    return 0;
  }

  const comparison = (a,b) => {
    if(a.cheapestPrice < b.cheapestPrice){
      return -1;
    }
    if(a.cheapestPrice > b.cheapestPrice){
      return 1;
    }
    return 0;
  }

  const applyFilter = (filter) => {
    setModalVisible(false)
    switch(filter){
      case "cost:High to Low":
        searchPlaces.sort(compare);
        setSortedData(searchPlaces);
        break;
      case "cost:Low to High":
        searchPlaces.sort(comparison);
        setSortedData(searchPlaces);
        break;
    }
  }

  return (
    <View>
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          padding: 12,
          backgroundColor: "white",
        }}
      >
        <Pressable
          onPress={() => setModalVisible(!modalVisible)}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Octicons name="arrow-switch" size={22} color="gray" />
          <Text style={{ fontSize: 15, fontWeight: "500", marginLeft: 8 }}>
            Sort
          </Text>
        </Pressable>

        <Pressable style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="filter" size={22} color="gray" />
          <Text style={{ fontSize: 15, fontWeight: "500", marginLeft: 8 }}>
            Filter
          </Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate("Map", {
          searchResults: searchPlaces,
        })} style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome5 name="map-marker-alt" size={22} color="gray" />
          <Text style={{ fontSize: 15, fontWeight: "500", marginLeft: 8 }}>
            Map
          </Text>
        </Pressable>
      </Pressable>

      <ScrollView
        style={{ backgroundColor: "#F5F5F5" }}>
        {sortedData.map((item) => (
          <PropertyCard
            rooms={route.params.rooms}
            children={route.params.children}
            adults={route.params.adults}
            selectedDates={route.params.selectedDates}
            city={route.params.city}
            item={item}
          ></PropertyCard>

        ))}

      </ScrollView>

      <BottomModal
        onBackdropPress={() => setModalVisible(!modalVisibile)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        footer={
          <ModalFooter>
            <Pressable
              onPress={() => applyFilter(selectedFilter)}
              style={{
                paddingRight: 10,
                marginLeft: "auto",
                marginRight: "auto",
                marginVertical: 10,
                marginBottom: 30
              }}
            >
              <Text>Apply</Text>
            </Pressable>
          </ModalFooter>
        }
        modalTitle={<ModalTitle title="Sort and Filter" />}
        modalAnimation={new SlideAnimation({
          slideFrom: "bottom"
        })}
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}
      >
        <ModalContent style={{ width: "100%", height: 280 }}>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                marginVertical: 10,
                flex: 2,
                height: 280,
                borderRightWidth: 1,
                borderColor: "#E0E0E0",
              }}
            >
              <Text style={{ textAlign: "center" }}>Sort </Text>
            </View>
            <View style={{ flex: 3 }}>
              {filters.map((filter, index) => (
                <Pressable onPress={() => setSelectedFilter(filter.filter)} style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }} key={index}>
                {selectedFilter.includes(filter.filter)?(
                  <FontAwesome name="circle" size={24} color="black" />
                ):(
                  <Entypo name="circle" size={24} color="black" />
                )}
                  <Text style={{ fontSize: 16, fontWeight: "500", marginLeft: 6 }}>
                    {filter.filter}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </ModalContent>
      </BottomModal>

    </View>
  )

}

export default PlacesScreen;

const styles = StyleSheet.create({});