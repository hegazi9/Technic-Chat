import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
  PermissionsAndroid,
} from 'react-native';
import {Icon} from 'native-base';
import RtcEngine, {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
} from 'react-native-agora';
import Colors from '../../utils/colors';

const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};
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

export default class agoraVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appId: APPID,
      channelName: CHANNELNAME ,
      token: AGORATOKEN ,      // valid 24 hours only
      joinSucceed: false,
      peerIds: [],
    };
    if (Platform.OS === 'android') {
      requestCameraAndAudioPermission().then(() => {
        console.log('requested!');
      });
    }
  }

  componentWillUnmount()
  {
    this._engine.destroy();
  }
  // Mount the App component into the DOM.
  async componentDidMount() {
    await this.init();
    await this.startCall();
  }
  // Pass in your App ID through this.state, create and initialize an RtcEngine object.
  init = async () => {
    const {appId} = this.state;
    // Rtc ====> play stream
    this._engine = await RtcEngine.create(appId);
    // Enable the video module.
    await this._engine.enableVideo();

    // Listen for the UserJoined callback.
    // This callback occurs when the remote user successfully joins the channel.
    this._engine.addListener('UserJoined', (uid, elapsed) => {
      console.log('UserJoined', uid, elapsed);
      const {peerIds} = this.state;
      if (peerIds.indexOf(uid) === -1) {
        this.setState({
          peerIds: [...peerIds, uid],
        });
      }
    });

    // Listen for the UserOffline callback.
    // This callback occurs when the remote user leaves the channel or drops offline.
    this._engine.addListener('UserOffline', (uid, reason) => {
      console.log('UserOffline', uid, reason);
      const {peerIds} = this.state;
      this.setState({
        // Remove peer ID from state array
        peerIds: peerIds.filter(id => id !== uid),
      });
    });

    // Listen for the JoinChannelSuccess callback.
    // This callback occurs when the local user successfully joins the channel.
    this._engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
      console.log('JoinChannelSuccess', channel, uid, elapsed);

      this.setState({
        joinSucceed: true,
      });
    });

    this._engine.addListener('Error', error => {
      console.log('error', error);

      this.setState({
        joinSucceed: true,
      });
    });
  };

  startCall = async () => {
    //  0 ==> refer to user id by random or create id automatic .
    await this._engine?.joinChannel(
      this.state.token,
      this.state.channelName,
      null,
      0,
    );
  };
  endCall = async () => {
    await this._engine?.leaveChannel();
    this.setState({peerIds: [], joinSucceed: false});
    this.props.navigation.goBack();
  };
  _renderVideos = () => {
    const {joinSucceed} = this.state;
    return joinSucceed ? (
      // design local user
      <View style={styles.fullView}>
        <RtcLocalView.SurfaceView
          style={styles.max}
          channelId={this.state.channelName}
          renderMode={VideoRenderMode.Hidden}
        />
        {this._renderRemoteVideos()}
      </View>
    ) : null;
  };

  // Set the rendering mode of the video view as Hidden,
  // which uniformly scales the video until it fills the visible boundaries.
  _renderRemoteVideos = () => {
    const {peerIds} = this.state;
    return (
      <ScrollView
        style={styles.remoteContainer}
        contentContainerStyle={{paddingHorizontal: 2.5}}
        horizontal={true}>
        {/* design another users  */}

        {peerIds.map((value, index, array) => {
          return (
            <RtcRemoteView.SurfaceView
              style={styles.remote}
              uid={value}
              channelId={this.state.channelName}
              renderMode={VideoRenderMode.Hidden}
              zOrderMediaOverlay={true}
            />
          );
        })}
      </ScrollView>
    );
  };

  render() {
    return (
      <View style={styles.max}>
        <View style={styles.max}>
          <View style={styles.buttonHolder}>
            <TouchableOpacity onPress={this.endCall} style={styles.button}>
              <Icon name="closecircle" type="AntDesign" style={styles.icon} />
            </TouchableOpacity>
          </View>
          {this._renderVideos()}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  max: {
    flex: 1,
  },
  buttonHolder: {
    height: 100,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    padding: 10,
    marginLeft: 'auto',
  },
  fullView: {
    width: dimensions.width,
    height: dimensions.height - 100,
  },
  remoteContainer: {
    width: '100%',
    height: 150,
    position: 'absolute',
    top: 5,
  },
  remote: {
    width: 150,
    height: 150,
    marginHorizontal: 2.5,
  },
  noUserText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#0093E9',
  },
  icon: {
    color: Colors.blue,
  },
});
