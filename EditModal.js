import React, { useContext, useRef, useState } from 'react';
import { Text, TextInput, TouchableHighlight, View } from 'react-native';
import getStyles from './styles';
import { CheckBox } from 'react-native-elements';
import { deleteTask, getAllTask, updateMultipleFields } from './Hooks/Todo';
import NavContext from './NavContext';

export const EditModal = ({ navigation, route }) => {
  const {setCheckboxData, callNotice, setIsLoading, userEmail} = useContext(NavContext)
  const styles = getStyles();
  const { id, task, checked, action } = route.params;
  const [inputvalue, setInputvalue] = useState(task);
  const [inputcheck, setInputcheck] = useState(checked);

  const handleUpdateEdit = async () => {
    setIsLoading(true)
    try {
      let result = await updateMultipleFields(id, { task: inputvalue, checked: inputcheck });
      if(result){
            let data = await getAllTask(userEmail);
            setCheckboxData(data);
            navigation.navigate('Todo')
            callNotice('Update Successful', 1);
        }
        // Handle successful update
    } catch (error) {
    console.error('Update failed:', error);
    callNotice('Update failed', 0)
      // Handle update error
    }
    setIsLoading(false)
  };

  const handleDeleteTask = async() =>{
    setIsLoading(true)
    try{
        let result = await deleteTask(id);
        if(result){
            let data = await getAllTask(userEmail);
            setCheckboxData(data);
            navigation.navigate('Todo')
            callNotice('Update Successful', 1);
        }
    }catch(err){
        console.error('Delete failed:', error);
        callNotice('Delete failed', 0)
    }
    setIsLoading(false)
  }

  return (
    <>
      <View style={styles.modal}>
        <Text style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto', fontFamily: 'anton', textAlign: 'center', color: 'white', fontSize: 20, display: action == 'edit' ? 'flex' : 'none' }}>Editing Task: {task}</Text>
        <Text style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto', fontFamily: 'anton', textAlign: 'center', color: '#36000CFF', fontSize: 19, display: action == 'delete' ? 'flex' : 'none' }}>Are you sure you want to delete Task: </Text>
        <Text style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto', fontFamily: 'anton', textAlign: 'center', color: '#FFEBF2FF', fontSize: 22, display: action == 'delete' ? 'flex' : 'none' }}>{task}?</Text>
        <View style={[styles.inputspace, {display: action == 'edit' ? 'flex' : 'none'}]}>
          <TextInput
            style={{
              height: 70,
              width: '95%',
              borderLeftWidth: 0,
              borderColor: 'gray',
              borderWidth: 1,
              paddingHorizontal: 10,
              backgroundColor: 'white',
              borderBottomLeftRadius: 10,
            }}
            value={inputvalue}
            onChangeText={setInputvalue}
            placeholder="Enter task"
          />
        </View>
        <View style={{ width: '100%', position: 'relative', marginLeft: 'auto', marginRight: 'auto', top: 30, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', display: action == 'edit' ? 'flex' : 'none' }}>
          <CheckBox
            checked={inputcheck}
            onPress={() => setInputcheck(!inputcheck)}
          />
          <Text style={{ fontFamily: 'anton', fontSize: 14, position: 'relative', right: 20, color: 'white', bottom: 2 }}>Toggle Task</Text>
        </View>
        <View style={{ width: '100%', position: 'relative', marginLeft: 'auto', top: 30, display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={{ width: 100, position: 'relative', marginLeft: 'auto', marginRight: 'auto', top: 0 }}>
            <TouchableHighlight onPress={() => navigation.navigate('Todo')} style={{ backgroundColor: '#0D2F78FF', padding: 10, borderRadius: 5 }} underlayColor="#DDDDDD">
              <Text style={{ color: '#FFFFFF', textAlign: 'center', fontWeight: '800' }}>BACK</Text>
            </TouchableHighlight>
          </View>
          <View style={{ width: 100, position: 'relative', marginLeft: 'auto', top: 0, display: action == 'delete' ? 'flex' : 'none' }}>
            <TouchableHighlight onPress={handleDeleteTask} style={{ backgroundColor: 'red', padding: 10, borderRadius: 5 }} underlayColor="#DDDDDD">
              <Text style={{ color: '#FFFFFF', textAlign: 'center', fontWeight: '800' }}>YES DELETE</Text>
            </TouchableHighlight>
          </View>
          <View style={{ width: 100, position: 'relative', marginLeft: 'auto', top: 0, display: action == 'edit' ? 'flex' : 'none'}}>
            <TouchableHighlight onPress={handleUpdateEdit} style={{ backgroundColor: '#00B3FFFF', padding: 10, borderRadius: 5 }} underlayColor="#DDDDDD">
              <Text style={{ color: '#FFFFFF', textAlign: 'center', fontWeight: '800' }}>UPDATE</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </>
  );
};
