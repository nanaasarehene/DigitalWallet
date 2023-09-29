/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';

import images from '../constants/images';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../constants/theme';
import {SIZES} from '../constants/theme';
import icons from '../constants/icons';
import {FONTS} from '../constants/theme';


interface CountryData {
  alpha2Code: string;
  name: string;
  callingCodes: string[];
  flag: string;

}

//define functional component for the signup screen
const SignUp = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [areas, setAreas] = React.useState([]);
  const [selectedArea, setSelectedArea] = React.useState('');
  const [showModal, setShowModal] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);

  const [fullName, setFullName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = useState('');


  //uses effect hooks to watch the countries data
  React.useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        console.log('Data from the API:', data);
        let areaData = data.map((item: CountryData) => {
          return {
            code: item.alpha2Code,
            name: item.name,
            callingCode: `+${item.callingCodes[0]}`,
            flag: `https://www.countryflags.io/${item.alpha2Code}/flat/64.png`,
          };
        });
        console.log('areaData:', areaData);
        setAreas(areaData);

        if (areaData.length >= 0) {
          let defaultData = areaData.filter(a => a.code === 'US');

          if (defaultData.length > 0) {
            setSelectedArea(defaultData[0]);
          }
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  //handle the header label of the sign up form
  function renderHeader() {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: SIZES.padding * 2,
          marginTop: SIZES.padding * 6,
        }}
        onPress={() => console.log('Sign Up')}>
        <Image
          source={icons.back}
          resizeMode="contain"
          style={{
            width: 30,
            height: 30,
            tintColor: COLORS.white,
          }}
        />
        <Text
          style={{
            marginLeft: SIZES.padding * 1.5,
            color: COLORS.white,
            ...FONTS.h4,
            marginRight: SIZES.padding2 * 24,
          }}>
          Sign Up
        </Text>
      </TouchableOpacity>
    );
  }

  //handle and render the logo function for the logo view
  function renderLogo() {
    return (
      <View
        style={{
          marginTop: SIZES.padding * 5,
          height: 100,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={images.walletLogo}
          resizeMode="contain"
          style={{
            width: '20%',
          }}
        />
      </View>
    );
  }

  //handle and render the form view of the name input
  function renderForm() {

    //handle the full name input actios
    const handleFullNameChange = text => {
      const lettersOnly = text.replace(/[^a-zA-Z\s]/g, '');
      if (lettersOnly !== text) {
        Alert.alert('Invalid Input', 'Please enter letters only.');
      }
      setFullName(lettersOnly);
    };

    //handle the phone number input actions
    const handlePhoneNumberChange = (text) => {
      const phoneNumberPattern = /^[0-9]{10}$/;
      if (phoneNumberPattern.test(text)) {
        setPhoneNumber(text);
      } else {
        Alert.alert(
          'Invalid Phone Number',
          'Please enter a valid 10-digit phone number.',
        );
      }
    };

    return (
      <View
        style={{
          marginTop: SIZES.padding * 3,
          marginHorizontal: SIZES.padding * 3,
        }}>
        {/*Full name text inputs view for the signup page *************************************************************/}
        <View style={{marginTop: SIZES.padding * 3}}>
          <Text style={{color: COLORS.lightGray, ...FONTS.body3}}>
            Full name
          </Text>
          <TextInput
            style={{
              marginVertical: SIZES.padding,
              borderBottomColor: COLORS.white,
              borderBottomWidth: 1,
              height: 40,
              color: COLORS.white,
              ...FONTS.body3,
            }}
            placeholder="Enter your Full Name"
            placeholderTextColor={COLORS.white}
            selectionColor={COLORS.white}
            value={fullName}
            onChangeText={handleFullNameChange}
          />
        </View>

        {/*Phone Number input  view for the signup screen**************************************************/}
        <View style={{marginTop: SIZES.padding * 2}}>
          <Text style={{color: COLORS.lightGreen, ...FONTS.body3}}>
            Phone Number
          </Text>

          <View style={{flexDirection: 'row'}}>
            {/****Country Code *********************************************************************/}
            <TouchableOpacity
              style={{
                width: 100,
                height: 50,
                marginHorizontal: 5,
                borderBottomColor: COLORS.white,
                borderBottomWidth: 1,
                flexDirection: 'row',
                ...FONTS.body3,
              }}
              onPress={() => setModalVisible(true)}>
              <View style={{justifyContent: 'center'}}>
                <Image
                  source={icons.down}
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: COLORS.white,
                  }}
                />
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={{uri: selectedArea?.flag}}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                    marginRight: 5,
                  }}
                />

                <Text style={{color: COLORS.white, ...FONTS.body3}}>
                  {selectedArea.callingCode}
                </Text>
              </View>
            </TouchableOpacity>

            {/***Phone Number Input ****************************************************/}
            <TextInput
              style={{
                flex: 1,
                marginVertical: SIZES.padding,
                borderBottomColor: COLORS.white,
                borderBottomWidth: 1,
                height: 40,
                color: COLORS.white,
                ...FONTS.body3,
              }}
              placeholder="Enter phone number"
              placeholderTextColor={COLORS.white}
              selectionColor={COLORS.white}
              keyboardType="numeric"
              value={phoneNumber}
              onChangeText={handlePhoneNumberChange}
            />
          </View>
        </View>

        {/****Password Text input ************************************************** */}
        <View style={{marginTop: SIZES.padding * 2}}>
          <Text style={{color: COLORS.lightGreen, ...FONTS.body3}}>
            Password
          </Text>
          <TextInput
            style={{
              marginVertical: SIZES.padding,
              borderBottomColor: COLORS.white,
              borderBottomWidth: 1,
              height: 40,
              color: COLORS.white,
              ...FONTS.body3,
            }}
            placeholder="Enter password"
            placeholderTextColor={COLORS.white}
            selectionColor={COLORS.white}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 0,
              bottom: 10,
              height: 30,
              width: 30,
            }}
            onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? icons.disable_eye : icons.eye}
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.white,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderButton() {
    return (
      <View style={{margin: SIZES.padding * 3}}>
        <TouchableOpacity
          style={{
            height: 60,
            backgroundColor: COLORS.black,
            borderRadius: SIZES.radius / 1.5,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => console.log('Welcome Home')}>
          <Text style={{color: COLORS.white, ...FONTS.h3}}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }

  /*Render the area codes model functio for the modal ****************/
  function renderAreaCodesModel() {
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          style={{
            padding: SIZES.padding,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => {
            setSelectedArea(item);
            setModalVisible(false);
          }}>
          <Image
            source={{uri: item.flag}}
            style={{
              width: 30,
              height: 30,
              marginRight: 10,
            }}
          />
          <Text style={{...FONTS.body4}}>{item.name}</Text>
        </TouchableOpacity>
      );
    };

    return (
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View
              style={{
                height: 400,
                width: SIZES.width * 0.8,
                backgroundColor: COLORS.lightGreen,
                borderRadius: SIZES.radius,
              }}>
              <FlatList
                data={areas}
                renderItem={renderItem}
                keyExtractor={item => item.code}
                showsVerticalScrollIndicator={false}
                style={{
                  padding: SIZES.padding * 2,
                  marginBottom: SIZES.padding * 2,
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{flex: 1}}>
      <LinearGradient colors={[COLORS.lime, COLORS.emerald]} style={{flex: 1}}>
        <ScrollView>
          {renderHeader()}
          {renderLogo()}
          {renderForm()}
          {renderButton()}
        </ScrollView>
      </LinearGradient>
      {renderAreaCodesModel()}
    </KeyboardAvoidingView>
  );
};

export default SignUp;