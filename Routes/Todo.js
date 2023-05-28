import React, { useContext, useState } from 'react';
import { View, TextInput, Button, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import getStyles from '../Styles/styles';
import { CheckBox } from 'react-native-elements';
import { Image } from 'react-native';
import NavContext from '../Hooks/NavContext';
import { InputText } from '../Component/InputText';
import { getAllTask, updateFieldTask } from '../Hooks/Todo';

export const Todo = ({ navigation }) => {
  const { callNotice, setIsLoading, checkboxData, setCheckboxData, userEmail } = useContext(NavContext);
  const styles = getStyles();

  const handleCheckBoxToggle = async (id, checked) => {
    setIsLoading(true);
    try {
      let result = await updateFieldTask(id, 'checked', !checked);
      if (result) {
        let data = await getAllTask(userEmail);
        setCheckboxData(data);
        callNotice('Update successful', 1);
      } else {
        callNotice('Update failed', 0);
      }
    } catch (err) {
      callNotice('Update failed', 0);
    }
    setIsLoading(false);
  };

  return (
    <>
      <InputText buttontext="add" />
      <View style={{ height: '79%', width: '100%' }}>
        <ScrollView style={styles.cardContainer}>
          <Text style={{ textAlign: 'center', color: 'white', fontFamily: 'lili', marginTop: 10 }}>
            {checkboxData.filter(item => item.checked === false).length === 0
              ? 'NO PENDING TASK'
              : checkboxData.filter(item => item.checked === false).length === 1
              ? '1 TASK PENDING'
              : `${checkboxData.filter(item => item.checked === false).length} TASKS PENDING`}
          </Text>
          {checkboxData.filter(item => item.checked == false).map((item) => (
            <View key={item.id} style={styles.cardItem}>
              <CheckBox checked={item.checked} onPress={() => handleCheckBoxToggle(item.id, item.checked)} />
              <Text style={{ color: '#1443A3FF', fontWeight: 'bold', fontSize: 14, position: 'relative', right: 16, width: '60%' }}>{item.task}</Text>
              <TouchableOpacity style={{ marginLeft: 'auto' }} onPress={() => navigation.navigate('Editmodal', { id: item.id, task: item.task, checked: item.checked, action: 'edit' })}>
                <Image source={require('../assets/draw.png')} style={{ width: 20, height: 20 }} />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 'auto' }} onPress={() => navigation.navigate('Editmodal', { id: item.id, task: item.task, checked: item.checked, action: 'delete' })}>
                <Image source={require('../assets/delete.png')} style={{ width: 20, height: 20, position: 'relative', left: 13 }} />
              </TouchableOpacity>
            </View>
          ))}
          <Text style={{ textAlign: 'center', color: 'white', fontFamily: 'lili', marginTop: 10 }}>
            {checkboxData.filter(item => item.checked === true).length === 0
              ? 'NO COMPLETED TASK'
              : checkboxData.filter(item => item.checked === true).length === 1
              ? '1 TASK COMPLETED'
              : `${checkboxData.filter(item => item.checked === true).length} TASKS COMPLETED`}
          </Text>
          {checkboxData.filter(item => item.checked == true).map((item) => (
            <View key={item.id} style={styles.cardItem}>
              <CheckBox checked={item.checked} onPress={() => handleCheckBoxToggle(item.id, item.checked)} />
              <Text style={{ color: '#1443A3FF', fontWeight: 'bold', fontSize: 14, position: 'relative', right: 16, width: '60%' }}>{item.task}</Text>
              <TouchableOpacity style={{ marginLeft: 'auto' }} onPress={() => navigation.navigate('Editmodal', { id: item.id, task: item.task, checked: item.checked, action: 'edit' })}>
                <Image source={require('../assets/draw.png')} style={{ width: 20, height: 20 }} />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 'auto' }} onPress={() => navigation.navigate('Editmodal', { id: item.id, task: item.task, checked: item.checked, action: 'delete' })}>
                <Image source={require('../assets/delete.png')} style={{ width: 20, height: 20, position: 'relative', left: 13 }} />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
};
