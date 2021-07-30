import { StyleSheet } from 'react-native'
const common_styles = StyleSheet.create({
  container:{
      flex:1,
      flexDirection: 'column',
      backgroundColor: '#FFFFFF'
  },
menuSection:{
  flexDirection: 'row',
  flex:3
},
body:{
  flex:1,
  flexDirection: 'row',
  justifyContent: 'space-around',
},
text:{
  fontWeight: 'bold',
  fontSize: 15,
  marginTop: 0,
  alignItems: 'center'
  },
  Dropdown:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    color: 'red'
  },
flex:{
  flex:1,
  flexDirection: 'row',
  justifyContent: 'space-around',
  flexWrap: 'wrap'
},
gridView: {
  paddingTop: 25,
  flex: 1,
},
itemContainer: {
  justifyContent: 'flex-end',
  borderRadius: 5,
  padding: 10,
  height: 150,
},
itemName: {
  fontSize: 16,
  color: '#000',
  fontWeight: '600',
},
itemCode: {
  fontWeight: '600',
  fontSize: 12,
  color: '#fff',
},
modalContainer: {
  flex: 1,
  justifyContent: 'center',
  backgroundColor: 'grey',
},
innerContainer: {
  alignItems: 'center',
},
})
export {common_styles}
