import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MainStack from "./MainStack";
import SearchScreen from "../screens/SearchScreen";
import ClothingScreen from "../screens/ClothingScreen";
import SettingsScreen from "../screens/SettingsScreen";
import PremiumScreen from "../screens/PremiumScreen";
import FollowingScreen from "../screens/FollowingScreen";

export default HiddenStack = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator headerMode={false}>
            <Stack.Screen name="Main" component={MainStack} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="Clothing" component={ClothingScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Premium" component={PremiumScreen} />
            <Stack.Screen name="Following" component={FollowingScreen} />
        </Stack.Navigator>
    );
};
