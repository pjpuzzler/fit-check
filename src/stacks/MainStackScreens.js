import React from "react";
import { Dimensions } from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import ClosetScreen from "../screens/ClosetScreen";
import MainScreen from "../screens/MainScreen";
import UserScreen from "../screens/UserScreen";

export default MainStackScreens = () => {
    const windowHeight = Dimensions.get("window").height;

    const MainStack = createMaterialTopTabNavigator();

    const tabBarOptions = {
        indicatorStyle: {
            backgroundColor: "#1c4068",
            height: "8%",
        },
        showLabel: false,
        style: {
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
                    size={windowHeight / 20}
                    color={focused ? "#1c4068" : "#666666"}
                    style={{
                        height: windowHeight / 20,
                        width: windowHeight / 20,
                        marginTop: -windowHeight / 70,
                    }}
                />
            );
        },
    });

    return (
        <MainStack.Navigator
            tabBarOptions={tabBarOptions}
            tabBarPosition="bottom"
            screenOptions={screenOptions}
        >
            <MainStack.Screen name="Closet" component={ClosetScreen} />
            <MainStack.Screen name="Main" component={MainScreen} />
            <MainStack.Screen name="User" component={UserScreen} />
        </MainStack.Navigator>
    );
};
