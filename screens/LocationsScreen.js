import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AirbnbRating } from 'react-native-ratings';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../firebase/Config';

export default function LocationScreen({ navigation }) {
  const [locations, setLocations] = useState([]);
  const [userEmail, setUserEmail] = useState('');

  const refreshLocations = async () => {
    try {
      const user = auth.currentUser;

      if (user) {
        setUserEmail(user.email); // LOGGED USER EMAIL
        const userEmail = user.email;
        const key = `locations_${userEmail}`; // USER KEY

        const storedLocations = await AsyncStorage.getItem(key);
        if (storedLocations) {
          const locationsArray = JSON.parse(storedLocations);
          setLocations(locationsArray.reverse());
        }
      }
    } catch (error) {
      console.error('Error retrieving locations:', error);
    }
  };

  useEffect(() => {
    refreshLocations();
  }, []);

  const logout = async () => {
    try {
      await auth.signOut(); // LOG OUT
      navigation.replace('Login'); // BACK TO LOGIN SCREEN
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const openMap = async (locationName) => {
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${locationName}&key=YOUR_GOOGLE_API_KEY`);
      const data = await response.json();
      const location = data.results[0]?.geometry.location;

      if (location) {
        navigation.navigate('Map', { latitude: location.lat, longitude: location.lng });
      } else {
        console.error('Location not found');
      }
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* HEADER */}
      <View style={headerStyle.container}>
        <Text style={headerStyle.email}>{userEmail}</Text>
        <Pressable onPress={logout} style={headerStyle.logoutButton}>
        <Ionicons name="log-out-outline" size={24} color="#410445" />
        </Pressable>
      </View>

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
            {/* OPEN MAP BUTTON */}
            <Pressable onPress={() => openMap(item.name)}>
              <Ionicons name="location-sharp" size={20} color="red" />
              <Text>View on Map</Text>
            </Pressable>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

/*HEADER STYLES*/
const headerStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#410445',
    padding: 10,
  },
  email: {
    color: '#F6DC43',
    fontWeight: 'bold',
    fontSize: 18,
  },
  logoutButton: {
    backgroundColor: '#F6DC43',
    padding: 10,
    borderRadius: 10,
  },
  logoutText: {
    color: '#410445',
    fontWeight: 'bold',
  },
});

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

  text: {
    fontWeight: 'bold',
    color: '#410445',
    fontSize: 20,
  },
});

/*LOCATION LIST STYLES*/
const locationList = StyleSheet.create({
  listContainer: {
    height: 460,
    margin: 10,
    alignContent: 'center',
    backgroundColor: '#410445',
    borderWidth: 2,
    borderColor: '#F6DC43',
  },

  text: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },

  list: {
    borderBottomWidth: 2,
    borderBottomColor: '#F6DC43',
    alignItems: 'center',
    padding: 10,
  },
});
