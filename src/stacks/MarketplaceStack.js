import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MainStack from "./MainStack";
import SearchScreen from "../screens/SearchScreen";

export default MarketplaceStack = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator headerMode={false}>
            <Stack.Screen name="Main" component={MainStack} />
            <Stack.Screen name="Search" component={SearchScreen} />
        </Stack.Navigator>
    );
};
