import React from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';

const FamousPlaces = () => {
  const places = [
    {
      id: 1,
      name: 'Địa điểm 1',
      image: require('../assets/images/onboarding1.png'),
    },
    {
      id: 2,
      name: 'Địa điểm 1',
      image: require('../assets/images/onboarding1.png'),
    },
    {
      id: 3,
      name: 'Địa điểm 1',
      image: require('../assets/images/onboarding1.png'),
    },
    {
      id: 4,
      name: 'Địa điểm 1',
      image: require('../assets/images/onboarding1.png'),
    },
    // {id: 2, name: 'Địa điểm 2', image: require('../assets/images/place2.png')},
    // {id: 3, name: 'Địa điểm 3', image: require('../assets/images/place3.png')},
    // Thêm các địa điểm khác vào đây
  ];

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.placeImage} />
      <Text style={styles.placeName}>{item.name}</Text>
    </View>
  );

  return (
    <FlatList
      data={places}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: 150,
    marginRight: 10,
    alignItems: 'center',
  },
  placeImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 5,
  },
  placeName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default FamousPlaces;
