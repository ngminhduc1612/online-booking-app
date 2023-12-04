import React, {useState} from 'react';
import {
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

const CustomTextInput = ({
  placeholder,
  style,
  secure,
  keyboardType,
  imageSource,
  text,
  setText
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleSecureEntry = () => {
    setShowPassword(!showPassword);
  };

  const handleTextChange = newText => {
    if (setText) {
      setText(newText);
    }
  };
  const isPassword = () => {
    return secure;
  };

  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={styles.inputText}
        secureTextEntry={isPassword() && !showPassword}
        placeholder={placeholder}
        placeholderTextColor="#9F9F9F"
        onChangeText={handleTextChange}
        value={text}
        keyboardType={keyboardType}
      />
      {isPassword() ? (
        <TouchableOpacity
          style={styles.btnSecure}
          onPress={toggleSecureEntry}
          activeOpacity={1}>
          <Image
            source={
              showPassword
                ? require('../assets/icons/icon_eye_on.png')
                : require('../assets/icons/icon_eye.png')
            }
            tintColor="#949494"
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity>
          <Image style={styles.icon} source={imageSource} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  inputText: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  btnSecure: {
    padding: 10,
  },
  icon: {
    height: 30,
    width: 30,
    marginRight: 10,
  },
});

export default CustomTextInput;
