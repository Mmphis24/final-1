import { StyleSheet, Text, View, TextInput, ScrollView, Pressable, Button, } from 'react-native'
import {React, useState, useEffect, } from 'react'
import { TouchableOpacity } from 'react-native'
import {auth} from '../firebase'
import { useNavigation } from '@react-navigation/core'
import * as Location from 'expo-location';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { firestore } from '../firebase'
import * as SQLite from 'expo-sqlite';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';











const ViewRequestScreen = ({ navigation, route }) => {
    const [requests, setRequests] = useState([]);

    const displayRequests = async () => {
        const personnelCollection = collection(firestore, 'user-input');
        let requests_ = [];


        //const current = new Date().getTime();
        //const reqlimit = 2 * 60 * 60 * 1000;

        //const queriedTime = current - reqlimit;
        //const personnelLoginQuery = query(personnelCollection, where("timestamp", ">", queriedTime));
        const snapshot = await getDocs(personnelCollection);

        snapshot.forEach(user => {
            requests_ = [...requests_, user.data()];
        });
        console.log(requests_);
        setRequests(requests_);
    };

    useEffect(() => {
        displayRequests();
    }, []);





  return (
    <View style={styles.container}>

        <ScrollView contentContainerStyle={styles.contentContainer}>
        
            {
                requests?.map((request) => (
                    
                    <View style={styles.buttonView}>
                      <Button  
                          style={styles.button}
                          onPress={() => navigation.navigate("Request Location", {
                              latitude: request.lat,
                              longitude: request.long,
                              phone: request.phone,
                              
                          })} 
                          title={request?.description}/>
                    </View>
                    
                ))
            }

            
        </ScrollView>
      
    </View>
  )
}

export default ViewRequestScreen

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
    alignContent: 'center',
    justifyContent: 'center',
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
    backgroundColor: 'white',
    width: '60%',
    padding: 15,
    paddingHorizontal: '50%',
    paddingVertical: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    zIndex: 50
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    zIndex: 100,
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
  },
  buttonView: {
    padding: 30,
    borderRadius: 75,
  },
  
  
})