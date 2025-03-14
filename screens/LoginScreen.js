import React, { useState } from "react";
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, StyleSheet } from "react-native";
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "../firebase/Config"; 

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async () => {
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            console.log("User created:", userCredentials.user.email);
        } catch (error) {
            alert("Try register again",error.message);
        }
    };

    const handleLogin = async () => {
        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            console.log("Logged in as:", userCredentials.user.email);
            navigation.replace("Tabs");//->Locations
        } catch (error) {
            alert("Register first", error.message);
        }
    };

    return (
   
        <KeyboardAvoidingView style={loginStyle.container}>
            <View>
                <Text style={loginStyle.buttonText}>Login or register</Text>
                <TextInput
                    style={loginStyle.input}
                    placeholder="Email"
                    onChangeText={text => setEmail(text)}
                    value={email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    value={password}
                    onChangeText={text => setPassword(text)}
                    placeholder="Password"
                    secureTextEntry
                    style={loginStyle.input}
                />
            </View>
            <View style={loginStyle.buttonContainer}>
                <Pressable onPress={handleLogin} style={loginStyle.button}>
                <Text style={loginStyle.buttonText}>Login</Text>
                </Pressable> 

                <Pressable onPress={handleSignUp} style={loginStyle.button}>
                <Text style={loginStyle.buttonText}>Register</Text>
                </Pressable> 
            </View>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;



const loginStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },

    buttonContainer:{
        alignItems: 'center',
        backgroundColor: 'yelow',
    },

    button:{
        backgroundColor: '#F6DC43',
        marginTop: 30,
        width: 100,
        alignItems: 'center',
        borderRadius: 10,

    },

    buttonText:{
        fontWeight: 'bold',
        fontSize: 20,
        color: '#410445'
    },

    input:{
        borderWidth: 1,
        marginTop: 16
    }
}
)