import { View, KeyboardAvoidingView, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import styled from 'styled-components';

export const Background=styled(View)`
  flex: 1;
  background-color: #FFF;
`;

export const Container=styled(KeyboardAvoidingView)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Logo=styled(Image)`
  width: 150px;
  height: 150px;
`;

export const AreaInput=styled(View)`
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  margin-left: 40px;
  margin-bottom: 10px;
  margin-top: 5px;
`;

export const Input = styled(TextInput).attrs({placeholderTextColor: '#8CB8D2'})`
  width: 90%;
  height: 50px;
  background-color: #FFF;
  font-size: 17px;
  color: #000;
  padding: 10px;
  border-color: gray;
  border-width: 1px;
  border-radius: 7px;
`;

export const BtnSubmit=styled(TouchableOpacity)`
  width: 90%;
  height: 45px;
  margin-top: 10px;
  align-items: center;
  justify-content: center;
  background-color: #000;
  border-radius: 7px;
`;

export const BtnTxt=styled(Text)`
  font-size: 20px;
  color: #FFF;
`;

export const Link=styled(TouchableOpacity)`
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const LinkTxt=styled(Text)`
  color: #000;
`;

export const PickerView = styled(View)`
  width: 90%;
  height: 45px;
  justify-content: center;
  background-color: #FFF;
  border: #999;
  border-radius: 5px;
  color: #000;
`;

