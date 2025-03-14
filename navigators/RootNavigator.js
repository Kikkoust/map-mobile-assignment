import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import LocationScreen from '../screens/LocationsScreen';
import AddLocationScreen from '../screens/AddLocation';
import MapScreen from '../screens/MapScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// BOTTOM NAVIGATOR
function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: true }}>
      <Tab.Screen 
        name="Locations" 
        component={LocationScreen} 
        options={{ 
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-sharp" size={size} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Add location" 
        component={AddLocationScreen} 
        options={{ 
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size={size} color={color} />
          ),
        }} 
      />
      {/*MAP SCREEN TAB*/}
      <Tab.Screen 
        name="Map" 
        component={MapScreen} 
        options={{ 
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="earth-sharp" size={size} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Capitals" 
        component={AddLocationScreen} 
        options={{ 
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="business" size={size} color={color} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
}

// STACK NAVIGATOR
const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}> 
      <Stack.Screen name="Tabs" component={BottomTabs} />
      <Stack.Screen name="Add location" component={AddLocationScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;