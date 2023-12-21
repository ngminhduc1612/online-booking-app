import { Pressable, ScrollView, ScrollViewBase, ScrollViewComponent, StyleSheet, Text, TextInputComponent, View, Button } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import Header from "../components/Header";
import { Feather } from '@expo/vector-icons';
import { TextInput } from "react-native";
import DatePicker from "react-native-date-ranges";
import { BottomModal, ModalButton, ModalContent, ModalFooter, ModalTitle, SlideAnimation } from "react-native-modals";



const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedDates, setSelectedDates] = useState()
  const [rooms, setRooms] = useState(1)
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [modalVisible, setModalVisible] = useState(false)
  console.log[selectedDates]
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

  const customButton = (onConfirm) => {
    return (
      <Button
        onPress={onConfirm}
        style={{
          container: { width: "80%", marginHorizontal: "3%" },
          text: { fontSize: 20 },
        }}
        primary
        title="Submit"
      />
    );
  };

  return (
    <>
      <View>
        <Header />
        <ScrollView>
          <View style={{
            margin: 20,
            borderColor: "#FFC72C",
            borderWidth: 3,
            borderRadius: 6,
          }}>
            <Pressable style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              paddingHorizontal: 10,
              borderColor: "#FFC72C",
              borderWidth: 2,
              paddingVertical: 15,
            }}>

              <Feather name="search" size={24} color="black" />
              <TextInput placeholderTextColor="black" placeholder="Enter your destination" />
            </Pressable>

            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                paddingHorizontal: 10,
                borderColor: "#FFC72C",
                borderWidth: 2,
                paddingVertical: 15,
              }}
            >
              <Feather name="calendar" size={24} color="black" />

              <DatePicker
                style={{ width: 350, height: 30, borderRadius: 0, borderWidth: 0, borderColor: "transparent" }}
                customStyles={{
                  placeholderText: { fontSize: 15, flexDirection: "row", alignItems: "center", marginRight: "auto" },
                  headerStyle: {
                    backgroundColor: "#003580"
                  },
                  contentText: {
                    fontSize: 15, flexDirection: "row", alignItems: "center", marginRight: "auto"
                  }
                }}
                selectedBgColor="#0047AB"
                customButton={(onConfirm) => customButton(onConfirm)}
                onConfirm={(startDate, endDate) => setSelectedDates(startDate, endDate)}
                allowFontScaling={false} // optional
                placeholder={'Apr 27, 2018 → Jul 10, 2018'}
                mode={'range'}
              />
            </Pressable>

            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                paddingHorizontal: 10,
                borderColor: "#FFC72C",
                borderWidth: 2,
                paddingVertical: 15,
              }}
            >
              <Ionicons name="person-outline" size={24} color="black" />
              <TextInput placeholderTextColor="red" placeholder="1 room - 2 adults - 0 children" />
            </Pressable>

            <Pressable
              style={{
                paddingHorizontal: 10,
                borderColor: "#FFC72C",
                borderWidth: 2,
                paddingVertical: 15,
                backgroundColor: "#2a52be"
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 15, fontWeight: "500", color: "white" }}>Search</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>

      <BottomModal
        swipeThreshold={200}
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={['up', 'down']}
        footer={<ModalFooter>
          <ModalButton text="Apply" style={{ marginBottom: 20, color: "white", backgroundColor: "#003580" }}
            onPress={() => setModalVisible(!modalVisible)}
          />
        </ModalFooter>
        }
        modalTitle={<ModalTitle title="Select rooms and guests" />}
        modalAnimation={new SlideAnimation({
          slideFrom: "bottom"
        })}
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}
      >
        <ModalContent style={{ width: "100", height: 310 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 15,
            }}>
            <Text style={{fontSize:16,fontWeight:"500"}}>Rooms</Text>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10
              }}>
              <Pressable
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  backgroundColor: "#E0E0E0"
                }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    paddingHorizontal: 6
                  }}
                >-</Text>
              </Pressable>

              <Pressable>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    fontWeight: "500",
                    paddingHorizontal: 6
                  }}
                >{rooms}</Text>
              </Pressable>

              <Pressable
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  backgroundColor: "#E0E0E0"
                }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    paddingHorizontal: 6
                  }}
                >+</Text>
              </Pressable>
            </Pressable>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 15,
            }}>
            <Text style={{
              fontSize:16,
              fontWeight:"500"
              }}
              >Adults</Text>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10
              }}>
              <Pressable
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  backgroundColor: "#E0E0E0"
                }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    paddingHorizontal: 6
                  }}
                >-</Text>
              </Pressable>

              <Pressable>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    fontWeight: "500",
                    paddingHorizontal: 6
                  }}
                >{rooms}</Text>
              </Pressable>

              <Pressable
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  backgroundColor: "#E0E0E0"
                }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    paddingHorizontal: 6
                  }}
                >+</Text>
              </Pressable>
            </Pressable>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 15,
            }}>
            <Text style={{
              fontSize:16,
              fontWeight:"500"
              }}
              >Children</Text>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10
              }}>
              <Pressable
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  backgroundColor: "#E0E0E0"
                }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    paddingHorizontal: 6
                  }}
                >-</Text>
              </Pressable>

              <Pressable>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    fontWeight: "500",
                    paddingHorizontal: 6
                  }}
                >{rooms}</Text>
              </Pressable>

              <Pressable
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  backgroundColor: "#E0E0E0"
                }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    paddingHorizontal: 6
                  }}
                >+</Text>
              </Pressable>
            </Pressable>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
}

export default HomeScreen

const styles = StyleSheet.create({})