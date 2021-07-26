import React , {useEffect , useState}from 'react';
import {View} from 'react-native';
import styles from './style';
import Header from '../../components/home/header';
import AsyncStorage from '@react-native-community/async-storage';
import Users from '../../components/home/users';
const Home = ({route, navigation}) => {

  const [UserInfo, setUserInfo] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('user').then(userInfo =>{
    setUserInfo( JSON.parse(userInfo))
   })
  }, []);

  return (
    UserInfo ? 
    <View style={styles.container}>
      <Header navigation={navigation} UserInfo={UserInfo}/>
      <Users route={route} navigation={navigation} UserInfo={UserInfo}/>
    </View>
    : null 
  );
};

export default Home;
