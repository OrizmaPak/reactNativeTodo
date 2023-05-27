import { StatusBar } from 'expo-status-bar';
import { Alert, Image, Text, TouchableOpacity, View, Animated, ScrollView, Dimensions, TextInput, Button, Keyboard } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { loadFonts } from './Component/expo-font';
import getStyles  from './Styles/styles'; 
import NavContext from './Hooks/NavContext';
import { Svg, Path } from 'react-native-svg';
import { Todo } from './Routes/Todo'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefaultTheme, NavigationContainer, StackActions   } from '@react-navigation/native';
import { Login } from './Routes/Login';
import { EditModal } from './Routes/EditModal';
import { NotificationModal } from './Hooks/NotificationModal';
import { Register } from './Routes/Register';
import { app } from './config/firebase';
import { ActivityIndicator } from 'react-native';
import { getNamesFromEmail, signOutAUser } from './Hooks/useAuth';
import { getAllTask } from './Hooks/Todo';
import { MakePayments } from './Routes/MakePayments';
import RNPaystack from 'react-native-paystack';
import { CardInputs } from './Routes/CardInputs';

// try{'
//   RNPaystack.init({ publicKey: 'pk_live_132fe0fffedc720dd4455869215ae27be23ca2ff' });
//   RNPaystack.chargeCardWithAccessCode({
//     cardNumber: '4123450131001381', 
//     expiryMonth: '10', 
//     expiryYear: '17', 
//     cvc: '883',
//     accessCode: '2p3j42th639duy4'
//   })
// .then(response => {
//   console.log(response); // do stuff with the token
// })
// .catch(error => {
//   console.log(error); // error is a javascript Error object
//   console.log(error.message);
//   console.log(error.code);
// })
//   }))
// }catch(error){ 
//   console.log('paystackError', error)
// }

// import {NavigateContextProvider}  from "./Navigate" 



