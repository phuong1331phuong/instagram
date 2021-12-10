/** @format */

import React, { useState, Component } from "react";
import { View, Button, TextInput } from "react-native";
import {
	getAuth,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
} from "firebase/auth";
import {
	collection,
	addDoc,
	getFirestore,
	setDoc,
	doc,
} from "firebase/firestore";

export default function Register() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<View>
			<TextInput
				placeholder='name'
				onChangeText={(name) => setName(name)}
			/>
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
				title='Sign Up'
				onPress={() => {
					const auth = getAuth();
					const db = getFirestore();

					createUserWithEmailAndPassword(auth, email, password)
						.then(async (userCredential) => {
							try {
								const user2: any = auth.currentUser;
								await setDoc(doc(db, "users", user2.uid), {
									name,
									email,
								});
							} catch (e) {
								console.error("Error adding document: ", e);
							}
							// Signed in
							const user = userCredential.user;
							// ...
						})
						.catch((error) => {
							const errorCode = error.code;
							const errorMessage = error.message;
							// ..
						});
				}}
			/>
		</View>
	);
}

