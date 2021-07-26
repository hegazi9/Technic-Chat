/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, useRef} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import styles from './style';
import Login from './Login';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-easy-toast';
import Colors from '../../utils/colors';

const index = ({navigation}) => {
  const [login, isLogin] = useState(true);
  const toast = useRef();

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled>
      <View style={styles.container}>
        <Text style={styles.TextHeader}>{'Login'}</Text>
        <Login navigation={navigation} toast={toast} />
      </View>

      <Toast
        ref={toast}
        style={sty.toast}
        position="bottom"
        fadeInDuration={200}
        fadeOutDuration={1000}
        textStyle={sty.txt}
      />
    </KeyboardAwareScrollView>
  );
};

export default index;

const sty = StyleSheet.create({
  txt: {
    color: '#fff',
    textAlign: 'center',
  },

  toast: {
    backgroundColor: Colors.blue,
    borderRadius: 7,
  },
});
