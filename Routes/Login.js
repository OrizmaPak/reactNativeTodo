import React, { useContext, useState } from 'react';
import { View, Image, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import getStyles from '../Styles/styles';
import NavContext from '../Hooks/NavContext';
import { removeAccessToken, signinWithEmailAndPassword, storeAccessToken } from '../Hooks/useAuth';

export const Login = ({ navigation }) => {
  const {
    setUserEmail,
    setUserName,
    setNotify,
    setNotifyText,
    setNotifyStatus,
    setIsLoading,
  } = useContext(NavContext);
  const styles = getStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleTextChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    if (!email || !password) {
      setNotifyText('Please enter all fields');
      setNotifyStatus(0);
      setNotify(true);
    } else {
      console.log(email, password);
      try {
        const user = await signinWithEmailAndPassword(email.trim(), password);
        console.log('our result', user);
        if (user !== null) {
          setNotifyText('Login successful');
          setNotifyStatus(1);
          setNotify(true);
          setUserEmail(user.email);
          setUserName(user.name);
          storeAccessToken(user.token);
          navigation.navigate('Todo');
        } else {
          setNotifyText('An Error Occurred');
          setNotifyStatus(0);
          setNotify(true);
          setUserEmail(null);
          removeAccessToken();
        }
        // User has logged in successfully
        // You can navigate to the main screen or perform other actions
      } catch (error) {
        console.log(error);
        // Handle login error
      }
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.logincontainer}>
      <Image
        source={require('../assets/logo.png')}
        style={{ width: 300, height: 100, marginLeft: 'auto', marginRight: 'auto', transform: [{ scale: 0.8 }] }}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={{ color: 'white', marginLeft: 35, marginTop: 10 }}>Don't have an account? SignUp</Text>
      </TouchableOpacity>
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
      <Text style={{ color: 'white', marginLeft: 35, marginTop: 10 }}>Forgot password?</Text>
      <View style={{ width: 100, position: 'relative', marginLeft: 'auto', marginRight: 'auto', top: 10, left: 95 }}>
        <TouchableOpacity
          onPress={handleLogin}
          style={{ backgroundColor: '#5BBD64FF', padding: 10, borderRadius: 5 }}
          underlayColor="#DDDDDD"
        >
          <Text style={{ color: '#FFFFFF', textAlign: 'center', fontWeight: 800 }}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
