import React, { useContext, useState } from 'react';
import { View, Image, TextInput, TouchableOpacity, Text, Alert, ScrollView } from 'react-native';
import getStyles from '../Styles/styles';
import NavContext from '../Hooks/NavContext';
import { Firebase } from 'firebase/app';
import { registerWithEmailAndPassword, removeAccessToken, storeAccessToken } from '../Hooks/useAuth';

export const Register = ({navigation}) => {
  const { setUserName, setNotify, setNotifyText, setNotifyStatus, setIsLoading, setUserEmail } = useContext(NavContext);
  const styles = getStyles();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFirstnameChange = (text) => {
    setFirstname(text);
  };

  const handleLastnameChange = (text) => {
    setLastname(text);
  };

  const handleTextChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleSignup = async () => {
    setIsLoading(true)
    if (!email || !password || !firstname || !lastname) {
      setNotifyText('Please enter all fields');
      setNotifyStatus(0);
      setNotify(true);
    } else {
        console.log(email, password)
      try {
        const user = await registerWithEmailAndPassword(email.trim(), firstname, lastname, password);
        console.log('our result', user)
        if(user !== null){
            setNotifyText('Account created successfully');
            setNotifyStatus(1);
            setNotify(true);
            setUserEmail(user.email);
            setUserName(user.name);
            storeAccessToken(user.token)
            navigation.navigate('Todo')
        }else{
            setNotifyText('An Error Occured');
            setNotifyStatus(0);
            setNotify(true);
            setUserEmail(null)
            removeAccessToken()
        }
        // User has logged in successfully
        // You can navigate to the main screen or perform other actions
      } catch (error) {
        console.log(error);
        // Handle login error
      }
    }
    setIsLoading(false)
  };

  return (
    <View style={styles.logincontainer}>
      <Image
        source={require('../assets/logo.png')}
        style={{ width: 300, height: 100, marginLeft: 'auto', marginRight: 'auto', transform: [{ scale: 0.8 }] }}
      />
        <ScrollView>
              
    <TextInput
        style={{
          height: 55,
          width: '82%',
          marginTop: 20,
          borderLeftWidth: 0,
          borderColor: 'gray',
          borderWidth: 1,
          paddingHorizontal: 10,
          backgroundColor: 'white',
          borderRadius: 10,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        placeholder="First Name"
        value={firstname}
        onChangeText={handleFirstnameChange}
      />

      <TextInput
        style={{
          height: 55,
          width: '82%',
          marginTop: 20,
          borderLeftWidth: 0,
          borderColor: 'gray',
          borderWidth: 1,
          paddingHorizontal: 10,
          backgroundColor: 'white',
          borderRadius: 10,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        placeholder="Last name"
        value={lastname}
        onChangeText={handleLastnameChange}
      />
      <TextInput
        style={{
          height: 55,
          width: '82%',
          marginTop: 20,
          borderLeftWidth: 0,
          borderColor: 'gray',
          borderWidth: 1,
          paddingHorizontal: 10,
          backgroundColor: 'white',
          borderRadius: 10,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        placeholder="Email"
        value={email}
        onChangeText={handleTextChange}
      />

      <TextInput
        secureTextEntry={true}
        style={{
          height: 55,
          width: '82%',
          marginTop: 20,
          borderLeftWidth: 0,
          borderColor: 'gray',
          borderWidth: 1,
          paddingHorizontal: 10,
          backgroundColor: 'white',
          borderRadius: 10,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        placeholder="Password"
        value={password}
        onChangeText={handlePasswordChange}
      />

    <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
      <Text style={{ color: 'white', marginLeft: 35, marginTop: 10 }}>Already have an account? Sign In</Text>
    </TouchableOpacity>
      <View style={{ width: 100, position: 'relative', marginLeft: 'auto', marginRight: 'auto', top: 10, left: 95 }}>
        <TouchableOpacity onPress={handleSignup} style={{ backgroundColor: '#5BBD64FF', padding: 10, borderRadius: 5, position: 'relative', top:-10 }} underlayColor="#DDDDDD">
          <Text style={{ color: '#FFFFFF', textAlign: 'center', fontWeight: 800 }}>REGISTER</Text>
        </TouchableOpacity>
      </View>
        </ScrollView>
    </View>
  );
};
