import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { UserContext } from "../context/UserContext";

import LoadingScreen from "../screens/LoadingScreen";
import MainStack from "./MainStack";
import SelectSexScreen from "../screens/SelectSexScreen";
import AuthStack from "./AuthStack";

export default AppStack = () => {
    const [user] = useContext(UserContext);

    const AppStack = createStackNavigator();

    return (
        <AppStack.Navigator headerMode="none">
            {user.isLoggedIn === null ? (
                <AppStack.Screen name="Loading" component={LoadingScreen} />
            ) : user.isLoggedIn ? (
                user.sex ? (
                    <AppStack.Screen name="Main" component={MainStack} />
                ) : (
                    <AppStack.Screen
                        name="SelectSex"
                        component={SelectSexScreen}
                    />
                )
            ) : (
                <AppStack.Screen name="Auth" component={AuthStack} />
            )}
        </AppStack.Navigator>
    );
};
