import { StyleSheet } from 'react-native';
import Colors from '../../utils/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blue
  },
  header:
  {
    backgroundColor: Colors.blue,
    height: hp('25.5'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon: {
    position: 'absolute',
    right: 20,
    top: 20,
    color: Colors.white,
    fontSize: 30,
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
    fontSize: wp('6'),
  },
  TextHeaderCard: {
    color: Colors.darkGrey,
    fontWeight: 'bold',
    fontSize: wp('5'), paddingHorizontal:10
  },
  subTitleText: {
    color: Colors.darkGrey,
    fontSize: wp('4'),
    marginBottom: hp('1'),paddingHorizontal:10
  },
  dateText: {
    color: Colors.grey,
    fontSize: wp('4'),
  },
  todoCard: {
    height: hp('46.8'),
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 5,
    paddingVertical:20
  },
  changeHeight: {
    height: hp('63.8'),
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 5,
    paddingVertical:20
  },
  rowItem: {
    width: '100%',
    paddingVertical: 15,
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: Colors.grey,
    borderBottomWidth: .2,
    paddingHorizontal: 10,
    borderRadius:3
  },
  simpleRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconStatus: {
    fontSize: 22,
    marginLeft: 5,
  },
  checkBox: {
    width: 16, height: 16, borderRadius: 3,
    borderWidth: 1.5, alignItems: 'center',
    marginRight: 5, alignItems: 'center', justifyContent: 'center',
    backgroundColor: Colors.white,
    borderColor: Colors.grey,

  },
  checkBoxActive: {
    width: 16, height: 16, borderRadius: 3,
    borderWidth: 1.5, alignItems: 'center',
    marginRight: 5, alignItems: 'center', justifyContent: 'center',
    backgroundColor: Colors.blue,
    borderColor: Colors.blue,

  },
  checkIcon: {
    color: Colors.white,
    fontSize: 12,
  },
  taskNameLine: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: Colors.grey,

  },
  taskName: {
    fontSize: 16,
    color: Colors.black,
  },
  top: {
    marginTop: 5
  },
  closeIcon: {
    color: Colors.grey,
    fontSize: 20,
  },
  expandIcon: {
    marginTop: 5,
    fontSize: 20,
    color: Colors.blue,
  },
  markAll:{
    elevation:1,
    height: hp('7.5%'),justifyContent:'center',
    backgroundColor: '#fff', width: wp('100'),
    paddingHorizontal: 20,
    borderTopWidth: .3,
    borderColor:Colors.grey
  },
  desc: {
    elevation:.5,
    height: hp('7.5%'),justifyContent:'center',
    backgroundColor: Colors.date, width: wp('100'),
    paddingHorizontal:20
  },
  comment: {
    alignItems: 'center',
    elevation:.5,
    height: hp('7.5%'),justifyContent:'center',
    backgroundColor: Colors.date, width: wp('100'),
    paddingHorizontal:5,flexDirection:'row'
  },
  input: {
    width: '85%', borderWidth: 1,
    height:35,
    borderColor: Colors.blue,
    borderRadius: 3,
    paddingHorizontal:5
  },
  spaceBetween: {
    height: hp('2'),
    backgroundColor: '#fff',
    width: '100%'
  },
  submitComment: {
    color: Colors.green,
    fontSize: 46,
    marginLeft: -6,
  }

});

export default styles;
