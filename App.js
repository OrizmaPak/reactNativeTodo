import { StatusBar } from 'expo-status-bar';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useState } from 'react';
import { styles } from './styles';

export default function App() {
  const [imageSource, setImageSource] = useState(require('./assets/man.png'));

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error:', response.error);
      } else if (response.assets && response.assets.length > 0) {
        // Replace the image with the selected image
        const selectedImage = response.assets[0];
        setImageSource({ uri: selectedImage.uri });
      }
    });
  };

  const closeNav =()=>{
    Alert.alert('Image Clicked!');
  }

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <TouchableOpacity onPress={closeNav} style={{ width: 35, marginLeft: 'auto' }}>
          <Image
            source={require('./assets/close.png')}
            style={{ width: 35, height: 35 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={openImagePicker} style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          <Image
            source={imageSource}
            style={{ width: 100, height: 100, position: 'relative', bottom: 20 }}
          />
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
