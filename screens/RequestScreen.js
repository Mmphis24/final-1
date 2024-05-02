import { StyleSheet, Text, View, TextInput, ScrollView, } from 'react-native'
import {React, useState, useEffect, } from 'react'
import { TouchableOpacity } from 'react-native'
import {auth} from '../firebase'
import { useNavigation } from '@react-navigation/core'
import * as Location from 'expo-location';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { firestore } from '../firebase'
import * as SQLite from 'expo-sqlite';
import { collection, addDoc, query, where } from 'firebase/firestore';








const deleteUserInput = async (input) => {
  const deletionTime = 6 * 60 * 60 * 1000;
  const currentTime = Date.now() - deletionTime;

  const userInputCollection = collection(firestore, 'user-input');
  const userInputCollectionQuery = query(userInputCollection, where("timestamp", "<=", currentTime))

}





const RequestScreen = () => {
  
  
    const navigation = useNavigation()

    const storeUserInput = async (input) => {
      const { description, phone, lat, long } = input;
      const userInputCollection = collection(firestore, 'user-input');
    
      try {
        await addDoc(userInputCollection, {
          description: description,
          phone: phone,
          lat: Number(lat),
          long: Number(long),
          timestamp: new Date().toTimeString()
        })
        console.log('User input stored successfully!');
        alert("Request Successful!");
        navigation.navigate("Home")
      } catch (err) {
        console.error("an error occured", err);
      }
    
    }











  
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [description, setDescription] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  

  useEffect(() => {
    (async () => {
      // Request permission to access location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      // Get current location
      let { coords } = await Location.getCurrentPositionAsync({});
      setLocation(coords);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `Latitude: ${location.latitude}, Longitude: ${location.longitude}`;
    console.log(text);
    //alert("Current location Accessed!");
    
  }















  return (
    <View style={styles.container}>

      <View style={styles.inputContainer}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <TextInput
                multiline={true}
                numberOfLines={6}
                style={styles.textInput}
                onChangeText={ (text) => setDescription(text)}
                placeholder="Enter description of problem here..."
            />
            <TextInput
                numberOfLines={4} 
                style={styles.phoneInput}
                onChangeText={(text) => setPhoneNumber(text)}
                placeholder="Enter phone number here..."
            />
            <View style={styles.submitView}>
                <TouchableOpacity
                    onPress={() => storeUserInput({
                      description: description,
                      phone: phoneNumber,
                      lat: location?.latitude,
                      long: location?.longitude,

                    })}
                    style={[styles.button]}
                >
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
            

            
        </ScrollView>
            
        
        
        {/* <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </View>
             */}
           
        </View>

      
    </View>
  )
}

export default RequestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,

  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 50,
  },
  text: {
    paddingBottom: 5,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
    textInput: {
    borderColor: 'grey',
    borderWidth: 3,
    paddingHorizontal: 50,
    paddingVertical: 5,
    borderRadius: 15,
    textAlign: 'center',
  },
  phoneInput: {
    borderColor: 'grey',
    borderWidth: 3,
    paddingHorizontal: 50,
    paddingVertical: 0.01,
    borderRadius: 15,
    marginTop: 40,
    textAlign: 'center',
  },
  submitView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 90,
  }
  
  
})