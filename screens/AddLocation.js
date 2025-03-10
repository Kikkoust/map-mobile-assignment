import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';

export default function AddLocation({ navigation, route }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);

  const addLocation = () => {
    console.log ("New location added", name, description, rating)
    route.params.addNewLocation({ name, rating, description });
    navigation.goBack();

  }

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