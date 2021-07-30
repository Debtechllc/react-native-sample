import {StyleSheet} from 'react-native';
import { Typography, Colors, Spacing, Buttons } from '../styles'

export default StyleSheet.create({
    containerCenter:{...Typography.containerCenter},
    container: {flex: 1, flexDirection: 'column', ...Colors.containerBg},
    underline: {...Colors.mainTextColor, textDecorationLine: 'underline', fontSize: 18, marginLeft: 5, fontWeight: '600'},
    loginButton: { ...Colors.buttonBg, ...Buttons.rounded, height: 45, top: 10, ...Spacing.padding},
    loginButtonText: { ...Colors.mainTextColor, fontSize: 18, textAlign: 'center', fontWeight: 'bold'},
    backgroundImage: {flex: 1, resizeMode: 'cover'},
    imageBg: {width: '100%', height: '100%'},
    imageView: { width: 60, height: 100, alignSelf: 'center', justifyContent: 'center',marginTop: 20},
    mainView:{ flex: 1, flexDirection: 'column', position: 'absolute', top: '50%', left: 10, right: 10, justifyContent: 'center', backgroundColor: Colors.lightColor, padding: 10 },
    mainView2:{ flex: 1, flexDirection: 'column', position: 'absolute', top: '40%', left: 10, right: 10, justifyContent: 'center', backgroundColor: Colors.lightColor, padding: 10 },
    TextInputContainer:{height: 50, flex: 2, flexDirection: 'row', padding: 5, borderColor: '#000', borderWidth: 0.5 },
    welcometxt: { ...Colors.mainTextColor, fontSize: 25, textAlign: 'center', fontWeight: 'normal',  textTransform: 'capitalize' },
    logoTxt: { ...Colors.mainTextColor, fontSize: 30, fontWeight: '100', textAlign: 'center', fontWeight: 'bold' },
    TextInput: { ...Colors.textInputColor, height: 40, fontWeight: 'bold', padding: 13, width: '90%' },
    forgotPasswordTxt: { ...Colors.grayColor, top: 20, fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
    signupTxt1: { ...Colors.grayColor, top: 20, fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
    signupTxt2: { ...Colors.grayColor, top: 20, textDecorationColor: '#0040FF', textDecorationLine: 'underline', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }
  })