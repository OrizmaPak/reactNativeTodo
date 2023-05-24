import { StatusBar } from 'expo-status-bar';
import { Alert, Image, Text, TouchableOpacity, View, Animated, ScrollView } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { loadFonts } from './expo-font';
import getStyles  from './styles'; 
import NavContext from './NavContext';



export default function App() {
  // FOR THE PROFILE IMAGE
  const [imageSource, setImageSource] = useState(require('./assets/man.png'));
  // TO ENSURE FONTS ARE LOADED
  const [fontsLoaded, setFontsLoaded] = useState(false);
  // TO CONTROL THE NAVIGATION
  const [navAction, setNavAction] = useState(false);
  const [left, setLeft] = useState(0);
  
  // FOR ANIMATIONS
  const screenLeft = useState(new Animated.Value(0))[0]
  const borderrad = useState(new Animated.Value(0))[0]
  const screenScale = useState(new Animated.Value(1))[0]
  // TO IMPLEMENT STYLING
  const styles = getStyles(); 

  const animator =(animatorName, value, type=Animated.timing, time=250)=>{
    return type(animatorName, {
      toValue: value,
      duration: time,
      useNativeDriver: true,
    }).start()
  }
  useEffect(()=>{
    if(navAction){
      animator(screenLeft, 250, Animated.spring);
      animator(borderrad, 40, Animated.spring);
      animator(screenScale, 0.85, Animated.spring);
    }else{
      animator(borderrad, 0);
      animator(screenLeft, 0);
      animator(screenScale, 1);
    }
  },[navAction])


  // FUNCTION TO SELECT IMAGE AND SET IT TO THE IMAGESOURCE USESTATE
  const selectImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access media library denied');
        return;
      }
  
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
  
      if (!result.canceled && result.assets.length > 0) {
        const selectedAsset = result.assets[0];
        setImageSource({ uri: selectedAsset.uri });
      }
    } catch (error) {
      console.log('Error selecting image:', error);
    }
  };
  
  
  // LOAD FONTS
  useEffect(() => {
    try{
      const loadAsync = async () => {
        await loadFonts();
        setFontsLoaded(true);
      };
  
      loadAsync();
    }catch(err){
      console.log('an error occured')
    }
  }, []);

  // ENSURE FONT IS LOADED
  if (!fontsLoaded) {
    return <View />;
  }

  return (
    <NavContext.Provider value={{ navAction, setNavAction }}>
        <View style={styles.container}>
      <View style={styles.subContainer}>
        <TouchableOpacity onPress={()=>setNavAction(false)} style={{width: 35, marginLeft: 'auto'}}>
          <Image
            source={require('./assets/close.png')}
            style={{ width: 40, height: 40 }}
          />
        </TouchableOpacity>
        <View style={{ width: '100%', display: 'flex', alignItems: 'flex-start', position: 'relative', bottom: 10 }}>
          <TouchableOpacity onPress={selectImage} style={{ width: 100, height: 100, borderRadius: 100, overflow: 'hidden' }}>
            <LinearGradient colors={['white', 'blue']} style={{width: 100, height: 100,  display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={imageSource}
                style={{ width: 93, height: 93, borderRadius: 50}}
                />
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <Text style={styles.firstname}>Oreva</Text> 
        <Text style={styles.lastname}>Jovisam</Text>

        <View style={styles.navList}>
            <TouchableOpacity style={styles.button}>
              <Image source={require('./assets/home.png')}
                style={{ width: 25, height: 25 }}
                />
              <Text style={styles.navitem}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Image source={require('./assets/pay.png')}
                style={{ width: 25, height: 25 }}
                />
              <Text style={styles.navitem}>Make Payments</Text>
            </TouchableOpacity>
        </View>

        

      </View>
      
    {/* THE MAIN SCREEN */}
    <Animated.View style={[styles.screenContainer, { transform: [{ translateX: screenLeft }, { scale: screenScale }], borderRadius: borderrad }]}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setNavAction(true)}>
            <Image
              source={require('./assets/menu.png')}
              style={{ width: 30, height: 30 }}
              />
        </TouchableOpacity>
        <LinearGradient colors={['white', 'blue']} style={{width: 35, height: 35, borderRadius: 50, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={imageSource}
            style={{ width: 30, height: 30, borderRadius: 50}}
            />
        </LinearGradient>
      </View>

      <View>
        
      </View>



      
    </Animated.View>


      <StatusBar style="auto" />
    </View>
    </NavContext.Provider>

  );
}
