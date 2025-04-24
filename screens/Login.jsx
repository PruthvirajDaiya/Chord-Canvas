import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Button
} from 'react-native';
import * as Font from 'expo-font';
import Feather from '@expo/vector-icons/Feather';
import Foundation from '@expo/vector-icons/Foundation';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Login = ({ navigation }) => { // Add navigation prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fontLoaded, setFontLoaded] = useState(false);``
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Zain: require('../assets/fonts/Zain-ExtraBold.ttf'),
      });
      setFontLoaded(true);
    }
    loadFonts();
  }, []);

  const handleLogin = () => {
    console.log('Login attempted with:', { email, password });
  };

  const goToSignUp = () => {
    // Navigate to MainScreen on button press
    navigation.navigate('SignUp');
  };

  const LogIN = () => {
    console.log("Login Function Called!");
    fetch('http://192.168.31.96:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: email,  // Using the email field as the username
        password: password,
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Response from server:', data);
      // If login is successful, navigate to MainScreen
      if (data.txt === "success login") {
        navigation.navigate('MainScreen');
      } else {
        console.log("Login failed");
        // You can add code to show an error message here
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  const skipToMain = () => {
    // Navigate to MainScreen on button press
    navigation.navigate('MainScreen');
  };

  if (!fontLoaded) {
    return null;
  }
  return (
    <ImageBackground
      source={require('../assets/chord-canvas-images/piano.jpg')}
      style={styles.background}
    >     
      <View style={styles.container}>
        
        <View style={styles.logoContainer}>
        </View>

        <View style={styles.inputContainer}>
        <Image
            source={require('../assets/chord-canvas-images/Chord Canvas Logo No-BG.png')}
            style={styles.logoImage}
          />
          <View style={styles.userIcon}>
            <Feather name="user" size={25} color="white" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email / Username"
              placeholderTextColor="#FFFFFF"
              value={email}
              color={'white'}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.keyIcon}>
            <Foundation name="key" size={25} color="white" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={!passwordVisible}
              placeholderTextColor="#FFFFFF"
              color={'white'}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              style={styles.eyeIcon}
            >
              <Icon
                name={passwordVisible ? 'visibility' : 'visibility-off'}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.loginButton} onPress={LogIN}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signUpButton} onPress={goToSignUp}>
            <Text style={styles.loginButtonText}>Don't Have an Account? Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.skipContainer}> 
          <TouchableOpacity
          onPress={skipToMain}>
          <Text style={styles.skipContainer}>Skip</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  skipContainer:{
    marginTop:20,
    height: 40,
    width: 80,
    backgroundColor:'#1A2A3A',
    borderRadius:30,
    textAlign:'center',
    paddingTop:7,
    color:'#ffff',
    fontFamily:'Zain',
    fontSize:18,
    alignItems:'flex-end',
    justifyContent:'flex-end',
    
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
    paddingTop: 20,
  },
  logoImage: {
    position: 'relative',
    width: 200,
    height: 200,
    alignItems: 'center',
  },
  userIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  keyIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'column',
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: 'rgba(212, 212, 212, 0.34)',
    padding: 20,
    elevation: 1,
    alignItems: 'center',
    justifyContent:'center'
  },
  input: {
    height: 50,
    width: 250,
    backgroundColor: '#1A2A3A',
    borderColor: '#4A4A4A',
    borderRadius: 50,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 20,
    fontFamily: 'Zain',
    alignSelf: 'center',
    alignContent: 'center',
    paddingTop:15,
    paddingRight: 40,
    justifyContent:'center',
    alignItems:'center',
    color:'white'
  },
  icon: {
    marginRight: 10,
    paddingBottom: 15,
    alignContent: 'center',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: '35%',
    transform: [{ translateY: -12 }],
  },
  loginButton: {
    backgroundColor: '#1A2A3A',
    paddingVertical: 10,
    borderRadius: 50,
    height: 45,
    width: 100,
    marginTop: 10,
    alignItems: 'center',
    justifyContent:'center'
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Zain',
  },
  signUpButton: {
    backgroundColor: '#1A2A3A',
    paddingVertical: 10,
    borderRadius: 10,
    height: 45,
    width: 250,
    marginTop: 50,
    alignItems: 'center',
    justifyContent:'center'
  },
});

export default Login;