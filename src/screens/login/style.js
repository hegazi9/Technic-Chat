import {StyleSheet} from 'react-native';
import Colors from '../../utils/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 25,
    height: hp('100'),
  },

  Content: {
    marginTop: '20%',
  },
  TextHeader: {
    color: Colors.black,
    fontWeight: 'bold',
    fontSize: wp('10'),
  },
  TextGreyHeader: {
    color: Colors.grey,
    fontWeight: 'bold',
    fontSize: wp('5'),
  },
  lightText: {
    color: Colors.grey,
    fontSize: wp('4'),
    marginTop: 20,
  },

  errorMessage: {
    width: '45%',
    fontSize: 12,
    color: 'red',
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },

  checkBoxActive: {
    width: 16,
    height: 16,
    borderRadius: 3,
    borderWidth: 1.5,
    alignItems: 'center',
    marginRight: 5,
    justifyContent: 'center',
    backgroundColor: Colors.blue,
    borderColor: Colors.blue,
  },
  checkIcon: {
    color: Colors.white,
    fontSize: 12,
  },

  loginContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: '20%',
  },

  input: {
    height: 40,
    width: '100%',
    fontSize: 16,
    borderBottomWidth: 0.3,
    borderColor: Colors.grey,
    marginBottom: '5%',
  },
  inputPassword: {
    width: '85%',
    height: 40,
    fontSize: 16,
  },
  ViewInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '5%',
    width: '100%',
    fontSize: 16,
    borderBottomWidth: 0.3,
    borderColor: Colors.grey,
  },
  avatar: {
    width: 100,
    height: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 25,
  },

  btn: {
    width: '80%',
    paddingVertical: 12,
    backgroundColor: 'white',
    elevation: 5,
    marginTop: '20%',
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtBtn: {
    color: Colors.blue,
    fontSize: 22,
    marginLeft: 10,
  },
});

export default styles;
