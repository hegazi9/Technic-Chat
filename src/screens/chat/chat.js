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

const Chat = ({}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  const taskItem = ({item}) => {
    return <Text>{item}</Text>;
  };

  const _keyExtractor = index => index + '';
  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <View style={styles.headerNav}>
          <TouchableOpacity>
            <Text style={styles.txtNav}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.txtNav}>Search</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.callingView}>
          <Text style={styles.myName}>{'Mohamed\nKamal Hegazi'}</Text>
          <View style={styles.rowIcons}>
            <TouchableOpacity style={styles.backgroundIconPhone}>
              <Icon name="phone" type="FontAwesome" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.backgroundIconVideo}>
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
              data={[1, 1]}
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
            placeholder={'Type your message.'}
          />
          <TouchableOpacity style={styles.backgroundIconSend}>
            <Icon name="send" type="Ionicons" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Chat;
