import React from "react";
import { Dimensions } from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import ClosetStack from "./ClosetStack";
import MainScreen from "../screens/MainScreen";
import UserScreen from "../screens/UserScreen";

export default MainStack = () => {
    const windowHeight = Dimensions.get("window").height;

    const MainNav = createMaterialTopTabNavigator();

    const tabBarOptions = {
        indicatorStyle: {
            height: "8%",
            backgroundColor: "#18d299",
        },
        iconStyle: {
            height: "100%",
            width: "100%",
        },
        pressColor: "#18d299",
        showLabel: false,
        style: {
            backgroundColor: "#1c4068",
            height: "8%",
            justifyContent: "center",
        },
        showIcon: true,
    };

    const screenOptions = ({ route }) => ({
        tabBarIcon: ({ focused }) => {
            let iconName;

            switch (route.name) {
                case "Closet":
                    iconName = "wardrobe";
                    break;

                case "Main":
                    iconName = "tshirt-crew";
                    break;

                case "User":
                    iconName = "account-settings";
                    break;
            }

            return (
                <MaterialCommunityIcons
                    name={iconName}
                    size={windowHeight / 24}
                    color={focused ? "#18d299" : "#ffffff"}
                />
            );
        },
    });

    return (
        <MainNav.Navigator
            initialRouteName="Main"
            tabBarOptions={tabBarOptions}
            tabBarPosition="bottom"
            screenOptions={screenOptions}
        >
            <MainNav.Screen name="Closet" component={ClosetStack} />
            <MainNav.Screen name="Main" component={MainScreen} />
            <MainNav.Screen name="User" component={UserScreen} />
        </MainNav.Navigator>
    );
};
