import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList, ScrollView,
} from "react-native";

const NightStayModal = ({
  isVisible,
  onClose,
  onNightStaySelect,
  selectedDate,
}) => {
  const [selectedNightStay, setSelectedNightStay] = useState(1);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const handleNightStayPress = nightStay => {
    setSelectedNightStay(nightStay);
    if (selectedDate) {
      const startDate = new Date(selectedDate);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + nightStay);
      setSelectedEndDate(endDate.toISOString().split('T')[0]);
    } else {
      setSelectedEndDate(null);
    }
  };

  const handleConfirmPress = () => {
    onNightStaySelect(selectedNightStay);
    onClose();
  };

  const windowHeight = Dimensions.get('window').height;
  const modalHeight = windowHeight * 0.5;

  const nightStayOptions = [
    {label: '1 đêm', value: '1 đêm'},
    {label: '2 đêm', value: '2 đêm'},
    {label: '3 đêm', value: '3 đêm'},
    {label: '4 đêm', value: '4 đêm'},
    {label: '5 đêm', value: '5 đêm'},
    {label: '6 đêm', value: '6 đêm'},

    // Thêm các lựa chọn khác tương tự ở đây
  ];

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={[
        styles.nightStayButton,
        selectedNightStay === item.value && styles.selectedButton,
      ]}
      onPress={() => handleNightStayPress(item.value)}>
      <Text style={styles.buttonText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, {height: modalHeight}]}>
          <ScrollView>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chọn số đêm nghỉ</Text>
            <FlatList
              data={nightStayOptions}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles.buttonContainer}
            />
            {selectedEndDate && (
              <Text style={styles.endDateText}>
                Ngày kết thúc: {selectedEndDate}
              </Text>
            )}
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirmPress}>
              <Text style={styles.buttonText}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
  },
  modalContent: {
    paddingTop: 20,
    paddingBottom: 30,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  nightStayButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 5,
    width: '50%',
  },
  selectedButton: {
    backgroundColor: '#0099FF',
    borderColor: '#0099FF',
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
  },
  endDateText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  confirmButton: {
    backgroundColor: '#0099FF',
    borderRadius: 5,
    paddingVertical: 10,
    marginTop: 20,
  },
});

export default NightStayModal;
