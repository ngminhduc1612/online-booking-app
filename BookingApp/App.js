import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './StackNavigator'
import { ModalPortal } from 'react-native-modals';


export default function App() {
  return (
    // <View style={styles.container}>
    <>
    <StackNavigator/>
    <ModalPortal/>
    {/* //   {/* <Text>Open up App.js </Text>
    //   <StatusBar style="auto" />
    // </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