export default function App() {
  // TO DO ITEMS
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
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('')
  // IS LOADING STATE
  const [isLoading, setIsLoading] = useState(false)
  // SETTING AUTHENTICATION
  const [signedIn, setSignedIn] = useState(false);
  const navigationRef = useRef(null);
  // FOR THE PROFILE IMAGE
  const [imageSource, setImageSource] = useState(require('./assets/man.png'));
  // TO ENSURE FONTS ARE LOADED
  const [fontsLoaded, setFontsLoaded] = useState(false);
  // TO CONTROL THE NAVIGATION
  const [navAction, setNavAction] = useState(false);
  // TO CALL THE MODAL FOR EDITTING
  const [modal, setModal] = useState(false);
  // CALL MODALS
  const [notify, setNotify] = useState(false);
  const [notifytext, setNotifyText] = useState('');
  const [notifyStatus, setNotifyStatus] = useState(2);

  // GET NAMES WHEN USER SIGNS IN
  useEffect(() => {
    const fetchData = async () => {
      if (userEmail === '') {
        // Handle the case when userEmail is empty
      } else {
        try {
          let data = await getAllTask(userEmail);
          setCheckboxData(data);
        } catch (err) {
          callNotice('Something went wrong', 0);
        }
      }
    };
  
    fetchData();
  }, [userEmail]);
  
  
  // FOR ANIMATIONS
  const screenLeft = useState(new Animated.Value(0))[0]
  const borderrad = useState(new Animated.Value(0))[0]
  const screenScale = useState(new Animated.Value(1))[0]
  // TO IMPLEMENT STYLING
  const styles = getStyles(); 

  // NOTIFICATION MODAL
  

  const animator =(animatorName, value, type=Animated.timing, time=250)=>{
    return type(animatorName, {
      toValue: value,
      duration: time,
      useNativeDriver: true,
    }).start()
  }
  useEffect(()=>{
    console.log('firebase', app)
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

  // LOAD TASKS
  useEffect(()=>{
    try{
      getAllTask();
    }catch(err){
      callNotice('Error getting task', 0);
    }
  },[])


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

  const Stack = createNativeStackNavigator();

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'Yellow',
    },
  };

  // AUTOMATICALLY CALL MODAL
  const callNotice =(mssg, status = 2)=>{
    setNotifyText(mssg);
    setNotifyStatus(status);
    setNotify(true);
  }

  // SIGN OUT USER
  const signOutUser =()=>{
    setUserEmail('')
    navigationRef.current.navigate('Login');
  }

  // REMOVE KEYBOARD WHEN LOADING
  // useEffect(()=>{
     if(isLoading)Keyboard.dismiss()
  // },[isLoading])

  return (
    // <NavigateContextProvider>
    <NavContext.Provider value={{ checkboxData, setCheckboxData, callNotice, isLoading, setIsLoading, navAction, setNavAction, modal, setModal, animator, notify, setNotify, notifyStatus, setNotifyStatus, notifytext, setNotifyText, userEmail, setUserEmail, userName, setUserName }}>
      <View style={styles.container}>
        {/* LOADER */}
        <View style={{ display: isLoading ? 'flex' : 'none',width: '100%', height: '100%', marginTop: 'auto', marginBottom: 'auto', position: 'absolute', top: 0, zIndex:2000}}>
          <View style={{marginTop: 'auto', marginBottom: 'auto', top: 0, transform:[{scale: 2}]}}>
            <ActivityIndicator size="large" />
          </View>
        </View>
        {/* NOTIFIOATION MODAL */}
         <NotificationModal />  
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
          {userEmail !== '' ? 
          <>
            <Text style={styles.firstname}>{userName[1]}</Text> 
            <Text style={styles.lastname}>{userName[0]}</Text>
          </>
          :
          <Text style={styles.firstname}>WELCOME</Text> 
          }

          <View style={styles.navList}>
                {userEmail !== '' ? 
                  <>
                  <TouchableOpacity style={styles.button} onPress={()=>{navigationRef.current.navigate('Todo');setNavAction(false)}}>
                      <Image source={require('./assets/home.png')}
                      style={{ width: 25, height: 25 }}
                      />
                      <Text style={styles.navitem}>Home</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={()=>{navigationRef.current.navigate('MakePayments');setNavAction(false)}}> 
                      <Image source={require('./assets/pay.png')}
                      style={{ width: 25, height: 25 }}  
                      />
                      <Text style={styles.navitem}>Make Payments</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={async()=>{let result = await signOutAUser(); result == 'Sign out success' ? signOutUser() : callNotice('Signout Failed', 0);setNavAction(false);}}> 
                      <Image source={require('./assets/logout.png')}
                      style={{ width: 25, height: 25 }}  
                      />
                      <Text style={styles.navitemred}>Sign Out</Text>
                  </TouchableOpacity>
                  </>
                  :
                  <>
                  <TouchableOpacity style={styles.button} onPress={()=>{navigationRef.current.navigate('Login');setNavAction(false)}}> 
                      <Image source={require('./assets/login.png')}
                      style={{ width: 25, height: 25 }}  
                      />
                      <Text style={styles.navitem}>Sign In</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={()=>{navigationRef.current.navigate('Register');setNavAction(false)}}> 
                      <Image source={require('./assets/signup.png')}
                      style={{ width: 25, height: 25 }}  
                      />
                      <Text style={styles.navitem}>Sign Up</Text>
                  </TouchableOpacity>
                  </>
                }
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
          {userEmail !== '' ? 
          <LinearGradient colors={['white', 'blue']} style={{width: 35, height: 35, borderRadius: 50, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Image
              source={imageSource}
              style={{ width: 30, height: 30, borderRadius: 50}}
              />
          </LinearGradient>
          :
          <TouchableOpacity onPress={()=>{navigationRef.current.navigate('Login')}}>
            <Text style={{fontFamily: 'lili', color: '#4D1CFFFF', fontWeight: '800'}}>Sign In</Text>
          </TouchableOpacity>
          }
        </View>
        <View style={styles.inputSection}>
          <View style={{position: 'absolute', top: -80, }}>
            <Svg width={Dimensions.get('screen').width} height="100" viewBox="0 0 1440 320">
              <Path 
                d="M0,64L60,64C120,64,240,64,360,80C480,96,600,128,720,170.7C840,213,960,267,1080,266.7C1200,267,1320,213,1380,186.7L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                // d="M0,96L34.3,90.7C68.6,85,137,75,206,80C274.3,85,343,107,411,133.3C480,160,549,192,617,192C685.7,192,754,160,823,176C891.4,192,960,256,1029,256C1097.1,256,1166,192,1234,165.3C1302.9,139,1371,149,1406,154.7L1440,160L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
                fill="#5964FFFF"
                />
            </Svg>
          </View>

          {/* PAGE NAVIGATION */}
            <NavigationContainer ref={navigationRef} theme={MyTheme}> 
                  <Stack.Navigator>
                    {userEmail !== '' ? 
                    <>
                    <Stack.Screen
                      name="Todo"
                      component={Todo}
                      options={{ headerShown: false }}
                      />
                      <Stack.Screen 
                        name="Editmodal" 
                        component={EditModal} 
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen 
                        name="MakePayments" 
                        component={MakePayments} 
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen 
                        name="CardInputs" 
                        component={CardInputs} 
                        options={{ headerShown: false }}
                      />
                    </>
                      :
                      null
                    }
                    <Stack.Screen 
                      name="Login" 
                      component={Login} 
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen 
                      name="Register" 
                      component={Register} 
                      options={{ headerShown: false }}
                    />
                  </Stack.Navigator>
            </NavigationContainer>

        </View>



        
      </Animated.View>


        <StatusBar style="auto" />
      </View>
    </NavContext.Provider>
    // </NavigateContextProvider>

  );
}
