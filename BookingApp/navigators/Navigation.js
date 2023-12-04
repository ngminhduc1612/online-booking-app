import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Onboarding1 from '../screens/Onboarding1/Onboarding1';
import Onboarding2 from '../screens/Onboarding2/Onboarding2';
import Login from '../screens/Login/Login';
import Onboarding3 from '../screens/Onboarding3/Onboarding3';
import SignUp from '../screens/SignUp/SignUp';
import ForgotPassword from '../screens/ForgotPassword/ForgotPassword';
import AddPhoneNumber from '../screens/SignUp/AddPhoneNumber';
import GetStart from '../screens/GetStart/GetStart';
import Home from '../screens/Main/Home/Home';
import Explore from '../screens/Main/Explore/Explore';
import MyBooking from '../screens/Main/MyBoooking/MyBooking';
import Saved from '../screens/Main/Saved/Saved';
import UserInfo from '../screens/Main/UserInfo/UserInfo';
import EnterPhone from '../screens/ForgotPassword/EnterPhone';
import VerifyCode from '../screens/ForgotPassword/VerifyCode';
import HotelList from '../screens/HotelList/HotelList';
import DetailHotel from '../screens/DetailHotel/DetailHotel';
import BookingScreen from '../screens/BookingScreen/BookingScreen';
import SuccessScreen from '../screens/SuccessScreen/SuccessScreen';
import RoomsScreen from "../screens/RoomsScreen/RoomsScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
function HomeTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        tabBarActiveTintColor: '#3399FF', // Màu sắc của tab được chọn
        tabBarInactiveTintColor: 'black', // Màu sắc của các tab không được chọn
        tabBarLabelStyle: {fontSize: 12}, // Style của văn bản tab
        tabBarStyle: [{display: 'flex', justifyContent: 'space-between'}, null], // Style của tabBar chính
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/icons/icon_home.png')}
              style={
                (styles.homeIcon, {tintColor: focused ? '#3399FF' : 'black'})
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/icons/icon_explore.png')}
              style={
                (styles.exploreIcon, {tintColor: focused ? '#3399FF' : 'black'})
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyBooking"
        component={MyBooking}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/icons/icon_mybooking.png')}
              style={
                (styles.mybookingIcon,
                {tintColor: focused ? '#3399FF' : 'black'})
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Saved"
        component={Saved}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/icons/icon_saved.png')}
              style={
                (styles.savedIcon, {tintColor: focused ? '#3399FF' : 'black'})
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="UserInfo"
        component={UserInfo}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/icons/icon_user.png')}
              style={
                (styles.userIcon, {tintColor: focused ? '#3399FF' : 'black'})
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function Navigation() {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding1"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <Stack.Screen name="Onboarding1" component={Onboarding1} />
      <Stack.Screen name="Onboarding2" component={Onboarding2} />
      <Stack.Screen name="Onboarding3" component={Onboarding3} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="AddPhoneNumber" component={AddPhoneNumber} />
      <Stack.Screen name="GetStart" component={GetStart} />
      <Stack.Screen name="Home" component={HomeTabNavigator} />
      <Stack.Screen name="EnterPhone" component={EnterPhone} />
      <Stack.Screen name="VerifyCode" component={VerifyCode} />
      <Stack.Screen name="HotelList" component={HotelList} />
      <Stack.Screen name="DetailHotel" component={DetailHotel} />
      <Stack.Screen name="BookingScreen" component={BookingScreen} />
      <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
      <Stack.Screen name="RoomsScreen" component={RoomsScreen}/>
    </Stack.Navigator>
  );
}

export default Navigation;
const styles = StyleSheet.create({
  homeIcon: {
    width: 25,
    height: 25,
  },
  exploreIcon: {
    width: 20,
    height: 20,
  },
  userIcon: {
    width: 25,
    height: 25,
  },
  savedIcon: {
    width: 25,
    height: 25,
  },
  mybookingIcon: {
    width: 25,
    height: 25,
  },
});
