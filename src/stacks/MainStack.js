import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ClosetStack from "./ClosetStack";
import SettingsScreen from "../screens/SettingsScreen";

export default MainStack = () => {
    const Nav = createStackNavigator();

    return (
        <Nav.Navigator headerMode={false}>
            <Nav.Screen name="Closet" component={ClosetStack} />
            <Nav.Screen name="Settings" component={SettingsScreen} />
        </Nav.Navigator>
    );
};
