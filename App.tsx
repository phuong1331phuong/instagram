/** @format */

import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "./components/auth/Landing";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import RegisterScreen from "./components/auth/Register";
import LoginScreen from "./components/auth/Register";
import { getAuth, onAuthStateChanged } from "@firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
	const componentDidMount = () => {
		const auth = getAuth();
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
			<View style={{ flex: 1, justifyContent: "center" }}>
				<Text> Loading</Text>
			</View>
		);
	}

	if (!loggedIn) {
		return (
			<NavigationContainer>
				<Stack.Navigator initialRouteName='Landing'>
					<Stack.Screen
						name='Landing'
						component={LandingScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen name='Register' component={RegisterScreen} />
					<Stack.Screen name='Login' component={LoginScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		);
	}

	return (
		<View style={{ flex: 1, justifyContent: "center" }}>
			<Text> User is logged in</Text>
		</View>
	);
}
