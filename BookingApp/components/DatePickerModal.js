import React, {useState} from 'react';
import {View, Text, Modal, TouchableOpacity} from 'react-native';
import {Calendar} from 'react-native-calendars';

const DatePickerModal = ({isVisible, onClose, onDateSelect}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const currentDate = new Date().toISOString().split('T')[0];

  const handleModalClose = () => {
    setSelectedDate(null);
    onClose();
  };

  const handleDateSelect = date => {
    setSelectedDate(date.dateString);
    onDateSelect(date.dateString);
  };

  const handleConfirmPress = () => {
    if (selectedDate) {
      onDateSelect(selectedDate);
      onClose();
    }
  };

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.titleText}>Chọn ngày</Text>
            <TouchableOpacity
              onPress={handleModalClose}
              style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
          <Calendar
            onDayPress={handleDateSelect}
            markedDates={{
              [selectedDate]: {
                selected: true,
                selectedColor: 'blue',
              },
            }}
            minDate={currentDate}
          />
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirmPress}>
            <Text style={styles.confirmButtonText}>Xác nhận</Text>
          </TouchableOpacity>
        </View>
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
  confirmButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    paddingVertical: 10,
    marginTop: 10,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
};

export default DatePickerModal;
