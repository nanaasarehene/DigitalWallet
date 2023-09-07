import React from 'react';
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
} from 'react-native';
import {SIZES, icons, images, FONTS} from '../constants';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../constants/theme';

//define functional component for the signup screen
const SignUp = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{flex: 1}}>
      <LinearGradient
        colors={[COLORS.lime, COLORS.emerald]}
        style={{flex: 1}}>
          
        </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
