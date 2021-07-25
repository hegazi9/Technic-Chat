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
import auth from '@react-native-firebase/auth';

const Home = ({ tasks, getTasks, route }) => {

  const username = route.params.username;
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [check, setCheck] = useState(false);
  const [expandItem, setExpandItem] = useState('');
  const [expandId, setExpandId] = useState('');

  useEffect(() => {
    api()
    tasks ? setLoading(false) : null
  }, [tasks]);

  const api = async () => {
    if (tasks === null) {
      setLoading(true)
      await getTasks()
    }
  }



  //render task item
  const taskItem = ({ item }) => {
    return (
      <Text>Saad</Text>
    );
  };

  //logout
  const logout = () => {
    auth().signOut().then(_ => {
      AsyncStorage.removeItem('user').then(_ => { BackHandler.exitApp(); })
    })
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
          <Text style={styles.TextHeader}>{username}</Text>
        </View>

        {/**todoCard */}
        <View style={[expandItem == '' ? styles.changeHeight : styles.todoCard]}>
          {loading ? <ActivityIndicator /> :
            <>
              <Text style={styles.TextHeaderCard}>All</Text>
              <Text style={styles.subTitleText}>{tasks.length + ' Tasks'}</Text>
              <FlatList
                nestedScrollEnabled
                data={tasks}
                extraData={tasks}
                renderItem={taskItem}
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
