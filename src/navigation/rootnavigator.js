/* eslint-disable no-undef */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../screens/Splash';
import Chat from '../screens/chat/chat';
import Login from '../screens/login';
import Users from '../screens/home/home';
import Siginup from '../screens/register/siginup';
import AgoraVideo from '../screens/chat/agoraVideo';
import AgoraVoice from '../screens/chat/agoraVoice';


const Stack = createStackNavigator();

export default RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Siginup"
          component={Siginup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AgoraVoice"
          component={AgoraVoice}
          options={{headerShown: false}}
        />
     <Stack.Screen
          name="AgoraVideo"
          component={AgoraVideo}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Users"
          component={Users}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
