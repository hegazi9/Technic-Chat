/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useEffect} from 'react';
import {Text, TextInput, View, TouchableOpacity} from 'react-native';
import styles from './style';
import {Avatar} from 'react-native-elements';
import {Icon, Toast as notify} from 'native-base';
import Colors from '../../utils/colors';
import AsyncStorage from '@react-native-community/async-storage';
import database from '@react-native-firebase/database';
import { Password , UserName, LOGIN  } from '../../utils/constance';

const userImage = require('../../assets/images/logo.png');

const Login = ({navigation, toast}) => {
  const ref_input1 = useRef();
  const ref_input2 = useRef();

  const [username, onChangeUsername] = useState('');
  const [password, onChangePassword] = useState('');

  const [show, setShow] = useState(false);

  const [users, setUsers] = useState([]);
  const [messageError, setMessageError] = useState('');

  const loginFun = () => {
    if (username == '') {
      ref_input1.current.focus();
      setMessageError('User name is empty');
    } else if (password == '') {
      ref_input2.current.focus();
      setMessageError('Password is empty');
    } else {
      setMessageError('');
      //  alert(users.length)
      users.length > 0
        ? users.map(item => {
            if (item.username == username && item.password == password) {
              AsyncStorage.setItem('user', JSON.stringify(item));
              navigation.replace('Users', {users: users });
              return true;
            } else {
              toast.current.show('Username or Password incorrect', 3000);
            }
          })
        : toast.current.show('DB is Empty', 3000);
    }
  };


  const getUsers = () => {
    let dbRef = database().ref('users');
    dbRef.on('child_added', val => {
      let user = val.val();
      console.log('user:', user);
      let index = users.findIndex(i => i.id === user.id);
      // alert(index)
      index == -1 ? setUsers(users => [...users, user]) : null;
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <View>
      <Avatar rounded style={styles.avatar} source={userImage} />
      <View style={styles.loginContainer}>
        <Text
          style={[
            styles.errorMessage,
            {
              width: '100%',
              height: messageError.includes('User name') ? undefined : 0,
            },
          ]}>
          {'* ' + messageError}
        </Text>
        <View style={styles.ViewInput}>
          <Icon
            name="user"
            type="AntDesign"
            style={{color: Colors.blue, fontSize: 20}}
          />
          <TextInput
            ref={ref_input1}
            style={styles.inputPassword}
            onChangeText={onChangeUsername}
            placeholder={UserName}
            onSubmitEditing={() => ref_input2.current.focus()}
            blurOnSubmit={false}
          />
        </View>

        <Text
          style={[
            styles.errorMessage,
            {
              width: '100%',
              height: messageError.includes('Password is') ? undefined : 0,
            },
          ]}>
          {'* ' + messageError}
        </Text>
        <View style={styles.ViewInput}>
          <Icon
            name="lock"
            type="AntDesign"
            style={{color: Colors.blue, fontSize: 20}}
          />
          <TextInput
            ref={ref_input2}
            style={styles.inputPassword}
            onChangeText={onChangePassword}
            placeholder={Password}
            secureTextEntry={!show}
            onSubmitEditing={loginFun}
          />
          <Icon
            onPress={() => {
              setShow(!show);
            }}
            name={show ? 'eye' : 'eye-off'}
            type="Ionicons"
            style={styles.icon}
          />
        </View>

        <TouchableOpacity style={styles.btn} onPress={loginFun}>
          <Icon name="check" type="AntDesign" style={{color: Colors.blue}} />
          <Text style={styles.txtBtn}>{LOGIN}</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

export default Login;
