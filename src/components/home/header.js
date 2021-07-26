/* eslint-disable react-native/no-inline-styles */
import React , { useEffect, useState} from 'react';
import {Text, FlatList, Image, View, StyleSheet,TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../utils/colors';
import database from '@react-native-firebase/database';

const colors = [
  Colors.pink,
  Colors.desc,
  Colors.orange,
  Colors.grey,
  Colors.move,
];

const Header = ({navigation , UserInfo}) => {
const [users , setUsers] = useState([]);  
  useEffect(()=>{
    let dbRef = database().ref('users');
    dbRef.on('child_added', val => {
    let user = val.val();
    setUsers(users => [...users, user])
  })
  },[])
  const userItemSelected = ({item, index}) => {
    return (
      UserInfo.id != item.id ?
      <TouchableOpacity onPress={()=>{
        navigation.navigate('Chat' , {
          selectedUser : item 
        })
      }}
        style={[
          styles.circleSearch,
          {backgroundColor: colors[index % colors.length], marginLeft: 5},
        ]}>
        <Image
          source={require('../../assets/images/user4.jpg')}
          style={styles.img}
        />
      </TouchableOpacity>
       : null

   );
  };

  //logout
  const logout = () => {
    AsyncStorage.removeItem('user').then(_ => {
      navigation.replace('Login');
    });
  };

  const _keyExtractor = (item, index) => index + '';

  return (
    <View style={styles.header}>
      <View style={{flexDirection: 'row-reverse'}}>
        <Icon
          name="power"
          type="SimpleLineIcons"
          style={styles.poweroffIcon}
          onPress={logout}
        />

        <Text style={styles.TextHeader}>Chat with your friends</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.circleSearch}>
          <Icon name="search1" type="AntDesign" style={styles.search} />
        </View>
        <FlatList
          data={users}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={userItemSelected}
          keyExtractor={_keyExtractor}
        />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.blue,
    height: hp('30'),
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 5,
  },
  poweroffIcon: {
    position: 'absolute',
    left: 20,
    top: 20,
    color: Colors.white,
    fontSize: 30,
  },
  TextHeader: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 26,
    width: wp('40%'),
    marginLeft: 'auto',
    lineHeight: hp('5%'),
  },

  changeHeight: {
    height: hp('100%'),
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    marginTop: 20,
  },
  circleSearch: {
    backgroundColor: Colors.lightGrey,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: {
    color: Colors.white,
  },
  img: {
    width: 55,
    height: 55,
    borderRadius: 30,
  },
});
