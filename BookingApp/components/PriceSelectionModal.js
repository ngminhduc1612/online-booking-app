import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';

const PriceSelectionModal = ({isVisible, onClose, onConfirm}) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedSegment, setSelectedSegment] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const handleConfirm = () => {
    // Kiểm tra nếu không có giá trị nhập vào hoặc không chọn phân khúc khách sạn và phương thức thanh toán
    if (!minPrice || !maxPrice || !selectedSegment || !selectedPaymentMethod) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }

    // Gọi hàm onConfirm truyền các giá trị đã chọn về thành phần cha
    onConfirm(minPrice, maxPrice, selectedSegment, selectedPaymentMethod);
    onClose(); // Đóng modal
  };
  const handleMinPriceChange = text => {
    // Remove non-numeric characters from the input
    const numericText = text.replace(/[^0-9]/g, '');

    // Format the numeric value with thousand separators
    const formattedValue = numericText.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    setMinPrice(formattedValue);
  };

  const handleMaxPriceChange = text => {
    // Remove non-numeric characters from the input
    const numericText = text.replace(/[^0-9]/g, '');

    // Format the numeric value with thousand separators
    const formattedValue = numericText.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    setMaxPrice(formattedValue);
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
            <Text style={styles.title}>Chọn giá tiền</Text>
            <View style={styles.priceInputContainer}>
              <TextInput
                style={styles.priceInput}
                placeholder="Min giá (VND)"
                keyboardType="numeric"
                value={minPrice}
                onChangeText={handleMinPriceChange}
              />
              <TextInput
                style={styles.priceInput}
                placeholder="Max giá (VND)"
                keyboardType="numeric"
                value={maxPrice}
                onChangeText={handleMaxPriceChange}
              />
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>Phân khúc khách sạn</Text>
            <View style={styles.segmentContainer}>
              <TouchableOpacity
                style={[
                  styles.segmentButton,
                  selectedSegment === '1' && styles.segmentButtonSelected,
                ]}
                onPress={() => setSelectedSegment('1')}>
                <Text style={styles.segmentButtonText}>1 Sao</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.segmentButton,
                  selectedSegment === '2' && styles.segmentButtonSelected,
                ]}
                onPress={() => setSelectedSegment('2')}>
                <Text style={styles.segmentButtonText}>2 Sao</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.segmentButton,
                  selectedSegment === '3' && styles.segmentButtonSelected,
                ]}
                onPress={() => setSelectedSegment('3')}>
                <Text style={styles.segmentButtonText}>3 Sao</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.segmentButton,
                  selectedSegment === '4' && styles.segmentButtonSelected,
                ]}
                onPress={() => setSelectedSegment('4')}>
                <Text style={styles.segmentButtonText}>4 Sao</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.segmentButton,
                  selectedSegment === '5' && styles.segmentButtonSelected,
                ]}
                onPress={() => setSelectedSegment('5')}>
                <Text style={styles.segmentButtonText}>5 Sao</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>Phương thức thanh toán</Text>
            <View style={styles.paymentMethodContainer}>
              <TouchableOpacity
                style={[
                  styles.paymentMethodButton,
                  selectedPaymentMethod === 'Trả trước' &&
                    styles.paymentMethodButtonSelected,
                ]}
                onPress={() => setSelectedPaymentMethod('Trả trước')}>
                <Text style={styles.paymentMethodButtonText}>Trả trước</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.paymentMethodButton,
                  selectedPaymentMethod === 'Trả sau' &&
                    styles.paymentMethodButtonSelected,
                ]}
                onPress={() => setSelectedPaymentMethod('Trả sau')}>
                <Text style={styles.paymentMethodButtonText}>Trả sau</Text>
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
  priceInputContainer: {
    flexDirection: 'row',
  },
  priceInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  segmentContainer: {
    flexDirection: 'row',
  },
  segmentButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  segmentButtonSelected: {
    backgroundColor: '#007AFF',
  },
  segmentButtonText: {
    color: '#000',
    textAlign: 'center',
  },
  paymentMethodContainer: {
    flexDirection: 'row',
  },
  paymentMethodButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  paymentMethodButtonSelected: {
    backgroundColor: '#007AFF',
  },
  paymentMethodButtonText: {
    color: '#000',
    textAlign: 'center',
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

export default PriceSelectionModal;
