/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  Text,
  ScrollView,
  FlatList,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'native-base';
import {TextInput} from 'react-native';
import styles from './style';
import AsyncStorage from '@react-native-community/async-storage';
import database from '@react-native-firebase/database';
var Rooms = [];

const Chat = ({route , navigation }) => {
  const [loading, setLoading] = useState(false);
  const selectedUser = route.params.selectedUser ;
  const [message , setMessage ] = useState('');
  const [userLoged , setuserLoged] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('user').then(_ =>{
      setuserLoged( JSON.parse(_));
    })
   
  }, []);

 const sendMsg = (message) => {
   database().ref().once('value', function(snapshot) {
    if (snapshot.val() !== null) {
        Rooms = Object.keys (snapshot.val().message);
    }
  });

    if(Rooms.length == 0 )
    {
      console.log( 'Room Empty');
      database().ref('message/').child(userLoged.id+selectedUser.id)
      .push({ 
        sender :userLoged , senderID :userLoged.id  , 
        receiverID : selectedUser.id , receiver  : selectedUser , message : message ,
        messageDate :  new Date()})
    }

    else {

    Rooms.map( item => {
      if((userLoged.id+selectedUser.id) == item || (selectedUser.id+userLoged.id) == item )
      {
        console.log( 'Room cpmplete');
        database().ref('message/').child(item)
        .push({ 
          sender :userLoged , senderID :userLoged.id  , 
          receiverID : selectedUser.id , receiver  : selectedUser , message : message ,
          messageDate :  new Date()})
          return true ;
      }
      else {
        console.log( 'Another Room ');
        database().ref('message/').child(userLoged.id+selectedUser.id)
        .push({ 
          sender :userLoged , senderID :userLoged.id  , 
          receiverID : selectedUser.id , receiver  : selectedUser , message : message ,
          messageDate :  new Date()})
          return true ;

      }
    })
  }
    
  }

  const _videoCalling = () => {
    alert('')
    navigation.navigate('Agora')
  }

  const taskItem = ({item}) => {
    return <Text>{item}</Text>;
  };

  const _keyExtractor = index => index + '';
  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <View style={styles.headerNav}>
          <TouchableOpacity>
            <Text onPress = {()=>{navigation.pop()}} style={styles.txtNav}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.txtNav}>Search</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.callingView}>
          <Text style={styles.myName}>{selectedUser.firstName +"\n"+ selectedUser.lastName}</Text>
          <View style={styles.rowIcons}>
            <TouchableOpacity style={styles.backgroundIconPhone}>
              <Icon name="phone" type="FontAwesome" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.backgroundIconVideo} onPress = {()=> _videoCalling()} >
              <Icon name="video" type="FontAwesome5" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <View style={styles.messagesView}>
            <FlatList
              nestedScrollEnabled
              data={['','']}
              renderItem={taskItem}
              keyExtractor={_keyExtractor}
            />
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <View style={styles.inputView}>
          <TextInput
            multiline
            style={styles.input}
            onChangeText={setMessage}
            placeholder={'Type your message.'}
            onSubmitEditing={ ()=> sendMsg(message)}
          />
          <TouchableOpacity style={styles.backgroundIconSend} onPress={()=>{
            sendMsg(message)
          }}>
            <Icon name="send" type="Ionicons" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Chat;
