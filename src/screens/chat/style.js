import Colors from '../../utils/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blue,
  },
  headerView: {
    height: hp('20'),
  },
  headerNav: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: '3%',
    marginTop: '3%',
  },
  txtNav: {
    color: '#ffffff95',
    fontSize: 16,
  },
  callingView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: '3%',
    marginTop: '6%',
    alignItems: 'center',
  },
  rowIcons: {flexDirection: 'row'},
  backgroundIconPhone: {
    backgroundColor: Colors.move,
    width: hp('4%'),
    height: hp('4%'),
    borderRadius: wp('50'),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp('3'),
  },
  backgroundIconVideo: {
    backgroundColor: '#ffffff80',
    width: wp('8%'),
    height: hp('4%'),
    borderRadius: wp('50'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  myName: {
    fontSize: hp('3'),
    color: '#fff',
    fontWeight: 'bold',
  },
  icon: {fontSize: 15, color: '#fff'},
  messagesView: {
    backgroundColor: Colors.white,
    height: hp('70'),
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: '8%',
    paddingHorizontal: '3%',
  },

  inputContainer: {
    backgroundColor: '#fff',
    height: hp('10.1'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    backgroundColor: Colors.lightGrey,
    width: '94%',
    borderRadius: 20,
    height: hp('7'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: '88%',
    paddingHorizontal: 10,
  },
  backgroundIconSend: {
    backgroundColor: Colors.blue,
    width: hp('4%'),
    height: hp('4%'),
    borderRadius: wp('50'),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default styles;
