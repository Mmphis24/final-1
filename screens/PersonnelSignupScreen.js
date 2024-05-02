import { ImageBackground,height, Image, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, View, Button} from 'react-native'
import React, {useEffect, useState} from 'react'
import { TouchableOpacity } from 'react-native'
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import LoginImage from './images/undraw_access_account_re_8spm.svg';
import { useNavigation } from '@react-navigation/native';
import { firestore } from '../firebase'
import { ScrollView } from 'react-native-gesture-handler';
import { collection, addDoc, query, where } from 'firebase/firestore';

//navigation.replace("Top");

const PersonnelSignupScreen = () => {
    

    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user =>{
            if(user){
                navigation.navigate("Personnel Home")
            }
        })

        return unsubscribe
    }, [])







    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [Pid, setPid] = useState('');
    const [password, setPassword] = useState('');

    const personnelCollection = collection(firestore, 'personnel-signup');

    const personnelSignUp = async (input) => {
      
        try {
          await addDoc(personnelCollection, {
            firstname: firstname,
            lastname: lastname,
            Pid: Number(Pid),
            password: password,
          })
          console.log('Personnel signed up successfully!');
          alert("Signup Successful! Wait for approval...");
        } catch (err) {
          console.error("an error occured: ", err);
        }
    }


    const handleLogin = () => {
            signInWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Logged in with: '.user.email);
            })
            .catch(
                //error => alert(error.message)
            )
            
        const personnelLoginQuery = query(personnelCollection, where("Pid", "==", Number(Pid)), where("password", "==", password));
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >   

            <View>
                <LoginImage height={280} width={280}/>
            </View>

            <View style={styles.inputContainer}>
                
                <TextInput
                    placeholder='First Name'
                    //value={email}
                    onChangeText={text => setFirstname(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder='Last Name'
                    //value={password}
                    onChangeText={text => setLastname(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder='ID'
                    //value={password}
                    onChangeText={text => setPid(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder='Password'
                    //value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>

            <View style={styles.buttonContainer}>

                <TouchableOpacity
                    style={[styles.button, styles.buttonOutline]}
                    onPress={personnelSignUp}
                >
                    <Text style={styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate("Personnel Login")}
                    style={[styles.button, styles.buttonUnder]}

                >
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>
        </ScrollView>
        
  )
  }

export default PersonnelSignupScreen

const styles = StyleSheet.create({
    loginImage:{
        flex:1,
        width: '100%'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%',
        marginTop: '15%',
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 20,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
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
        marginBottom: 20,
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonUnder: {
        marginBottom: 60,
    },
})