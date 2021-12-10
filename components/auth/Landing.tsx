import React from "react";
import { View, Text} from "react-native";
import { Boxr, Center, Button  } from "native-base";

interface Props {
  navigation?: any;
}

export default function Landing(props: Props) {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
        <Center >
      <Button mb={8}
        onPress={() => props.navigation.navigate("Register")}
      > Register </Button>
      <Button
        onPress={() => props.navigation.navigate("Login")}
      >LogIn</Button>
      </Center>
    </View>
  );
}
