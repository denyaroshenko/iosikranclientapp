import React from 'react';
import styled from 'styled-components/native';

const Button = ({ children, backgroundColor, color, onPress }) => {
  return (
    <ButtonWrapper onPress={onPress} style={
      [
        backgroundColor && { backgroundColor }
      ]
    }>
      <ButtonText style={
        [
          color && { color }
        ]
      }>{children}</ButtonText>
    </ButtonWrapper>
  )
}

const ButtonWrapper = styled.TouchableOpacity`
  display: flex;
  justifyContent: center;
  alignItems: center;
  border-radius: 30px;
  background: #FED400;
  text-align: center;
  width: 200px;
  height: 48px;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.1);
`

const ButtonText = styled.Text`
  font-weight: 300;
  font-size: 12px;
  color: #000000;
`

export default Button;