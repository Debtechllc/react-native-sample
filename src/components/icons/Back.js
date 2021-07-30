import React from 'react';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const IconLeftContainer = styled.TouchableOpacity`
  height: 100%;
  paddingLeft: 15;
  justifyContent: center;
`;

const Back = ({ onPress }) => (
  <IconLeftContainer onPress={onPress}>
    <Ionicons name="ios-arrow-back" size={25} color="black" />
  </IconLeftContainer>
);

export default Back;
