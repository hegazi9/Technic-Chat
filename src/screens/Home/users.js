import React, { useState, useEffect } from 'react';
import {
  Text,
  ScrollView,
  FlatList,
  View,
  BackHandler,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import styles from './style';
import { getTasks } from '../../Redux/actions';
import { Avatar } from 'react-native-elements';
import { Icon } from 'native-base';
const userImage = require('../../assets/images/user.jpg')
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-community/async-storage';

const Home = ({ route }) => {
  const userInfo = route.params.userInfo;
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [expandItem, setExpandItem] = useState('');

  useEffect(() => {

    getUsers()
  }, []);

  useEffect(() => {
    console.log('updateeeed...', users);
  }, [users]);


  const getUsers = () => {
    let dbRef = database().ref('users')
    dbRef.on('child_added', async val => {
      let user = val.val()
      console.log('user:', user);
      let index = users.findIndex(i => i.id === user.id)
      index == -1 ? setUsers(users => [...users, user]) : null;
    })


    dbRef.on('child_changed', async val => {
      let user = await val.val()
      console.log('users changed :', user);
      console.log('hegaziiiiiiiiiiiiiiiiiiiiiiiiiiiiiii:', users)
      
    })
  }

  //render task item
  const userItem = ({ item }) => {
    return (
      <Text>{item.firstName}</Text>
    );
  };

  //logout
  const logout = () => {
    AsyncStorage.removeItem('user').then(_ => { BackHandler.exitApp(); })
  }

  const _keyExtractor = (item, index) => index + '';
  return (
    <View style={styles.container}>
      <ScrollView
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}>

        {/**header */}
        <View style={styles.header}>
          <Icon name='plussquareo' type='AntDesign' style={styles.addIcon} />
          <Icon name='power' type='SimpleLineIcons' style={styles.poweroffIcon} onPress={logout} />
          <Avatar rounded size='large' source={userImage} />
          <Text style={styles.TextHeader}>{userInfo.firstName + ' ' + userInfo.lastName}</Text>
        </View>

        {/**todoCard */}
        <View style={[expandItem == '' ? styles.changeHeight : styles.todoCard]}>
          {false ? <ActivityIndicator /> :
            <>
              <Text style={styles.TextHeaderCard}>All</Text>
              <Text style={styles.subTitleText}>{' Tasks'}</Text>
              <FlatList
                nestedScrollEnabled
                data={users}
                extraData={users}
                renderItem={userItem}
                keyExtractor={_keyExtractor}
              />
            </>}
        </View>
      </ScrollView>
      {/**Mark All Read */}
    </View>
  );
};
const mapStateToProps = ({ tasks }) => {
  return {
    tasks: tasks.tasks,
  };
};
export default connect(mapStateToProps, { getTasks })(Home);
