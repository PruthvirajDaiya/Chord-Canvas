import React, { useState, useEffect } from 'react';
import {
  View,
  ImageBackground,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Slider from '@react-native-community/slider';
import * as Font from 'expo-font';
import Feather from '@expo/vector-icons/Feather';
import { SelectList } from 'react-native-dropdown-select-list';
import { useFonts, Montserrat_800ExtraBold } from '@expo-google-fonts/montserrat'; // Correct import

const MainScreen = () => {
  const [tempo, setTempo] = useState(120);
  const [inputText, setInputText] = useState('120');
  const [fontLoaded, setFontLoaded] = useState(false);
  const [selected, setSelected] = useState("");
  const styleData = [
    { key: '1', value: 'Dance' },
    { key: '2', value: 'Pop' },
    { key: '3', value: 'Melodic' },
  ];

  // Load fonts with useFonts for Montserrat and custom fonts with Font.loadAsync
  const [fontsLoaded] = useFonts({
    Montserrat_800ExtraBold, // Load Montserrat 800 ExtraBold
    Pacifico: require('../assets/fonts/Pacifico-Regular.ttf'), // Local Pacifico font
    Zain: require('../assets/fonts/Zain-Regular.ttf'), // Assuming Zain is a local font
  });

  useEffect(() => {
    if (fontsLoaded) {
      setFontLoaded(true); // Set fontLoaded to true once all fonts are ready
    }
  }, [fontsLoaded]);

  const handleInputSubmit = () => {
    const numValue = parseInt(inputText) || 60;
    const clampedValue = Math.min(Math.max(numValue, 60), 180);
    setTempo(clampedValue);
    setInputText(clampedValue.toString());
  };

  if (!fontLoaded) {
    return null; // Wait for fonts to load
  }

  return (
    <ImageBackground
      source={require('../assets/chord-canvas-images/piano.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.icon}>
            <TouchableOpacity>
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

        {/* Tempo and Key Section */}
        <View style={styles.tempoContainer}>
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
          <View style={styles.styleDropdown}>
            <Text style={styles.styleLabel}>STYLE</Text>
            <SelectList
              setSelected={(val) => setSelected(val)}
              data={styleData}
              defaultOption={{ key: '1', value: 'Dance' }}
              save="value"
              search={false}
              boxStyles={styles.selectBox}
              inputStyles={styles.selectInput}
              dropdownStyles={styles.selectDropdown}
              dropdownItemStyles={styles.selectItem}
              dropdownTextStyles={styles.selectText}
              disabledItemStyles={styles.disabledItem}
              disabledTextStyles={styles.disabledText}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 1,
    height: '100%',
    width: '100%',
    flex: 1,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    height: '11%',
    alignItems: 'center',
    backgroundColor: 'rgba(26, 42, 58, 1)',
    paddingTop: 20,
    color: 'black',
  },
  headerText: {
    fontSize: 30,
    fontFamily: 'Pacifico', // Using Pacifico as specified
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
    fontFamily: 'Pacifico', // Updated to Montserrat_800ExtraBold
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
    marginBottom:30
  },
  chordName: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'Zain', // Using Zain as specified
  },
  tempoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tempoBox: {
    padding: 10,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  tempoLabel: {
    color: 'white',
    fontFamily: 'Montserrat_800ExtraBold', // Using Zain as specified
    fontSize: 18,
  },
  tempoValue: {
    color: 'rgba(26, 42, 58, 1)',
    fontSize: 16,
    backgroundColor: 'rgba(221, 168, 83, 0.89)',
    width: '50%',
    height: '20%',
    margin: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  styleDropdown: {
    paddingTop: 10,
    borderRadius: 10,
    alignContent: 'center',
  },
  styleLabel: {
    textAlign:'center',
    alignItems:'center',
    justifyContent:'center',
    color: 'white',
    fontFamily: 'Zain', // Using Zain as specified
    fontSize: 22,
    paddingTop: 10,
    paddingRight:100,
  },
  selectBox: {
    width: '55%',
  },
  selectInput: {
    color: 'rgba(26, 42, 58, 1)', // Matches styleLabel
    fontSize: 20,
    fontFamily: 'Zain', // Using Zain as specified
  },
  selectDropdown: {
    backgroundColor: 'rgba(221, 168, 83, 0.89)',
    marginTop: 5,
    width: '60%',
  },
  selectItem: {
    padding: 10,
  },
  selectText: {
    color: '#211816', // Matches nameContainer
    fontSize: 18,
    fontFamily: 'Zain', // Using Zain as specified
  },
});

export default MainScreen;