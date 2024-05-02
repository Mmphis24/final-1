import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import {auth} from '../firebase'
import { useNavigation } from '@react-navigation/core'
import * as Location from 'expo-location';
import UserImage from './images/icons8-customer.svg';


const PersonnelHomeScreen = () => {


  const navigation = useNavigation()

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Personnel Login");
        console.log ("Signed out");
      })
      .catch(error => alert(error.message))
  }




  const goToRequest = () => {
    navigation.navigate('View Request');
  };
  const goToPoints = () => {
    navigation.navigate('View Points');
  };

  return (
    <View style={styles.container}>
      <View>
            <UserImage height={100} width={100}/>
      </View>
      <Text style={styles.text}> {auth.currentUser?.email}</Text>

      <TouchableOpacity
        style={[styles.button, styles.buttonOutline]}
        onPress={() => goToRequest()}
      >
        <Text style={styles.buttonOutlineText}>View Requests</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.buttonOutline]}
        onPress={() => goToPoints()}
      >
        <Text style={styles.buttonOutlineText}>View Points</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleSignOut}
        style={[styles.button, styles.buttonOutline]}
      >
        <Text style={styles.buttonOutlineText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default PersonnelHomeScreen

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