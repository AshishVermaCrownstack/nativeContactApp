import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import globalStyles from '../../Styles/globalStyles';
import {REGISTER} from '../constants/routeNames';
import Container from './Container';
import CustomButton from './CustomButton';
import Input from './Input';
import Message from './Message';

export default function LoginComponent({
  onChange,
  form,
  onSubmit,
  err,
  loading,
  justSignedUp,
}) {
  const {navigate} = useNavigation();
  const [isSecureText, setIsSecureText] = useState(true);
  return (
    <Container>
      <Image
        source={require('../assets/images/logo.png')}
        style={globalStyles.logoImg}
      />
      <View>
        <Text style={globalStyles.title}>Welcome to RNContacts</Text>
        <Text style={globalStyles.subTitle}>Please login here</Text>
        <View style={globalStyles.form}>
          {justSignedUp && (
            <Message
              success
              message="Account created successfully"
              onDismiss={() => {}}
            />
          )}
          {err && (
            <Message
              retry
              retryFn={() => {}}
              onDismiss={() => {}}
              danger
              message={err.error || err.detail}
            />
          )}
          <Input
            label="Username"
            placeholder="enter username"
            onChangeText={val => onChange('username', val)}
            value={form.username || ''}
          />
          <Input
            label="Password"
            placeholder="enter password"
            icon={
              <TouchableOpacity onPress={() => setIsSecureText(prev => !prev)}>
                <Text>{isSecureText ? 'Show' : 'Hide'}</Text>
              </TouchableOpacity>
            }
            iconPosition="right"
            secureTextEntry={isSecureText}
            onChangeText={val => onChange('password', val)}
          />
          <CustomButton
            title="submit"
            primary
            onPress={() => onSubmit()}
            loading={loading}
            disabled={loading}
          />
        </View>
        <View style={globalStyles.createSection}>
          <Text style={globalStyles.infoText}>Need a new account?</Text>
          <TouchableOpacity onPress={() => navigate(REGISTER)}>
            <Text style={globalStyles.linkBtn}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
}
