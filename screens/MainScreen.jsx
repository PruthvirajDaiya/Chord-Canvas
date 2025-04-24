import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  ImageBackground,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  // DrawerLayoutAndroid,
  Modal,
  // BackHandler
} from 'react-native';
import Slider from '@react-native-community/slider';
import * as Font from 'expo-font';
import Feather from '@expo/vector-icons/Feather';
import { SelectList } from 'react-native-dropdown-select-list';
import { useFonts, Montserrat_800ExtraBold } from '@expo-google-fonts/montserrat';

const MainScreen = ({navigation}) => {
  const [tempo, setTempo] = useState(120);
  const [inputText, setInputText] = useState('120');
  const [fontLoaded, setFontLoaded] = useState(false);
  const [selected, setSelected] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false); // Added: State for modal visibility
  // const drawer = useRef(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const scaleData = [
    { key: '1', value: 'C Major' },
    { key: '2', value: 'C# Major' },
    { key: '3', value: 'D Major' },
    { key: '4', value: 'D# Major' },
    { key: '5', value: 'E Major' },
    { key: '6', value: 'F Major' },
    { key: '7', value: 'F# Major' },
    { key: '8', value: 'G Major' },
    { key: '9', value: 'G# Major' },
    { key: '10', value: 'A Major' },
    { key: '11', value: 'A# Major' },
    { key: '12', value: 'B Major' },
  ];

  const [fontsLoaded] = useFonts({
    Montserrat_800ExtraBold,
    Pacifico: require('../assets/fonts/Pacifico-Regular.ttf'),
    Zain: require('../assets/fonts/Zain-Regular.ttf'),
  });

  // // Added: Close drawer when the app mounts (i.e., on reopen)
  // useEffect(() => {
  //   if (drawer.current) {
  //     drawer.current.closeDrawer();
  //   }
  // }, []); // Empty dependency array ensures this runs only on mount

  useEffect(() => {
    if (fontsLoaded) {
      setFontLoaded(true);
    }
  }, [fontsLoaded]);

  const handleInputSubmit = () => {
    const numValue = parseInt(inputText) || 60;
    const clampedValue = Math.min(Math.max(numValue, 60), 180);
    setTempo(clampedValue);
    setInputText(clampedValue.toString());
  };

  // const navigationView = () => (
  //   <View style={styles.navigationContainer}>
  //     <Text style={styles.navigationTitle}>Chord Canvas</Text>
  //     <TouchableOpacity style={styles.navigationItemContainer} onPress={() => drawer.current.closeDrawer()}>
  //       <Text style={styles.navigationItemText}>Saved</Text>
  //     </TouchableOpacity>
  //     <TouchableOpacity style={styles.navigationItemContainer} onPress={goToLogin}>
  //       <Text style={styles.navigationItemText}>Log Out</Text>
  //     </TouchableOpacity>
  //     <TouchableOpacity style={styles.navigationItemContainer} onPress={handleExit}>
  //       <Text style={styles.navigationItemText}>Exit</Text>
  //     </TouchableOpacity>
  //   </View>
  // );

  const goToLogin = () => {
    navigation.navigate('Login');
  }
  // Added: Functions to handle save format selection
  const handleSaveWav = () => {
    console.log('Saving as WAV');
    setIsModalVisible(false);
    // Add your WAV saving logic here
  };

  const handleSaveMidi = () => {
    console.log('Saving as MIDI');
    setIsModalVisible(false);
    // Add your MIDI saving logic here
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const openDrawer = () => {
    drawer.current.openDrawer();
  };

  if (!fontLoaded) {
    return null;
  }

  return (
      // <DrawerLayoutAndroid
      //   ref={drawer}
      //   drawerWidth={250}
      //   drawerPosition="left"
      //   renderNavigationView={navigationView}
      // >
        
        <ImageBackground
          source={require('../assets/chord-canvas-images/piano.jpg')}
          style={styles.backgroundImage}
        >
          <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.icon}>
                <TouchableOpacity onPress={openDrawer}>
                  <Feather name="menu" size={30} color="#DDA853" />
                </TouchableOpacity>
              </View>
              <Text style={styles.headerText}>Chord Canvas</Text>
            </View>

            <View style={styles.chordNameContainer}>
              <Text style={styles.nameContainer}>Chords</Text>
            </View>

            {/* Main Section */}
            <View style={styles.chordsContainer}>
              <TouchableOpacity>
                <View style={styles.chordBoxFirst}>
                  <Text style={styles.chordName}>Cm</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.chordBox}>
                  <Text style={styles.chordName}>G</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.chordBox}>
                  <Text style={styles.chordName}>D</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.chordBoxLast}>
                  <Text style={styles.chordName}>Em</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.tempoAndScaleContainer}>
              <View style={styles.tempoBox}>
                <Text style={styles.tempoLabel}>TEMPO</Text>
                <TextInput
                  style={styles.tempoValue}
                  placeholder=""
                  keyboardType="numeric"
                  value={inputText}
                  onChangeText={(text) => setInputText(text)}
                  onBlur={handleInputSubmit}
                />
                <Slider
                  style={styles.slider}
                  minimumValue={60}
                  maximumValue={180}
                  value={tempo}
                  onValueChange={(value) => setInputText(Math.round(value).toString())}
                  onSlidingComplete={(value) => setTempo(Math.round(value))}
                  thumbTintColor="white"
                  minimumTrackTintColor="white"
                  maximumTrackTintColor="white"
                />
              </View>
              <View style={styles.scaleDropdown}>
                <Text style={styles.scaleLabel}>SCALE</Text>
                <SelectList
                  setSelected={(val) => setSelected(val)}
                  data={scaleData}
                  defaultOption={{ key: '1', value: 'C Major' }}
                  save="value"
                  search={false}
                  boxStyles={styles.selectBox}
                  inputStyles={styles.selectInput}
                  dropdownStyles={styles.selectDropdown}
                  dropdownItemStyles={styles.selectItem}
                  dropdownTextStyles={styles.selectText}
                  disabledItemStyles={styles.disabledItem}
                  disabledTextStyles={styles.disabledText}
                  onDropdownShow={() => setIsDropdownOpen(true)} // Update state when dropdown opens
                  onDropdownClose={() => setIsDropdownOpen(false)}
                />
              </View>
            </View>

              <View style={styles.generateAndSaveButtonContainer}>
                <TouchableOpacity>
                  <View style={styles.generateButton}>
                    <Text style={styles.generateText}>GENERATE</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                  <View style={styles.saveButton}>
                    <Text style={styles.saveText}>SAVE</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <Modal
            animationType="fade"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={closeModal}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Choose Save Format</Text>
                <TouchableOpacity onPress={handleSaveWav}>
                  <View style={styles.modalButton}>
                    <Text style={styles.modalButtonText}>Save as .wav</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSaveMidi}>
                  <View style={styles.modalButton}>
                    <Text style={styles.modalButtonText}>Save as .midi</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={closeModal}>
                  <View style={styles.modalCancelButton}>
                    <Text style={styles.modalCancelText}>Cancel</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
              
          </View>
        </ImageBackground>
      // </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 1,
    height:'100%',
    width:'100%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    height:'10%',
    alignItems: 'center',
    backgroundColor: 'rgba(26, 42, 58, 1)',
    paddingTop:15,
    color: 'black',
  },
  headerText: {
    fontSize: 30,
    fontFamily: 'Pacifico',
    color: '#211816',
    marginLeft: 10,
    paddingLeft: 45,
  },
  icon: {
    paddingLeft: 15,
    alignContent: 'center',
    paddingTop: 10,
  },
  chordNameContainer: {
    marginTop: 50,
    justifyContent: 'center',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: 'rgba(212, 212, 212, 0.34)',
    flexDirection: 'row',
    marginHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 0,
  },
  nameContainer: {
    fontFamily: 'Pacifico',
    fontSize: 30,
    position: 'relative',
    color: '#211816',
  },
  chordsContainer: {
    paddingVertical: 15,
    justifyContent: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: 'rgba(212, 212, 212, 0.34)',
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  chordBox: {
    backgroundColor: 'rgba(26, 42, 58, 1)',
    justifyContent: 'space-evenly',
    paddingVertical: 90,
    alignItems: 'center',
    width: 50,
    marginRight: 25,
    marginLeft: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  chordBoxFirst: {
    backgroundColor: 'rgba(26, 42, 58, 1)',
    justifyContent: 'space-evenly',
    paddingVertical: 90,
    alignItems: 'center',
    width: 50,
    marginRight: 20,
    marginHorizontal: 20,
    marginTop: 10,
  },
  chordBoxLast: {
    backgroundColor: 'rgba(26, 42, 58, 1)',
    justifyContent: 'space-evenly',
    paddingVertical: 90,
    alignItems: 'center',
    width: 50,
    marginRight: 20,
    marginLeft: 5,
    marginTop: 10,
    marginBottom: 30,
  },
  chordName: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'Zain',
    fontWeight: 'bold',
  },
  tempoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tempoAndScaleContainer: {
    marginTop: 10,
    flexDirection: 'row',
    height: '130',
    marginHorizontal: '10',

  },
  tempoBox: {
    padding: 10,
    borderRadius: 10,
    width: '50%',
    height: '90%',
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 5,
    marginVertical: 10,
  },
  tempoLabel: {
    color: 'white',
    fontFamily: 'Montserrat_800ExtraBold',
    fontSize: 18,
  },
  tempoValue: {
    color: 'rgba(26, 42, 58, 1)',
    fontSize: 16,
    backgroundColor: 'rgba(221, 168, 83, 0.89)',
    width: '50%',
    height: '40%',
    margin: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  slider: {
    width: '100%',
    height: 40,
    marginTop: 10,
  },
  scaleDropdown: {
    flexDirection: 'column',
    paddingTop: 10,
    borderRadius: 10,
    paddingLeft:20,
    alignContent: 'center',
    // zIndex: 1,
  },
  scaleLabel: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontFamily: 'Montserrat_800ExtraBold',
    fontSize: 18,
    paddingTop: 10,
    paddingRight: 100,

  },
  selectBox: {
    width: '60%',
  },
  selectInput: {
    color: 'rgba(26, 42, 58, 1)',
    fontSize: 20,
    fontFamily: 'Zain',
  },
  selectDropdown: {
    backgroundColor: 'rgba(221, 168, 83, 0.89)',
    marginTop: 2,
    width: '60%',
    height:'85%'
  },
  selectItem: {
    padding: 10,
  },
  selectText: {
    color: '#211816',
    fontSize: 18,
    fontFamily: 'Zain',
  },
  generateAndSaveButtonContainer: {
    // backgroundColor:'blue',
    flexDirection:'row',
    height: '60',
    // alignItems: 'center',
    // alignContent: 'center',
    marginTop: 100,
    marginBottom: 30,
    marginLeft: 20,
    marginRight: 20,
  },
  generateButton: {
    backgroundColor: 'rgba(26, 42, 58, 1)',
    justifyContent: 'center',
    width: 150,
    height: 40,
    alignContent: 'center',
    marginTop: 10,
    marginLeft:10,
    borderRadius: 20,
    marginBottom: 20,
    borderStyle:'solid',
    borderColor:'white',
    borderWidth:3,
  },
  saveButton: {
    backgroundColor: 'rgba(26, 42, 58, 1)',
    justifyContent: 'center',
    width: 100,
    height: 40,
    alignContent: 'center',
    marginTop: 10,
    marginLeft:35,
    borderRadius: 20,
    marginBottom: 20,
    borderStyle:'solid',
    borderColor:'white',
    borderWidth:3,
  },
  generateText: {
    paddingTop:3,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Montserrat_800ExtraBold',
    fontSize: 19,
    paddingBottom:5,
  },
  saveText: {
    paddingTop:3,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Montserrat_800ExtraBold',
    fontSize: 19,
    paddingBottom:5,
  },
  navigationContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(26, 42, 58, 1)',
  },
  navigationTitle: {
    fontSize: 24,
    color: '#DDA853',
    fontFamily: 'Pacifico',
    marginBottom: 20,
  },
  navigationItemContainer: {
    padding: 10, // Added: Centralized padding for menu items
  },
  navigationItemText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Zain',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
  },
  modalContainer: {
    backgroundColor: 'rgba(26, 42, 58, 1)',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    alignItems: 'center',
    // borderColor: 'white',
    // borderWidth: 2,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Montserrat_800ExtraBold',
    color: 'white',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: 'rgba(221, 168, 83, 0.89)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    width: 200,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    fontFamily: 'Montserrat_800ExtraBold',
    color: '#211816',
  },
  modalCancelButton: {
    backgroundColor: 'rgba(212, 212, 212, 0.34)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    width: 200,
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: 16,
    fontFamily: 'Montserrat_800ExtraBold',
    color: '#211816',
  },
});

export default MainScreen;
