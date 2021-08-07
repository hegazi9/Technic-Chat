import {StyleSheet} from 'react-native';
import Colors from '../../utils/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blue,
  },
  header: {
    backgroundColor: Colors.blue,
    height: hp('30'),
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 5,
  },
  poweroffIcon: {
    position: 'absolute',
    left: 20,
    top: 20,
    color: Colors.white,
    fontSize: 30,
  },
  TextHeader: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 26,
    width: wp('40%'),
    marginLeft: 'auto',
    lineHeight: hp('5%'),
  },

  changeHeight: {
    height: hp('100%'),
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    marginTop: 20,
  },
  circleSearch: {
    backgroundColor: Colors.lightGrey,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: {
    color: Colors.white,
  },
  img: {
    width: 55,
    height: 55,
    borderRadius: 30,
  },
  userView: {
    flexDirection: 'row',
    padding: 20,
  },
  username: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold',
    color: Colors.panafsig,
    width: wp('40%'),
  },
  message: {
    fontSize: 16,
    marginLeft: 10,
    color: Colors.lightBlack,
    width: wp('50%'),
  },
  date: {
    fontSize: 14,
    color: Colors.grey,
  },
});

export default styles;
