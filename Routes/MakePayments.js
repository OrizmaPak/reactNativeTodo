import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import getStyles from '../Styles/styles';
import RNPaystack from 'react-native-paystack';
import NavContext from '../Hooks/NavContext';

export const MakePayments = ({ navigation }) => {
  const styles = getStyles();
  const [amount, setAmount] = useState('');
  const [reference, setReference] = useState('');
  const { callNotice } = useContext(NavContext)

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
        <Text style={{ color: 'white', marginLeft: 35, marginTop: 40 }}>
        Reference(optional)
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
          placeholder="Reference"
          value={reference}
          onChangeText={setReference}
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
            onPress={() => { amount > 99 ? navigation.navigate('CardInputs', {amount:amount, reference:reference}) : callNotice('Please minimum amount is 100 naira', 0)}}
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
