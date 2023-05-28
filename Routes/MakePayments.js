import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import getStyles from '../Styles/styles';
import NavContext from '../Hooks/NavContext';
import { PAYSTACK_PUBLIC_KEY2 } from "@env";
import axios from 'axios';

export const MakePayments = ({ navigation }) => {
  const styles = getStyles();
  const [amount, setAmount] = useState('');
  const { callNotice, userEmail } = useContext(NavContext);

  const proceedPayment = async () => {
    try {
      const requestBody = {
        email: userEmail,
        amount: amount+'00',
      };

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${PAYSTACK_PUBLIC_KEY2}`,
      };

      const response = await axios.post('https://api.paystack.co/transaction/initialize', requestBody, {
        headers: headers,
      });

      navigation.navigate('PayStack', { url: response.data.data.authorization_url });

      console.log('response.data', response.data);
    } catch (error) {
      console.error('oboy', error);
    }
  };

  return (
    <>
      <View style={styles.logincontainer}>
        <Text style={{ color: 'white', marginLeft: 35, marginTop: 10 }}>
          Enter Amount (&#8358;)
        </Text>
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
          placeholder="Amount"
          value={amount}
          onChangeText={setAmount}
        />

        <View
          style={{
            width: 100,
            position: 'relative',
            marginLeft: 'auto',
            marginRight: 'auto',
            top: 10,
            left: 95,
          }}
        >
          <TouchableOpacity
            onPress={() => { amount > 99 ? proceedPayment() : callNotice('Please minimum amount is 100 naira', 0)}}
            style={{ backgroundColor: '#5BBD64FF', padding: 10, borderRadius: 5 }}
            underlayColor="#DDDDDD"
          >
            <Text style={{ color: '#FFFFFF', textAlign: 'center', fontWeight: 800 }}>
              Proceed
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
