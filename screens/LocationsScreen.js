import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function LocationScreen({ navigation }) {
  return (
    <View>
        <Pressable style={addLocStyle.button} onPress={() => navigation.navigate("Add location")}>
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
  borderRadius: 6,
  padding: 10,
  margin: 10,

  },

  text:{
    fontWeight:'bold',
    color: 'white',
  },


});

