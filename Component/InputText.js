import { TextInput, View } from "react-native"
import { Button } from "react-native-elements"
import getStyles from "../styles"


export const InputText =({buttontext, value})=>{
    const styles = getStyles();
    return(
        <>
            <View style={styles.inputspace}>
                <TextInput
                style={{
                    height: 40,
                    width: '82%',
                    borderLeftWidth: 0,
                    borderColor: 'gray',
                    borderWidth: 1,
                    paddingHorizontal: 10,
                    backgroundColor: 'white',
                    borderBottomLeftRadius: 10,
                }}
                value={value}
                placeholder="Enter text"
                />
                <Button onPress={() =>Alert.alert('added')} title={buttontext} style={{ height: 45, padding: 10 }} />
            </View>
        </>
    )
}


