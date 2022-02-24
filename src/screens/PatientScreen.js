import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

import { GrayText, Button } from '../components';

const PatientScreen = () => (
  <Container>
    <PatientFullName>Марина Алмазова</PatientFullName>
    <GrayText>+7 (999) 111-22-33</GrayText>
    <PatientButtons>
      <FormulaButton>Формула зубов</FormulaButton>
      <Button color="green">P</Button>
    </PatientButtons>
  </Container>
)

const FormulaButton = styled(Button)`
  flex: 1;
`

const PatientButtons = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`

const PatientFullName = styled.Text`
  font-weight: 800;
  font-size: 24px;
  line-height: 30px;
  margin-bottom: 5px;
`

const Container = styled.View`
  padding: 25px;
`; 

PatientScreen.navigationOptions = {
  title: 'Карта пациента',
  headerTintColor: '#2a86ff',
  headerStyle: {
    elevation: 0.8,
    shadowOpacity: 0.8,
  }
}

export default PatientScreen;