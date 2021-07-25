import React, { useState, useRef } from 'react';
import {
  Text,
  View,
} from 'react-native';
import styles from './style';
import Login from './Login';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-easy-toast'
import Colors from '../../utils/Colors';
import SignUp from './SignUp';

const index = ({ navigation }) => {
  const [login, isLogin] = useState(true);
  const toast = useRef();

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.TextHeader}>{login ? 'Login' : 'Sign Up'}</Text>
          <Text onPress={() => { isLogin(!login) }} style={styles.TextGreyHeader}>{login ? 'Sign Up' : 'Login'}</Text>
        </View>
        {login ? <Login navigation={navigation} toast={toast} /> : <SignUp navigation={navigation} toast={toast} isLogin={isLogin} />}
      </View>

      <Toast
        ref={toast}
        style={{ backgroundColor: Colors.blue, borderRadius: 7 }}
        position='bottom'
        fadeInDuration={200}
        fadeOutDuration={1000}
        textStyle={{ color: '#fff', textAlign: 'center' }}
      />
    </KeyboardAwareScrollView>
  );
};


export default (index);
