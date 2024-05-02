import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { initDatabase } from './database';
import TopScreen from './screens/TopScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import PersonnelLoginScreen from './screens/PersonnelLoginScreen';
import PersonnelSignupScreen from './screens/PersonnelSignupScreen';
import PersonnelHomeScreen from './screens/PersonnelHomeScreen';
import ViewRequestScreen from './screens/ViewRequestScreen';
import RequestScreen from './screens/RequestScreen';
import RequestLocationScreen from './screens/RequestLocationScreen';
import ViewPointsScreen from './screens/ViewPointsScreen';


const Stack = createNativeStackNavigator();


export default function App() {

  initDatabase();



  return (
    <NavigationContainer>
      <Stack.Navigator>
        { <Stack.Screen options={ {headerShown : false} } name="Top" component={TopScreen} />}
        { <Stack.Screen name="Personnel Signup" component={PersonnelSignupScreen} />}
        { <Stack.Screen name="Personnel Login" component={PersonnelLoginScreen} />}
        { <Stack.Screen name="Personnel Home" component={PersonnelHomeScreen} />}
        { <Stack.Screen name="View Request" component={ViewRequestScreen} />}
        { <Stack.Screen name="View Points" component={ViewPointsScreen} />}
        { <Stack.Screen name="Make Request" component={RequestScreen} />}
        { <Stack.Screen name="Request Location" component={RequestLocationScreen} />}
        { <Stack.Screen name="Login" component={LoginScreen} />}
        { <Stack.Screen name="Home" component={HomeScreen} />}
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
