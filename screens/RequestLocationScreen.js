import { StyleSheet, Text, View, TextInput, ScrollView, Dimensions } from 'react-native'
import {React, useState, useEffect, useRef } from 'react'
import { TouchableOpacity } from 'react-native'
import {auth} from '../firebase'
import { useNavigation } from '@react-navigation/core'
import * as Location from 'expo-location';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { firestore } from '../firebase'
import * as SQLite from 'expo-sqlite';
import { collection, addDoc, query, where } from 'firebase/firestore';
import { GOOGLE_API_KEY } from '../environment';
import MapView, { LatLng, Marker } from 'react-native-maps';
import { GooglePlaceDetail, GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Constants from "expo-constants";
import MapViewDirections from 'react-native-maps-directions';
import geolib from 'geolib';




const GOOGLE_MAPS_API_KEY = 'AIzaSyBkif8S254Q46CieeJ7DKKgdUthmBrxzkE';






const RequestLocationScreen = ({ navigation, route }) => {
    const long = Number(route.params.longitude)
    const lat = Number(route.params.latitude)
    const phone = Number(route.params.phone)


    const DESTINATION_COORDS = {
      latitude: lat, //  destination latitude
      longitude: long //  destination longitude
    };
   





    const [origin, setOrigin] = useState(null);
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');
    const mapRef = useRef(null);
  
    useEffect(() => {
      getLocationAsync();
    }, []);
  
    const getLocationAsync = async () => {
      const { status } = await requestForegroundPermissionsAsync();
  
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
  
      const location = await Location.getCurrentPositionAsync({ accuracy: Accuracy.High });
      setOrigin(location.coords);
  
      const originLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
  
      const destinationLocation = {
        latitude: DESTINATION_COORDS.latitude,
        longitude: DESTINATION_COORDS.longitude,
      };
  
      const distanceInMeters = geolib.getDistance(originLocation, destinationLocation);
      setDistance(distanceInMeters + ' kilometers');
  
      const timeInMinutes = distanceInMeters / 50; // Assuming a constant speed of 50 meters per minute
      setDuration(Math.round(timeInMinutes) + ' minutes');
    };
  
    const handleMapReady = () => {
      mapRef.current.fitToCoordinates([origin, DESTINATION_COORDS], {
        edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
        animated: true,
      });
    };
  
    const handleLocationChange = (location) => {
      setOrigin(location.coords);
    };









  return (
    <View style={{ flex: 1 }}>
      {origin && (
        <View
          style={{
            position: 'absolute',
            top: 20,
            alignSelf: 'center',
            backgroundColor: 'white',
            padding: 10,
            borderRadius: 10,
            zIndex: 1,
          }}
        >
          <Text>Origin - Destination:</Text>
          <Text>Distance: {distance}</Text>
          <Text>ETA: {duration}</Text>
        </View>
      )}

      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: DESTINATION_COORDS.latitude,
          longitude: DESTINATION_COORDS.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onMapReady={handleMapReady}
      >
        {origin && <Marker coordinate={origin} title="Origin" />}
        <Marker coordinate={DESTINATION_COORDS} title="Destination" pinColor="red" />
        {origin && (
          <MapViewDirections
            origin={origin}
            destination={DESTINATION_COORDS}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeWidth={3}
            strokeColor="blue"
            optimizeWaypoints={true}
            onReady={(result) => {
              mapRef.current.fitToCoordinates(result.coordinates, {
                edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
                animated: true,
              });
              const distanceInMeters = result.distance;
              setDistance(distanceInMeters + ' kilometers');

              const timeInMinutes = (distanceInMeters / 100) * 60.3; // Assuming a constant speed of 100 kilometers per hour
              setDuration(Math.round(timeInMinutes) + ' minutes');
            }}
          />
        )}
      </MapView>

      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 20,
          alignSelf: 'center',
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 10,
        }}
        onPress={getLocationAsync}
      >
        <Text>Using Current Location</Text>
      </TouchableOpacity>
    </View>


  )
}

export default RequestLocationScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  searchContainer:{
    position: "absolute",
    width: "80%",
    left: "10%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
    top: Constants.statusBarHeight,
  },
  input: {
    borderColor: "#888",
    borderWidth: 0.5,
  },
  button: {
    backgroundColor: "#bbb",
    paddingVertical: 12,
    marginTop: 16,
    borderRadius: 4,
  },
  buttonText: {
    textAlign: "center",

  },
});

