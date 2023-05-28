import { View, TouchableOpacity, Text, TextInput } from 'react-native';
import getStyles from '../Styles/styles';
import { useState } from 'react';
import { numberFormat } from '../Hooks/numberFormat';

export const CardInputs = ({ navigation, route }) => {
  const { amount, reference } = route.params;
  const [cardNumber, setCardNumber] = useState('');
  const [mmyy, setmmyy] = useState('');
  const [cvv, setCvv] = useState('');
  const styles = getStyles();

  return (
    <View style={styles.logincontainer}>
      <Text style={{ color: 'white', marginLeft: 35, marginTop: 10, fontFamily: 'anton', fontSize: 25, fontWeight: 600 }}>
        Proceed to make payment of &#8358;{numberFormat(amount)}
      </Text>
      <Text style={{ color: 'white', marginLeft: 35, marginTop: 10 }}>Reference: {reference}</Text>
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
          textAlign: 'center',
        }}
        keyboardType="numeric"
        placeholder="CARD NUMBER"
        value={cardNumber}
        onChangeText={setCardNumber}
      />

      <View style={styles.carddate}>
        <TextInput
          style={{
            height: 55,
            width: '45%',
            marginTop: 20,
            borderLeftWidth: 0,
            borderColor: 'gray',
            borderWidth: 1,
            paddingHorizontal: 10,
            textAlign: 'center',
            backgroundColor: 'white',
            borderRadius: 10,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          keyboardType="numeric"
          placeholder="MMYY"
          value={mmyy}
          onChangeText={setmmyy}
        />
        <TextInput
          style={{
            height: 55,
            width: '20%',
            marginTop: 20,
            borderLeftWidth: 0,
            borderColor: 'gray',
            borderWidth: 1,
            textAlign: 'center',
            paddingHorizontal: 10,
            backgroundColor: 'white',
            borderRadius: 10,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          keyboardType="numeric"
          placeholder="CVV"
          value={cvv}
          onChangeText={setCvv}
        />
      </View>

      <View style={{ display: 'flex', flexDirection: 'row', width: '92%', position: 'relative', top: 10, justifyContent: 'flex-end' }}>
        <TouchableOpacity onPress={() => navigation.navigate('MakePayments')} style={{ width: 100, marginRight: 20, backgroundColor: '#7A1B20FF', padding: 10, borderRadius: 5, marginTop: 20 }} underlayColor="#DDDDDD">
          <Text style={{ color: '#FFFFFF', textAlign: 'center', fontWeight: 800 }}>BACK</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: 100, backgroundColor: '#5BBD64FF', padding: 10, borderRadius: 5, marginTop: 20 }} underlayColor="#DDDDDD">
          <Text style={{ color: '#FFFFFF', textAlign: 'center', fontWeight: 800 }}>PAY</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
