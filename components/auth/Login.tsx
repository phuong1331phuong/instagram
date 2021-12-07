/** @format */

import React, { useState, Component } from "react";
import { View, Button, TextInput } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Register() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<View>
			<TextInput
				placeholder='email'
				onChangeText={(email) => setEmail(email)}
			/>
			<TextInput
				placeholder='password'
				secureTextEntry={true}
				onChangeText={(password) => setPassword(password)}
			/>
			<Button
				title='Log in'
				onPress={() => {
					const auth = getAuth();
					signInWithEmailAndPassword(auth, email, password)
						.then((userCredential) => {
							// Signed in
							const user = userCredential.user;
							// ...
						})
						.catch((error) => {
							const errorCode = error.code;
							const errorMessage = error.message;
						});
				}}
			/>
		</View>
	);
}
