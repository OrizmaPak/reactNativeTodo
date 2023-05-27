import { useContext, useEffect, useState } from "react"
import { Alert, Animated, Text, View } from "react-native"
import NavContext from "./NavContext";

export const NotificationModal =()=>{
    
    const {notify, notifytext, notifyStatus, animator, setNotify, setNotifyText, setNotifyStatus} = useContext(NavContext);

    const noticemove = useState(new Animated.Value(500))[0];
    const [color, setColor] = useState(['white', 'black'])

    useEffect(()=>{
        let timeout = setTimeout(()=>{
            setNotify(false);
        },3000)
        if(notify){
            animator(noticemove, 80, Animated.spring);
            timeout
        }else{
            animator(noticemove, 500, Animated.spring, 2000);
        }
        return  () => {
            clearTimeout(timeout);
          };
    },[notify])

    useEffect(()=>{
        if(notifyStatus == 2)setColor(['white', 'black'])
        if(notifyStatus == 1)setColor(['green', 'white'])
        if(notifyStatus == 0)setColor(['#9E0000FF', 'white'])
    },[notifyStatus])

    return(
        <>
            <Animated.View style={{transform: [{ translateX: noticemove }], zIndex:1000, position: 'absolute', top: 50, padding: 20, backgroundColor: color[0], width: '80%' }}>
                <Text style={{color: color[1]}}>{notifytext}</Text>
            </Animated.View>
        </>
    )
}