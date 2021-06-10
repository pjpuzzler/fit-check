import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { UserContext } from "../context/UserContext";

import AuthStack from "./AuthStack";
import MainStack from "./MainStack";
import LoadingScreen from "../screens/LoadingScreen";

export default AppStack = () => {
    const AppStack = createStackNavigator();
    const [user] = useContext(UserContext);

    return (
        <AppStack.Navigator headerMode="none">
            {user.isLoggedIn === null ? (
                <AppStack.Screen name="Loading" component={LoadingScreen} />
            ) : user.isLoggedIn ? (
                <AppStack.Screen name="Main" component={MainStack} />
            ) : (
                <AppStack.Screen name="Auth" component={AuthStack} />
            )}
        </AppStack.Navigator>
    );
};
