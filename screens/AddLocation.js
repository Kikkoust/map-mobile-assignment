import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AirbnbRating } from 'react-native-ratings';
import { auth, db } from "../firebase/Config"
import { collection, addDoc } from 'firebase/firestore'; 

export default function AddLocation({ navigation, route }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);

  //SAVE TO ASYNC WHEN ADD NEW LOCATION-BUTTON PRESSED
  const addLocation = async () => {
    console.log("New location added", name, description, rating);
    
    const newLocation = { name, rating, description };

    try {
      const user = auth.currentUser;
      if (!user) {
        console.log("No user logged in");
        return;
      }

      const userEmail = user.email;
      const key = `locations_${userEmail}`;  //USER KEY

      //SAVE LOCATIONS TO FIRESTORE
      const locationRef = collection(db, "locations");
      await addDoc(locationRef, {
        userEmail: userEmail, 
        name: newLocation.name,
        description: newLocation.description,
        rating: newLocation.rating,
      });

      //LOAD SAVED LOCATIONS
      const storedLocations = await AsyncStorage.getItem(key);
      const locations = storedLocations ? JSON.parse(storedLocations) : [];

      //ADD LOCATION -> LIST
      locations.push(newLocation);

      //SAVE LIST -> ASYNC
      await AsyncStorage.setItem(key, JSON.stringify(locations));

      //EMPTY FIELDS
      setName('');
      setDescription('');
      setRating(0);

      //BACK TO LOCATIONSCREEN
      if (route.params && route.params.refreshLocations) {
        route.params.refreshLocations();
      }
      navigation.goBack();
    } catch (error) {
      console.error('Error saving location:', error);
    }
  };

  return (
    <View>

      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        keyboardType="default"
      />

      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        keyboardType="default"
      />

      <AirbnbRating
        count={5}
        defaultRating={rating}
        size={20}
        onFinishRating={(value) => setRating(value)}
      />

      {/*BUTTON TO ADD LOCATION TO LOCATIONSSCREEN*/}
      <Pressable 
        style={addLocStyle.button} onPress= {addLocation}>
        <Text style={addLocStyle.text}>Add new location</Text>
      </Pressable>


    </View>
  );
}

const addLocStyle = StyleSheet.create({
  button: {  
  alignItems: 'center',
  fontWeight: 'bold',
  backgroundColor: 'purple',
  borderRadius: 18,
  padding: 10,
  margin: 10,

  },

  text:{
    fontWeight:'bold',
    color: 'white',
  },


});