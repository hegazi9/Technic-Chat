import React, {Component} from 'react';
import {
  StyleSheet,
  Platform,
  Button,
  TouchableOpacity,
  View,
  PermissionsAndroid,
} from 'react-native';
import {Icon} from 'native-base';
import RtcEngine from 'react-native-agora';
import Colors from '../../utils/colors';
import {AGORATOKEN , APPID , CHANNELNAME } from '../../utils/constance'

const requestCameraAndAudioPermission = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]);
    if (
      granted['android.permission.RECORD_AUDIO'] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      granted['android.permission.CAMERA'] ===
        PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log('You can use the cameras & mic');
    } else {
      console.log('Permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

export default class AgoraVoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appId: APPID,
      channelName: CHANNELNAME ,
      token: AGORATOKEN ,      // valid 24 hours only
       joinSucceed: false,
      peerIds: [],
      openMicrophone: true,
      enableSpeakerphone: true,

    };
     if (Platform.OS === 'android') {
            // Request required permissions from Android
            requestCameraAndAudioPermission().then(() => {
                console.log('requested!')
            })
        }
  }

  componentWillUnmount()
  {
    this._engine.destroy();
  }
  
  // Mount the App component into the DOM.
  async componentDidMount() {
   await  this.init();
   await this._joinChannel();
  }
  // Pass in your App ID through this.state, create and initialize an RtcEngine object.
  init = async () => {
    const {appId} = this.state
    this._engine = await RtcEngine.create(appId)
    // Enable the audio module.
    await this._engine.enableAudio()


    // Listen for the UserJoined callback.
    // This callback occurs when the remote user successfully joins the channel.
    this._engine.addListener('UserJoined', (uid, elapsed) => {
        console.log('UserJoined', uid, elapsed)
        const {peerIds} = this.state
        if (peerIds.indexOf(uid) === -1) {
            this.setState({
                peerIds: [...peerIds, uid]
            })
        }
    })


    // Listen for the UserOffline callback.
    // This callback occurs when the remote user leaves the channel or drops offline.
    this._engine.addListener('UserOffline', (uid, reason) => {
        console.log('UserOffline', uid, reason)
        const {peerIds} = this.state
        this.setState({
            // Remove peer ID from state array
            peerIds: peerIds.filter(id => id !== uid)
        })
    })

    // Listen for the JoinChannelSuccess callback.
    // This callback occurs when the local user successfully joins the channel.
    this._engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
        console.log('JoinChannelSuccess', channel, uid, elapsed)
        this.setState({
            joinSucceed: true
        })
    })
}

_joinChannel = async () => {
  await this._engine?.joinChannel(this.state.token, this.state.channelName, null, 0)
}


_leaveChannel = async () => {
  await this._engine?.leaveChannel()
  this.setState({peerIds: [], joinSucceed: false})
  this.props.navigation.goBack();
}

_switchMicrophone = () => {
  const { openMicrophone } = this.state
  this._engine?.enableLocalAudio(!openMicrophone).then(() => {
      this.setState({ openMicrophone: !openMicrophone })
    }).catch((err) => {
      console.warn('enableLocalAudio', err)
    })
}

// Switch the audio playback device.
_switchSpeakerphone = () => {
  const { enableSpeakerphone } = this.state
  this._engine?.setEnableSpeakerphone(!enableSpeakerphone).then(() => {
      this.setState({ enableSpeakerphone: !enableSpeakerphone })
    }).catch((err) => {
      console.warn('setEnableSpeakerphone', err)
    })
}

render() {
  const {
      channelName,
      joinSucceed,
      openMicrophone,
      enableSpeakerphone,
    } = this.state;
  return (
      <View style={styles.container}>
          <Button 
            color = {Colors.blue}
            onPress={joinSucceed ? this._leaveChannel : this._joinChannel}
            title={`${joinSucceed ? 'Leave' : 'Join'} channel`}
          />
        <View style={styles.float}>
          <TouchableOpacity onPress = {this._switchMicrophone}>
            <Icon  name = {`${openMicrophone ? 'microphone' : 'microphone-slash'}`} type = "FontAwesome" 
            style={styles.mice}/>
          </TouchableOpacity>

          <TouchableOpacity onPress = {this._switchSpeakerphone}>
            <Icon  name = {`${!enableSpeakerphone ? 'volume-mute' : 'sound'}`} 
                   type = {`${!enableSpeakerphone ? 'FontAwesome5' : 'AntDesign'}`}  
            style={styles.sound}/>
          </TouchableOpacity>
        </View>
      </View>
  )
}
}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems : 'center' ,
    justifyContent : 'center'
  },

  float :
  {
    flexDirection : "row" , padding : 20 ,
  },
  mice : 
  {
    color : Colors.panafsig , fontSize : 30 , margin : 20 
  },
  sound : 
  {
    color : Colors.orange , fontSize : 30 , margin : 20 
  }
 
});
