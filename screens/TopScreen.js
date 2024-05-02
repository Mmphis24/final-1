import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import {auth} from '../firebase'
import { useNavigation } from '@react-navigation/core'

const TopScreen = () => {


  const navigation = useNavigation()

 
  return (
    <View style={styles.container}>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>User Login</Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Personnel Signup")}
      >
        <Text style={styles.buttonText}>Personnel Login</Text>
      </TouchableOpacity>

      
    </View>
  )
}

export default TopScreen

const styles = StyleSheet.create({
     container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#0782F9',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 80,
      },
      buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
      },
})