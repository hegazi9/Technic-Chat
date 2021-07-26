/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-sparse-arrays */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Text,
  FlatList,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {getTasks} from '../../redux/actions';
import database from '@react-native-firebase/database';
import Colors from '../../utils/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const usersImages = [
  require('../../assets/images/user4.jpg'),
  require('../../assets/images/user2.jpg'),
  require('../../assets/images/user3.jpg'),
  require('../../assets/images/user6.jpg'),
  require('../../assets/images/user5.jpg'),
  require('../../assets/images/user1.jpg'),
];

const Users = ({route, navigation}) => {
  const userInfo = route.params.userInfo;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    console.log('updateeeed...', users);
  }, [users]);

  const getUsers = () => {
    let dbRef = database().ref('users');
    dbRef.on('child_added', async val => {
      let user = val.val();
      console.log('user:', user);
      let index = users.findIndex(i => i.id === user.id);
      index == -1 ? setUsers(users => [...users, user]) : null;
    });

    dbRef.on('child_changed', async val => {
      let user = await val.val();
      console.log('users changed :', user);
      console.log('hegaziiiiiiiiiiiiiiiiiiiiiiiiiiiiiii:', users);
    });
  };

  const userItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.userView}
        onPress={() => {
          navigation.navigate('Chat');
        }}>
        <Image
          source={usersImages[index % usersImages.length]}
          style={styles.img}
        />
        <View>
          <Text style={styles.username}>{'hegazi9 & sa3d0on'}</Text>
          <Text numberOfLines={1} style={styles.message}>
            {'Hey I am using chating app'}
          </Text>
        </View>
        <Text style={styles.date}>{'20:00'}</Text>
      </TouchableOpacity>
    );
  };

  const _keyExtractor = (item, index) => index + '';

  return (
    <View style={styles.changeHeight}>
      <>
        <FlatList
          style={{marginBottom: 30}}
          showsVerticalScrollIndicator={false}
          data={[1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1]}
          renderItem={userItem}
          keyExtractor={_keyExtractor}
        />
      </>
    </View>
  );
};
const mapStateToProps = ({tasks}) => {
  return {
    tasks: tasks.tasks,
  };
};
export default connect(mapStateToProps, {getTasks})(Users);

const styles = StyleSheet.create({
  changeHeight: {
    height: hp('100%'),
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },

  img: {
    width: 55,
    height: 55,
    borderRadius: 30,
  },
  userView: {
    flexDirection: 'row',
    padding: 20,
  },
  username: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold',
    color: Colors.panafsig,
    width: wp('40%'),
  },
  message: {
    fontSize: 16,
    marginLeft: 10,
    color: Colors.lightBlack,
    width: wp('50%'),
  },
  date: {
    fontSize: 14,
    color: Colors.grey,
  },
});
