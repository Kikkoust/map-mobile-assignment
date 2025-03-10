import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';

export default function LocationScreen({ navigation }) {
const [locations, setLocations] = useState([]);

const addNewLocation = (location) => {
  setLocations((prevLocations) => [...prevLocations, location]);
};


return (
  <View>

    {/*LOCATIONS -> ADD LOCATION BUTTON*/}
    <Pressable
      style={addLocStyle.button}
      onPress={() => navigation.navigate('Add location', { addNewLocation })}
    >
      <Text style={addLocStyle.text}>Add new location</Text>
    </Pressable>

        {/*ADDED LOCATION LIST*/}
    <FlatList
      data={locations}
      renderItem={({ item }) => (
        <View>
          <Text>{item.name}</Text>
          <Text>{item.description}</Text>
          <AirbnbRating 
            defaultRating={item.rating} 
            size={16}
            showRating={false}
            isDisabled
          />

        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
    />

  </View>
);
}


/*ADD NEW BUTTON STYLES*/
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

