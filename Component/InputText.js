import React, { useContext, useState } from 'react';
import { TextInput, View, Button, Alert } from 'react-native';
import getStyles from '../styles';
import { addATask, getAllTask } from '../Hooks/Todo';
import NavContext from '../NavContext';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export const InputText = ({ buttontext }) => {
  const styles = getStyles();
  const [inputValue, setInputValue] = useState('');
  const {callNotice, setIsLoading, userEmail} = useContext(NavContext)

  const handleAdd = async() => {
    setIsLoading(true)
    try{
        let task = await addATask(inputValue, userEmail);
        console.log("task made", task)
        if(task.status)callNotice(`${task.task} has been add`, 1)
        setInputValue('')
    }catch(error){
        console.log('task error', error)
        callNotice('Something went wrong', 0)
    }
    getAllTask(userEmail);
    setIsLoading(false)
};

  return (
    <View style={styles.inputspace}>
      <TextInput
        style={{
          height: 45,
          width: '82%',
          borderLeftWidth: 0,
          borderColor: 'gray',
          borderWidth: 1,
          paddingHorizontal: 10,
          backgroundColor: 'white',
          borderBottomLeftRadius: 10,
        }}
        value={inputValue}
        onChangeText={setInputValue}
        placeholder="Enter text"
      />
      <Button onPress={handleAdd} title={buttontext} style={{ height: 45, padding: 10 }} />
    </View>
  );
};


