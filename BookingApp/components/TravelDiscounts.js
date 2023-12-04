import React from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';

const TravelDiscounts = () => {
  const discountImages = [
    require('../assets/images/anh_du_lich.png'),
    require('../assets/images/anh_du_lich.png'),
    require('../assets/images/anh_du_lich.png'),
    require('../assets/images/anh_du_lich.png'),
    require('../assets/images/anh_du_lich.png'),
    // require('../assets/discounts/discount3.png'),
    // Add more discount images here
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={discountImages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <Image source={item} style={styles.discountImage} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    height: 150,
  },
  discountImage: {
    width: 320, // Kích thước cố định cho ảnh (70% của 300)
    height: 150, // Kích thước cố định cho ảnh (30% của 300)
    marginHorizontal: 10,
    resizeMode: 'cover',
    borderRadius: 10,
  },
});

export default TravelDiscounts;
