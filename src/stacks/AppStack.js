import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { UserContext } from "../context/UserContext";

import LoadingScreen from "../screens/LoadingScreen";
import SelectProfilePhotoScreen from "../screens/SelectProfilePhotoScreen";
import HiddenStack from "./HiddenStack";
import AuthStack from "./AuthStack";

export default AppStack = () => {
    const [user] = useContext(UserContext);

    const AppStack = createStackNavigator();

    return (
        <AppStack.Navigator headerMode="none">
            {user.isLoggedIn === null ? (
                <AppStack.Screen name="Loading" component={LoadingScreen} />
            ) : user.isLoggedIn ? (
                !user.profilePhotoUrl ? (
                    <AppStack.Screen
                        name="SelectProfilePhoto"
                        component={SelectProfilePhotoScreen}
                    />
                ) : (
                    <AppStack.Screen name="Hidden" component={HiddenStack} />
                )
            ) : (
                <AppStack.Screen name="Auth" component={AuthStack} />
            )}
        </AppStack.Navigator>
    );
};
