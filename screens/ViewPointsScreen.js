import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import {auth} from '../firebase'
import { useNavigation } from '@react-navigation/core'
import * as Location from 'expo-location';
import UserImage from './images/icons8-customer.svg';


const ViewPointsScreen = () => {


  const navigation = useNavigation()


  return (
    <View style={styles.container}>
        <Text>Current Points : 10</Text>  
    </View>
  )
}

export default ViewPointsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    paddingBottom: 5,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
},
buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
},
})