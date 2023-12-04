import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import SearchModal from './SearchModal';
import DatePickerModal from './DatePickerModal';
import NightStayModal from './NightStayModal';
import {format, addDays} from 'date-fns';
import RoomSelectionModal from './RoomSelectionModal';
import PriceSelectionModal from './PriceSelectionModal';

const CustomSort = ({placeholder, style, navigation}) => {
  // const handleBooking = () => {
  //   navigation.navigate('HotelList');
  // };

  const [text, setText] = useState('');
  const handleTextChange = newText => {
    setText(newText);
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isNightStayModalVisible, setIsNightStayModalVisible] = useState(false);
  const [selectedNight, setSelectedNightStay] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [isRoomSelectionModalVisible, setIsRoomSelectionModalVisible] =
    useState(false);
  const [selectedRooms, setSelectedRooms] = useState(0);
  const [selectedAdults, setSelectedAdults] = useState(0);
  const [selectedMinPrice, setSelectedMinPrice] = useState(null);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(null);
  const [selectedStar, setSelectedStar] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [isPriceSelectionModalVisible, setIsPriceSelectionModalVisible] =
    useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const handleLocationSelect = location => {
    setSelectedLocation(location);
    setIsModalVisible(false);
  };

  const showDatePickerModal = () => {
    setIsDatePickerVisible(true);
  };

  const hideDatePickerModal = () => {
    setIsDatePickerVisible(false);
  };

  const handleDateSelect = date => {
    setSelectedDate(date);
    setIsDatePickerVisible(false);

    if (selectedNight) {
      const endDate = addDays(date, selectedNight);
    }
  };

  const showNightStayModal = () => {
    setIsNightStayModalVisible(true);
  };

  const hideNightStayModal = () => {
    setIsNightStayModalVisible(false);
  };

  const handleNightStayPress = nightStay => {
    setSelectedNightStay(nightStay);
    setIsNightStayModalVisible(false);

    // if (selectedDate) {
    //   const endDate = addDays(new Date(selectedDate), nightStay);
    // }
  };

  const showRoomSelectionModal = () => {
    setIsRoomSelectionModalVisible(true);
  };
  const hideRoomSelectionModal = () => {
    setIsRoomSelectionModalVisible(false);
  };

  const handleRoomSelection = (selectedRooms, selectedAdults) => {
    setSelectedRooms(selectedRooms);
    setSelectedAdults(selectedAdults);
  };

  const showPriceSelectionModal = () => {
    setIsPriceSelectionModalVisible(true);
  };

  const handleFilterSelection = (minPrice, maxPrice, star, paymentMethod) => {
    setSelectedMinPrice(minPrice);
    setSelectedMaxPrice(maxPrice);
    setSelectedStar(star);
    setSelectedPaymentMethod(paymentMethod);
  };

  // const selectedCheckInDate = selectedDate ? selectedDate : 'Ngày nhận phòng';
  // const selectedNumberOfNights = selectedNight ? selectedNight : 'Số đêm';
  // const selectedNumberOfGuestsAndRooms = `${selectedRooms} phòng, ${selectedAdults} người lớn`;
  const handleSearch = searchParams => {
    navigation.navigate('HotelList', {searchParams});
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        padding: 10,
        width: 400
      }}>
      <View style={styles.placeView}>
        <View>
          <View style={styles.container0}>
            <TouchableOpacity onPress={showModal}>
              <Image
                source={require('../assets/icons/icon_location.png')}
                style={styles.iconLocation}
              />
            </TouchableOpacity>
            <SearchModal
              isVisible={isModalVisible}
              onClose={hideModal}
              onLocationSelect={handleLocationSelect}
            />

            <Text style={styles.text}>Điểm đến, Khách sạn</Text>
          </View>
          <View style={styles.container2}>
            <Text style={styles.dayText}>
              {selectedLocation ? selectedLocation : 'Điểm đến, Khách sạn'}
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <Image
            style={styles.iconGPS}
            source={require('../assets/icons/icon_gps.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.dayView}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <View style={styles.container}>
              <TouchableOpacity onPress={showDatePickerModal}>
                <Image
                  source={require('../assets/icons/icon_calendar.png')}
                  style={styles.iconCalendar}
                />
              </TouchableOpacity>
              {isDatePickerVisible && (
                <DatePickerModal
                  isVisible={isDatePickerVisible}
                  onClose={hideDatePickerModal}
                  onDateSelect={handleDateSelect}
                />
              )}
              <Text style={styles.text}>Ngày Nhận Phòng</Text>
            </View>
            <View style={styles.bookingDay}>
              <Text style={styles.dayText}>
                {selectedDate ? selectedDate : 'Ngày nhận phòng'}
              </Text>
            </View>
          </View>
          <View>
            <View style={styles.container3}>
              <TouchableOpacity onPress={showNightStayModal}>
                <Image
                  source={require('../assets/icons/icon_night.png')}
                  style={styles.iconNight}
                />
              </TouchableOpacity>
              <Text style={styles.text}>Số đêm nghỉ</Text>
            </View>
            <View style={styles.nightRelax}>
              <Text style={styles.dayText}>
                {selectedNight ? selectedNight : 'Số đêm'}
              </Text>
            </View>
          </View>
          {isNightStayModalVisible && (
            <NightStayModal
              isVisible={isNightStayModalVisible}
              onClose={hideNightStayModal}
              onNightStaySelect={handleNightStayPress}
            />
          )}
        </View>
      </View>
      <View style={styles.roomNumberView}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            style={{height: 30, width: 30}}
            onPress={showRoomSelectionModal}>
            <Image
              source={require('../assets/icons/icon_room_booking.png')}
              style={styles.iconRoomBooking}
            />
          </TouchableOpacity>
          <Text style={styles.text}>Số người và số khách</Text>
        </View>
        <View style={styles.roomBooking}>
          <Text
            style={
              styles.dayText
            }>{`${selectedRooms} phòng, ${selectedAdults} người lớn`}</Text>
        </View>
      </View>

      {isRoomSelectionModalVisible && (
        <RoomSelectionModal
          isVisible={isRoomSelectionModalVisible}
          onClose={hideRoomSelectionModal}
          onRoomSelection={handleRoomSelection}
        />
      )}
      <View style={styles.sortTypeView}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={showPriceSelectionModal}>
            <Image
              source={require('../assets/icons/icon_sort.png')}
              style={styles.iconSort}
            />
          </TouchableOpacity>

          <Text style={styles.text}>Filter</Text>
        </View>
        <View style={styles.bookingDay}>
          <Text style={styles.dayText}>
            {selectedMinPrice && selectedMaxPrice
              ? `${selectedMinPrice} VND - ${selectedMaxPrice} VND`
              : 'Min giá - Max giá'}
          </Text>
          {selectedStar && (
            <Text style={styles.dayText}>, {selectedStar} Sao</Text>
          )}
          {selectedPaymentMethod && (
            <Text style={styles.dayText}>, {selectedPaymentMethod}</Text>
          )}
        </View>
      </View>

      {isPriceSelectionModalVisible && (
        <PriceSelectionModal
          isVisible={isPriceSelectionModalVisible}
          onClose={() => setIsPriceSelectionModalVisible(false)}
          onConfirm={handleFilterSelection}
        />
      )}
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            backgroundColor: '#1A94FF',
            height: 40,
            width: 250,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}
          // eslint-disable-next-line no-undef
          onPress={() =>
            handleSearch({
              nights: 2,
              departureDate: selectedDate,
              adults: selectedAdults,
              rooms: selectedRooms,
            })
          }>
          <Text style={styles.findText}>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomSort;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container0: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 320,
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
  },
  iconLocation: {
    height: 30,
    width: 30,
    tintColor: 'grey',
  },
  iconGPS: {
    height: 30,
    width: 30,
    tintColor: 'grey',
    marginLeft: 15,
    marginBottom: 10,
  },
  iconCalendar: {
    height: 30,
    width: 30,
    tintColor: 'grey',
  },
  iconNight: {
    height: 30,
    width: 30,
    tintColor: 'grey',
  },
  text: {
    fontSize: 17,
  },
  inputText: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    // borderColor: 'grey',
    // borderWidth: 1,
    fontSize: 15,
    fontWeight: 'bold',
  },
  placeView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'grey',
    height: 90,
    margin: 5,
  },
  dayView: {
    borderBottomWidth: 1,
    borderColor: 'grey',
    height: 75,
    margin: 5,
  },
  dayText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  bookingDay: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
  },
  nightRelax: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
  },
  container3: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  roomNumberView: {
    borderBottomWidth: 1,
    borderColor: 'grey',
    height: 60,
    margin: 5,
  },
  iconRoomBooking: {
    height: 140,
    width: 140,
    tintColor: 'grey',
    bottom: 57,
    right: 48,
  },
  roomBooking: {
    marginLeft: 30,
  },
  sortTypeView: {
    height: 60,
    margin: 5,
  },
  iconSort: {
    height: 30,
    width: 30,
    tintColor: 'grey',
  },
  sortText: {
    marginLeft: 30,
  },
  findText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
});
