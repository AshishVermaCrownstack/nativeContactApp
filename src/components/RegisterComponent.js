import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import globalStyles from '../../Styles/globalStyles';
import {LOGIN} from '../constants/routeNames';
import Container from './Container';
import CustomButton from './CustomButton';
import Input from './Input';
import Message from './Message';

export default function RegisterComponent({
  form,
  errors,
  onChange,
  onSubmit,
  err,
  loading,
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
        <Text style={globalStyles.subTitle}>Create a free account</Text>
        <View style={globalStyles.form}>
          {err && (
            <Message message={err.error} danger retry retryFn={() => {}} />
          )}
          <Input
            label="Username"
            placeholder="enter username"
            onChangeText={val => onChange('username', val)}
            error={errors.username || err?.username?.[0]}
          />
          <Input
            label="First Name"
            placeholder="enter firstname"
            onChangeText={val => onChange('first_name', val)}
            error={errors.first_name || err?.first_name?.[0]}
          />
          <Input
            label="Last Name"
            placeholder="enter lastname"
            onChangeText={val => onChange('last_name', val)}
            error={errors.last_name || err?.last_name?.[0]}
          />
          <Input
            label="Email"
            placeholder="enter email"
            onChangeText={val => onChange('email', val)}
            error={errors.email || err?.email?.[0]}
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
            error={errors.password || err?.password?.[0]}
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
          <Text style={globalStyles.infoText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigate(LOGIN)}>
            <Text style={globalStyles.linkBtn}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
}
