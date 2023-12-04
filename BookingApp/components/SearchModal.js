import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  Animated,
  Dimensions,
} from 'react-native';

const SearchModal = ({isVisible, onClose, onLocationSelect}) => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState([
    'Hà Nội',
    'Hồ Chí Minh',
    'Đà Nẵng',
  ]);

  const provinces = [
    'Hồ Chí Minh',
    'Hà Nội',
    'Đà Nẵng',
    'Bình Dương',
    'Cần Thơ',
    'Đồng Nai',
    'Gia Lai',
    'Hà Giang',
    'Hà Nam',
    'Hà Tĩnh',
    'Hải Dương',
    'Hải Phòng',
    'Hòa Bình',
    'Hậu Giang',
    'Hưng Yên',
    'Khánh Hòa',
    'Kiên Giang',
    'Kon Tum',
    'Lai Châu',
    'Lào Cai',
    'Lạng Sơn',
    'Lâm Đồng',
    'Long An',
    'Nam Định',
    'Nghệ An',
    'Ninh Bình',
    'Ninh Thuận',
    'Phú Thọ',
    'Phú Yên',
    'Quảng Bình',
    'Quảng Nam',
    'Quảng Ngãi',
    'Quảng Ninh',
    'Quảng Trị',
    'Sóc Trăng',
    'Sơn La',
    'Tây Ninh',
    'Thái Bình',
    'Thái Nguyên',
    'Thanh Hóa',
    'Thừa Thiên Huế',
    'Tiền Giang',
    'Trà Vinh',
    'Tuyên Quang',
    'Vĩnh Long',
    'Vĩnh Phúc',
    'Yên Bái',
    'Bà Rịa - Vũng Tàu',
    'Đắk Lắk',
    'Đắk Nông',
    'Điện Biên',
    'Đồng Tháp',
    'Hậu Giang',
    'Sóc Trăng',
    'Bạc Liêu',
    'Cà Mau',
  ];

  const windowHeight = Dimensions.get('window').height;
  const modalHeight = windowHeight * 0.5;

  useEffect(() => {
    if (searchText.length === 0) {
      setShowSuggestions(false);
    } else {
      const filteredProvinces = provinces.filter(province =>
        province.toLowerCase().includes(searchText.toLowerCase()),
      );

      setSearchResults(filteredProvinces);
      setShowSuggestions(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const handleInputChange = text => {
    setSearchText(text);
  };

  const handleLocationSelect = location => {
    onLocationSelect(location);
    setSearchText(location);
    setShowSuggestions(false);
  };

  const handleModalClose = () => {
    setSearchText('');
    setShowSuggestions(false);
    onClose();
  };

  // eslint-disable-next-line no-unused-vars
  const handleClearSearchHistory = () => {
    setSearchHistory(['Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng']);
  };

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={styles.overlay}>
        <Animated.View style={[styles.modalContainer, {height: modalHeight}]}>
          <View style={styles.headerContainer}>
            <Text style={styles.titleText}>Tìm kiếm địa điểm</Text>
            <TouchableOpacity
              onPress={handleModalClose}
              style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Nhập địa điểm"
              value={searchText}
              onChangeText={handleInputChange}
            />
          </View>
          {showSuggestions && (
            <FlatList
              data={searchResults}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.suggestionItem}
                  onPress={() => handleLocationSelect(item)}>
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={() => (
                <Text style={styles.noResultsText}>Không tìm thấy kết quả</Text>
              )}
            />
          )}
          {!showSuggestions && (
            <>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Lịch sử tìm kiếm</Text>
                <FlatList
                  data={searchHistory}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={styles.suggestionItem}
                      onPress={() => handleLocationSelect(item)}>
                      <Text>{item}</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Địa điểm nổi tiếng</Text>
                <FlatList
                  data={['Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng']}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={styles.suggestionItem}
                      onPress={() => handleLocationSelect(item)}>
                      <Text>{item}</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            </>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = {
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    color: 'blue',
    fontSize: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  suggestionItem: {
    paddingVertical: 8,
  },
  noResultsText: {
    fontStyle: 'italic',
    textAlign: 'center',
  },
};

export default SearchModal;
