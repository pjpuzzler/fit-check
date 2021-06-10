import { StatusBar } from "expo-status-bar";
import React from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { UserProvider } from "./src/context/UserContext";
import { FirebaseProvider } from "./src/context/FirebaseContext";

import AppStack from "./src/stacks/AppStack";

export default function App() {
    LogBox.ignoreLogs(["Setting a timer"]);

    return (
        <FirebaseProvider>
            <UserProvider>
                <NavigationContainer>
                    <AppStack />
                </NavigationContainer>
                <StatusBar style="auto" />
            </UserProvider>
        </FirebaseProvider>
    );
}
