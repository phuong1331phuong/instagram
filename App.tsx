/** @format */

import React, { useState, useEffect } from "react";
import { View, Text,Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "./components/auth/Landing";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import RegisterScreen from "./components/auth/Register";
import LoginScreen from "./components/auth/Login";
import { getAuth, onAuthStateChanged, signOut } from "@firebase/auth";
import { NativeBaseProvider, Box, Center } from 'native-base';
import theme from "./components/lib/theme";

// For Firebase JS SDK v7.20.0 and later, measurementId is optinal
const firebaseConfig = {
  apiKey: "AIzaSyAruDRdQCu6vNmFJm_f99Vx9Fvt8GuL78w",
  authDomain: "instagram-dev-c0f59.firebaseapp.com",
  projectId: "instagram-dev-c0f59",
  storageBucket: "instagram-dev-c0f59.appspot.com",
  messagingSenderId: "332201135364",
  appId: "1:332201135364:web:37d2ed9489c243d9cb5451",
  measurementId: "G-3WWH16JSWJ",
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const Stack = createNativeStackNavigator();
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const auth = getAuth();
  const componentDidMount = () => {
    onAuthStateChanged(auth, (user: any) => {
      if (!user) {
        setLoaded(true);
        setLoggedIn(false);
      } else {
        setLoaded(true);
        setLoggedIn(true);
      }
    });
  };
  useEffect(componentDidMount);
  if (!loaded) {
    return (
      <NativeBaseProvider theme={theme}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text> Loading</Text>
      </View>
      </NativeBaseProvider>
    );
  }

  if (!loggedIn) {
    return (
      <NativeBaseProvider theme={theme}>
        <Box height="100%" _dark={{
        borderColor: "coolGray.600",
        backgroundColor: "gray.700",
      }}
      _web={{
        shadow: 2,
        borderWidth: 0,
      }}
      _light={{
        backgroundColor: "gray.50",
      }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen
            name="Landing"
            component={LandingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
            </Box>
      </NativeBaseProvider>
    );
  }

  return (
    <NativeBaseProvider theme={theme}>
        <Box height="100%" _dark={{
        borderColor: "coolGray.600",
        backgroundColor: "gray.700",
      }}
      _web={{
        shadow: 2,
        borderWidth: 0,
      }}
      _light={{
        backgroundColor: "gray.50",
      }}>
            <Center>
      <Text> User is logged in</Text>
        <Button
          title="Log Out"
          onPress={() => {
            signOut(auth)
              .then(() => {
                // Sign-out successful.
              })
              .catch((error) => {
                // An error happened.
              });
          }}
        />
                </Center>
        </Box>
    </NativeBaseProvider>
  );
}
