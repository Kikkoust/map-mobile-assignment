import React from "react";
import { View, Text, TextInput, Button } from "react-native";

const LoginScreen = ({ navigation }) => {
  const handleLogin = () => {
    
    navigation.replace("Tabs");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Login</Text>
      <TextInput placeholder="Username" style={{ borderBottomWidth: 1, width: 200, marginBottom: 20 }} />
      <TextInput placeholder="Password" secureTextEntry style={{ borderBottomWidth: 1, width: 200, marginBottom: 20 }} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
