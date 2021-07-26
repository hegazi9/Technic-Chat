import React from 'react';
import {View} from 'react-native';
import styles from './style';
import Header from '../../components/home/header';
import Users from '../../components/home/users';

const Home = ({route, navigation}) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <Users route={route} navigation={navigation} />
    </View>
  );
};

export default Home;
