import React from 'react';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const IconLeftContainer = styled.TouchableOpacity`
  height: 100%;
  paddingLeft: 15;
  justifyContent: center;
`;

const SearchIcon = ({ onPress }) => (
  <IconLeftContainer onPress={onPress}>
    <Ionicons name="ios-search" size={25} color='black' />
  </IconLeftContainer>
);

export default SearchIcon;