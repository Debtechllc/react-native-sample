import React from 'react';
import styled from 'styled-components/native';
import {Image} from 'react-native'
const IconLeftContainer = styled.TouchableOpacity`
  height: 100%;
  paddingLeft: 0;
  justifyContent: center;
`;

const Hamburger = ({ onPress }) => (

  <IconLeftContainer onPress={onPress}>
  <Image
    style={{ width: 60, height: 30 }}
    paddingTop={5}
    source={require('./../../images/hamburger.png')}
  />
  </IconLeftContainer>
);

export default Hamburger;
