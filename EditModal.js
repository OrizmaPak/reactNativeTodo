import { Text, TextInput, TouchableHighlight, View } from "react-native"
import getStyles from "./styles"
import NavContext from "./NavContext";
import { InputText } from "./Component/InputText";
import { useRef } from "react";
import { Button, CheckBox } from "react-native-elements";


export const EditModal =({navigation, route})=>{
    const styles = getStyles();
    const { id, text, checked } = route.params;
    const checkref = useRef();

  // You can use the retrieved values here in your component

  return (
    <>
        <View style={styles.modal}>
            <Text style={{width: '90%', marginLeft: 'auto', marginRight: 'auto', fontFamily: 'anton', textAlign: 'center', color: 'white', fontSize: 20 }}>Editing Task: {text}</Text>
            <View style={styles.inputspace}>
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
                value={text}
                placeholder="Enter text"
                />
            </View>  
            <View style={{width:'100%', position: 'relative', marginLeft: 'auto', marginRight: 'auto', top: 30, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}> 
                <CheckBox ref={checkref} checked={checked} onPress={() => handleCheckBoxToggle(id)} />
                <Text style={{fontFamily: 'anton', fontSize: 14, position: 'relative', right: 20, color: 'white', bottom: 2}}>Toggle Task</Text>
                {/* <Text>{checkref.checked ? 'Task completed' : 'Task not completed'}</Text> */}
            </View>
            <View style={{width:'100%', position: 'relative', marginLeft: 'auto', marginRight: 'auto', top: 30, display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}> 
                <View style={{width:100, position: 'relative', marginLeft: 'auto', marginRight: 'auto', top: 0 }}> 
                    <TouchableHighlight style={{ backgroundColor: 'red', padding: 10, borderRadius: 5 }} underlayColor="#DDDDDD">
                        <Text style={{ color: '#FFFFFF', textAlign: 'center', fontWeight: 800 }}>DELETE</Text>
                    </TouchableHighlight>
                </View> 
                <View style={{width:100, position: 'relative', marginLeft: 'auto', marginRight: 'auto', top: 0 }}> 
                    <TouchableHighlight onPress={()=>navigation.navigate('Todo')} style={{ backgroundColor: '#0D2F78FF', padding: 10, borderRadius: 5 }} underlayColor="#DDDDDD">
                        <Text style={{ color: '#FFFFFF', textAlign: 'center', fontWeight: 800 }}>BACK</Text>
                    </TouchableHighlight>
                </View> 
                <View style={{width:100, position: 'relative', marginLeft: 'auto', marginRight: 'auto', top: 0 }}> 
                    <TouchableHighlight style={{ backgroundColor: '#00B3FFFF', padding: 10, borderRadius: 5 }} underlayColor="#DDDDDD">
                        <Text style={{ color: '#FFFFFF', textAlign: 'center', fontWeight: 800 }}>UPDATE</Text>
                    </TouchableHighlight>
                </View> 
            </View> 

            {/* <Text>ID: {id}</Text>
            <Text>Text: {text}</Text>
            <Text>Checked: {checked ? 'true' : 'false'}</Text> */}
            {/* Rest of your component code */}
        </View>
    </>
  );
}