import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from './screens/Login';
import MainScreen from './screens/MainScreen';
import SignUp from './screens/SignUp';


const stack = createStackNavigator();

const Stacknavigator = () => {
  return (

    <stack.Navigator>
      <stack.Screen
        options={{headerShown: false}}
        name="SignUp"
        component={SignUp}
      />
      <stack.Screen
        options={{headerShown: false}}
        name="Login"
        component={Login}
      />
      <stack.Screen
        options={{headerShown: false}}
        name="MainScreen"
        component={MainScreen}
      />
      

      
    </stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center',   // Center content horizontally
  },
});

export default () => {
  return (
    <NavigationContainer>
      <Stacknavigator />
    </NavigationContainer>
  );
};
