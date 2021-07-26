import React, { useState, useRef } from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView, ActivityIndicator
} from 'react-native';
import styles from './style';
import { Avatar } from 'react-native-elements';
import { Icon, Toast as notify } from 'native-base';
import Colors from '../../utils/colors';
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
const facebook = require('../../assets/images/facebook.png')
const google = require('../../assets/images/google_plus.png')


const SignUp = ({ toast, isLogin }) => {

  const ref_firstName = useRef();
  const ref_phoneNumber = useRef();
  const ref_lastName = useRef();
  const ref_email = useRef();
  const ref_username = useRef();
  const ref_password = useRef();
  const ref_confirmPass = useRef();

  const [loading, isLoading] = useState(false);
  const [imageUri, setImageUri] = useState('');


  const [firstName, onChangeFirstName] = useState('');
  const [lastName, onChangeLastName] = useState('');

  const [email, onChangeEmail] = useState('');
  const [username, onChangeUsername] = useState('');
  const [phoneNumber, onChangePhoneNumber] = useState('');


  const [password, onChangePassword] = useState('');
  const [confirmPass, onChangeConfirmPass] = useState('');

  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [messageError, setMessageError] = useState('');


  const success = () => {
    isLoading(false)
    clear()
    auth().signOut()
    toast.current.show('User account created & signed in', 3000)
    setTimeout(() => {
      isLogin(true)
    }, 3000);

  }
  const validation = () => {
    if (firstName == '') { ref_firstName.current.focus(); setMessageError("First name is required") }
    else if (lastName == '') { ref_lastName.current.focus(); setMessageError("Last name is required") }
    else if (email == '') { ref_email.current.focus(); setMessageError("Email is required", 3000) }
    else if (phoneNumber == '') { ref_phoneNumber.current.focus(); setMessageError("Phone Number is required") }
    else if (username == '') { ref_username.current.focus(); setMessageError("User name is required") }
    else if (password == '') { ref_password.current.focus(); setMessageError("Password is required") }
    else if (confirmPass == '') { ref_confirmPass.current.focus(); setMessageError("Confirm Password is required") }
    else if (password != confirmPass) { ref_password.current.focus(); setMessageError("Password and Confirm password don't match") }
    else signUp()

  }

  const signUp = () => {
    isLoading(true)
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log('User account created & signed in!', res);
        database().ref('users/' + res.user.uid).set({ id: res.user.uid, firstName, lastName, email, username, phoneNumber,password })
        if (imageUri) {
          const task = storage().ref(res.user.uid).putFile(imageUri)
          task.on('state_changed', snapshot => {
            console.log(snapshot);
            if (snapshot.state == 'success') success()
            // else { toast.current.show(snapshot.state + ', Upload profile picture.', 3000); isLoading(false) }
          });
        }
        else success()

      })
      .catch(error => {
        console.log(error.code);
        isLoading(false)
        toast.current.show(error?.code, 3000)
      });
  }

  //clear inputs 
  const clear = () => {
    ref_firstName.current.clear()
    ref_phoneNumber.current.clear()
    ref_lastName.current.clear()
    ref_email.current.clear()
    ref_username.current.clear()
    ref_password.current.clear()
    ref_confirmPass.current.clear()

    onChangeFirstName('')
    onChangeLastName('')
    onChangeEmail('')
    onChangeUsername('')
    onChangePassword('')
    onChangeConfirmPass('')
    onChangePhoneNumber('')
  }



  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* <UploadImage setImageUri={setImageUri} /> */}
      <View style={styles.loginContainer}>
        <View style={styles.errorRow}>
          <Text style={[styles.errorMessage, { height: messageError.includes('First name') ? undefined : 0 }]}>{'* ' + messageError}</Text>
          <Text style={[styles.errorMessage, { height: messageError.includes('Last name') ? undefined : 0 }]}>{'* ' + messageError}</Text>
        </View>
        <View style={styles.rowName}>
          <View style={styles.simpleRowName}>
            <Icon name='idcard' type='AntDesign' style={{ color: Colors.blue, fontSize: 20 }} />
            <TextInput
              ref={ref_firstName}
              style={styles.halfInput}
              onChangeText={onChangeFirstName}
              placeholder="First Name"
              onSubmitEditing={() => ref_lastName.current.focus()}
              blurOnSubmit={false}

            />
          </View>


          <View style={styles.simpleRowName}>
            <TextInput
              ref={ref_lastName}
              style={styles.halfInput}
              onChangeText={onChangeLastName}
              placeholder="Last Name"
              onSubmitEditing={() => ref_email.current.focus()}
              blurOnSubmit={false}
            />
          </View>

        </View>


        <Text style={[styles.errorMessage, { width: '100%', height: messageError.includes('Email') ? undefined : 0 }]}>{'* ' + messageError}</Text>
        <View style={styles.ViewInput}>
          <Icon name='email' type='Fontisto' style={{ color: Colors.blue, fontSize: 20 }} />
          <TextInput
            ref={ref_email}
            style={styles.inputPassword}
            onChangeText={onChangeEmail}
            keyboardType={'email-address'}
            placeholder="Em@il.com"
            onSubmitEditing={() => ref_phoneNumber.current.focus()}
            blurOnSubmit={false}
          />
        </View>

        <Text style={[styles.errorMessage, { width: '100%', height: messageError.includes('Phone') ? undefined : 0 }]}>{'* ' + messageError}</Text>
        <View style={styles.ViewInput}>
          <Icon name='local-phone' type='MaterialIcons' style={{ color: Colors.blue, fontSize: 20 }} />
          <TextInput
            ref={ref_phoneNumber}
            style={styles.inputPassword}
            keyboardType='phone-pad'
            maxLength={11}
            onChangeText={onChangePhoneNumber}
            placeholder="Phone Number"
            onSubmitEditing={() => ref_username.current.focus()}
            blurOnSubmit={false}
          />
        </View>

        <Text style={[styles.errorMessage, { width: '100%', height: messageError.includes('User name') ? undefined : 0 }]}>{'* ' + messageError}</Text>
        <View style={styles.ViewInput}>
          <Icon name='user' type='AntDesign' style={{ color: Colors.blue, fontSize: 20 }} />
          <TextInput
            ref={ref_username}
            style={styles.inputPassword}
            onChangeText={onChangeUsername}
            placeholder="User Name"
            onSubmitEditing={() => ref_password.current.focus()}
            blurOnSubmit={false}
          />
        </View>

        <Text style={[styles.errorMessage, { width: '100%', height: messageError.includes('Password is') ? undefined : 0 }]}>{'* ' + messageError}</Text>
        <View style={styles.ViewInput}>
          <Icon name='lock' type='AntDesign' style={{ color: Colors.blue, fontSize: 20 }} />
          <TextInput
            ref={ref_password}
            style={styles.inputPassword}
            onChangeText={onChangePassword}
            placeholder="Password"
            secureTextEntry={!show}
            onSubmitEditing={() => ref_confirmPass.current.focus()}
          />
          <Icon
            onPress={() => { setShow(!show) }}
            name={show ? 'eye' : 'eye-off'} type='Ionicons' style={{ color: Colors.blue, fontSize: 20 }} />
        </View>

        <Text style={[styles.errorMessage, { width: '100%', height: messageError.includes('Confirm Password is') ? undefined : 0 }]}>{'* ' + messageError}</Text>
        <View style={styles.ViewInput}>
          <Icon name='lock' type='AntDesign' style={{ color: Colors.blue, fontSize: 20 }} />
          <TextInput
            ref={ref_confirmPass}
            style={styles.inputPassword}
            onChangeText={onChangeConfirmPass}
            placeholder="Confirm Password"
            secureTextEntry={!showConfirm}
            onSubmitEditing={validation}
          />
          <Icon
            onPress={() => { setShowConfirm(!showConfirm) }}
            name={showConfirm ? 'eye' : 'eye-off'} type='Ionicons' style={{ color: Colors.blue, fontSize: 20 }} />
        </View>

        <TouchableOpacity style={styles.btn} disabled={loading}
          onPress={validation}>
          {loading ? <ActivityIndicator color={Colors.blue} /> :
            <>
              <Icon name='check' type='AntDesign' style={{ color: Colors.blue }} />
              <Text style={styles.txtBtn} >SIGN-UP</Text>
            </>}
        </TouchableOpacity>


        <Text style={styles.lightText} >Sign up with</Text>
        <View style={styles.simpleRow}>
          <Avatar
            onPress={() => { }}
            style={styles.avatarIcon}
            source={google}
          />
          <Avatar
            onPress={() => { }}
            style={styles.avatarIcon}
            source={facebook}
          />
        </View>

      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
};


export default SignUp;