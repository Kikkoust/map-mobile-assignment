import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AirbnbRating } from 'react-native-ratings';

export default function LocationScreen({ navigation }) {
const [locations, setLocations] = useState([]);

const refreshLocations = async () => {
  try {
    const storedLocations = await AsyncStorage.getItem('locations');
    if (storedLocations) {
      setLocations(JSON.parse(storedLocations));
    }
  } catch (error) {
    console.error('Error retrieving locations:', error);
  }
};


useEffect(() => {
  refreshLocations();
}, []);

return (
  <View>
    {/* LOCATIONS -> ADD LOCATION BUTTON */}
    <Pressable
      style={addLocStyle.button}
      onPress={() => navigation.navigate('Add location', { refreshLocations })}
    >
      <Text style={addLocStyle.text}>Add new location</Text>
    </Pressable>

    {/* ADDED LOCATION LIST */}
    <FlatList
      style={locationList.listContainer}
      data={locations}
      renderItem={({ item }) => (
        <View style={locationList.list}>
          <Text style={locationList.text}>{item.name}</Text>
          <Text style={locationList.text}>{item.description}</Text>
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
  backgroundColor: '#F6DC43',
  borderRadius: 18,
  padding: 10,
  margin: 10,

  },

  text:{
    fontWeight:'bold',
    color: '#410445',
    fontSize: 20,
  },


});

const locationList = StyleSheet.create({
  listContainer:{
    height: 460,
    margin: 10,
    alignContent: 'center',
    backgroundColor: '#410445',
    borderWidth: 2,
    borderColor: '#F6DC43',
  },

  text:{
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },

  list:{
    borderBottomWidth: 2,
    borderBottomColor: '#F6DC43',
    alignItems: 'center',
    padding: 10,
  },

});
