import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { UserProvider } from "./src/context/UserContext";
import { FirebaseProvider } from "./src/context/FirebaseContext";

import AppStackScreens from "./src/stacks/AppStackScreens";

export default function App() {
    return (
        <FirebaseProvider>
            <UserProvider>
                <NavigationContainer>
                    <AppStackScreens />
                </NavigationContainer>
                <StatusBar style="auto" />
            </UserProvider>
        </FirebaseProvider>
    );
}
