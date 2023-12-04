import React, {useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const RoomSelectionModal = ({
  isVisible,
  onClose,
  onConfirm,
  onRoomSelection,
}) => {
  const [roomCount, setRoomCount] = useState(1);
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);

  const handleRoomIncrease = () => {
    if (adultCount + childCount + 1 > (roomCount + 1) * 2) {
      alert(
        'Số phòng không được vượt quá số người hoặc mỗi phòng tối đa 2 người',
      );
    } else if (roomCount >= adultCount + childCount) {
      alert('Số phòng không được lớn hơn số người');
    } else {
      setRoomCount(roomCount + 1);
    }
  };

  const handleRoomDecrease = () => {
    if (roomCount > 1) {
      setRoomCount(roomCount - 1);
    }
  };

  const handleAdultIncrease = () => {
    if (adultCount + 1 > roomCount * 2) {
      alert('Mỗi phòng tối đa 2 người lớn và 4 trẻ em');
    } else {
      setAdultCount(adultCount + 1);
    }
  };

  const handleAdultDecrease = () => {
    if (adultCount > 1) {
      setAdultCount(adultCount - 1);
    }
  };

  const handleChildIncrease = () => {
    if (childCount + 1 > roomCount * 4) {
      alert('Mỗi phòng tối đa 2 người lớn và 4 trẻ em');
    } else {
      setChildCount(childCount + 1);
    }
  };

  const handleChildDecrease = () => {
    if (childCount > 0) {
      setChildCount(childCount - 1);
    }
  };

  const handleConfirm = () => {
    // Lấy số lượng phòng và số lượng người lớn đã chọn
    // const selectedRooms = 2; // Thay thế bằng số lượng phòng đã chọn
    // const selectedAdults = 4; // Thay thế bằng số lượng người lớn đã chọn

    // Gọi hàm onRoomSelection truyền số lượng đã chọn về thành phần cha
    onRoomSelection(roomCount, adultCount);
    onClose(); // Close the modal using onClose prop
  };

  const onPressConfirm = () => {
    // Lấy số lượng phòng và số người lớn đã chọn từ thành phần modal của bạn
    const selectedRooms = 2; // Thay thế bằng số lượng phòng đã chọn
    const selectedAdults = 4; // Thay thế bằng số lượng người lớn đã chọn

    // Truyền số lượng đã chọn vào hàm handleRoomSelection
    onRoomSelection(selectedRooms, selectedAdults);
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.section}>
            <Text style={styles.title}>Số lượng phòng</Text>
            <View style={styles.counterContainer}>
              <TouchableOpacity onPress={handleRoomDecrease}>
                <Text style={styles.counterButton}>-</Text>
              </TouchableOpacity>
              <Text style={styles.counter}>{roomCount}</Text>
              <TouchableOpacity onPress={handleRoomIncrease}>
                <Text style={styles.counterButton}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>Số người lớn</Text>
            <View style={styles.counterContainer}>
              <TouchableOpacity onPress={handleAdultDecrease}>
                <Text style={styles.counterButton}>-</Text>
              </TouchableOpacity>
              <Text style={styles.counter}>{adultCount}</Text>
              <TouchableOpacity onPress={handleAdultIncrease}>
                <Text style={styles.counterButton}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>Số trẻ em</Text>
            <View style={styles.counterContainer}>
              <TouchableOpacity onPress={handleChildDecrease}>
                <Text style={styles.counterButton}>-</Text>
              </TouchableOpacity>
              <Text style={styles.counter}>{childCount}</Text>
              <TouchableOpacity onPress={handleChildIncrease}>
                <Text style={styles.counterButton}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirm}>
            <Text style={styles.confirmButtonText}>Xác nhận</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    fontSize: 24,
    color: '#007AFF',
  },
  counter: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  confirmButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RoomSelectionModal;
