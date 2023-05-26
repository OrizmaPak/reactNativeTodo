import React, { useContext, useState } from 'react';
import { View, TextInput, Button, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import getStyles from './styles';
import { CheckBox } from 'react-native-elements';
import { Image } from 'react-native';
import NavContext from './NavContext';
import { InputText } from './Component/InputText';

export const Todo = ({ navigation }) => {
    const modal = useContext(NavContext).modal;
    // FOR STYLES
  const styles = getStyles();
  const [checkboxData, setCheckboxData] = useState([
    // { id: 1, checked: false, text: 'Going to the marketGoing to the marketGoing to the market' },
    // { id: 2, checked: false, text: 'Meeting with friends' },
    // { id: 3, checked: false, text: 'Finish homework' },
    // { id: 4, checked: false, text: 'Exercise at the gym' },
    // { id: 5, checked: false, text: 'Read a book' },
    // { id: 6, checked: false, text: 'Buy groceries' },
    // { id: 7, checked: false, text: 'Buy food' },
    // { id: 8, checked: false, text: 'Buy gold' },
    // { id: 9, checked: false, text: 'Buy silver' },
    // { id: 10, checked: false, text: 'Buy bitcoin' },
]);

  const handleCheckBoxToggle = (id) => {
    const newCheckboxData = [...checkboxData]; // Create a copy of the checkbox data array
    newCheckboxData[id-1].checked = !newCheckboxData[id-1].checked; // Toggle the state of the clicked checkbox
    setCheckboxData(newCheckboxData); // Update the checkbox data
  };

  return (
    <>
      <InputText buttontext="add" />
        <View style={{height: '79%', width: '100%',}}>
            <ScrollView style={styles.cardContainer}>
                <Text style={{textAlign:'center', color: 'white', fontFamily: 'lili', marginTop: 10 }}>
                {checkboxData.filter(item => item.checked === false).length === 0
                    ? 'NO PENDING TASK'
                    : checkboxData.filter(item => item.checked === false).length === 1
                    ? '1 TASK PENDING'
                    : `${checkboxData.filter(item => item.checked === false).length} TASKS PENDING`}
                </Text>       
                {checkboxData.filter(item=>item.checked == false).map((item) => (
                    <View key={item.id} style={styles.cardItem}>
                    <CheckBox checked={item.checked} onPress={() => handleCheckBoxToggle(item.id)} />
                    <Text style={{ color: '#1443A3FF', fontWeight: 'bold', fontSize: 14, position: 'relative', right: 16, width: '60%'}}>{item.text}</Text>
                    <TouchableOpacity style={{ marginLeft: 'auto' }} onPress={()=>navigation.navigate('Editmodal', {id: item.id, text: item.text, checked: item.checked})}>
                    <Image source={require('./assets/draw.png')} style={{ width: 20, height: 20 }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 'auto' }} onPress={()=>navigation.navigate('Editmodal', {id: item.id, text: item.text, checked: item.checked})}>
                    <Image source={require('./assets/delete.png')} style={{ width: 20, height: 20, position: 'relative', left: 13, }} />
                    </TouchableOpacity>
                </View>
                ))}
                <Text style={{textAlign:'center', color: 'white', fontFamily: 'lili', marginTop: 10}}>
                {checkboxData.filter(item => item.checked === true).length === 0
                    ? 'NO COMPLETED TASK'
                    : checkboxData.filter(item => item.checked === true).length === 1
                    ? '1 TASK COMPLETED'
                    : `${checkboxData.filter(item => item.checked === true).length} TASKS COMPLETED`}
                </Text>       
                {checkboxData.filter(item=>item.checked == true).map((item) => (
                <View key={item.id} style={styles.cardItem}>
                    <CheckBox checked={item.checked} onPress={() => handleCheckBoxToggle(item.id)} />
                    <Text style={{ color: '#1443A3FF', fontWeight: 'bold', fontSize: 14, position: 'relative', right: 16, width: '60%'}}>{item.text}</Text>
                    <TouchableOpacity style={{ marginLeft: 'auto' }} onPress={()=>navigation.navigate('Editmodal', {id: item.id, text: item.text, checked: item.checked})}>
                    <Image source={require('./assets/draw.png')} style={{ width: 20, height: 20 }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 'auto' }} onPress={()=>navigation.navigate('Editmodal', {id: item.id, text: item.text, checked: item.checked})}>
                    <Image source={require('./assets/delete.png')} style={{ width: 20, height: 20, position: 'relative', left: 13, }} />
                    </TouchableOpacity>
                </View>
                ))}
            </ScrollView>
        </View>
    </>
  );
};


