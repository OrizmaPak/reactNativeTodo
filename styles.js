import { StyleSheet } from "react-native";
import { useContext } from 'react';
import NavContext from './NavContext';

const getStyles = () => {
    return StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#0E1E54',
  },
  subContainer:{
    paddingLeft: '10%',
    paddingRight: '3%',
    width: '70%',
    height: '80%',
    position: 'relative',
    // backgroundColor: 'black',
  },
  firstname:{
    color: 'white',
    fontSize: 40,
    textTransform: 'capitalize',
    fontFamily: 'lili',
    marginTop: 15,
  },
  lastname:{
    color: 'white',
    fontSize: 40,
    textTransform: 'capitalize',
    marginTop: -5,
    fontFamily: 'lili',
  },
  navList: {
    // backgroundColor: 'red',
    width: '100%',
    height: 250,
    padding: 1,
    marginTop: 25
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#00105EFF',
    marginBottom: 5,
    borderRadius: 5,
    elevation: 5, // For Android devices
    shadowColor: '#000', // For iOS devices
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  navitem: {
    fontFamily: 'lili',
    color: 'white',
    marginLeft: 16,
    fontSize: 15,
    marginTop: 'auto',
    marginBottom: 'auto',
    
  },
  screenContainer: {
    position: 'absolute',
    width: '100%',
    overflow: 'hidden',
    paddingTop: 30,
    height: '100%',
    backgroundColor: '#D6FEFFFF',
  },
  header:{
    width: '100%',
    height: 30,
    // backgroundColor: 'red',
    paddingLeft: 20,
    paddingRight: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
}

export default getStyles;
