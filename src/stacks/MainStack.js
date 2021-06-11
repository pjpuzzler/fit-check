import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import UserStack from "./UserStack";
import SettingsScreen from "../screens/SettingsScreen";

export default MainStack = () => {
    const UserNav = createStackNavigator();

    return (
        <UserNav.Navigator headerMode={false}>
            <UserNav.Screen name="User" component={UserStack} />
            <UserNav.Screen name="Settings" component={SettingsScreen} />
        </UserNav.Navigator>
    );
};
