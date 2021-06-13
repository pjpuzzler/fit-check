import React from "react";
import { Dimensions } from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import MarketplaceScreen from "../screens/MarketplaceScreen";
import MainScreen from "../screens/MainScreen";
import ClosetScreen from "../screens/ClosetScreen";

export default MainStack = () => {
    const windowWidth = Dimensions.get("window").width;

    const Tab = createMaterialTopTabNavigator();

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
                case "Market":
                    iconName = "store";
                    break;

                case "Main":
                    iconName = "tshirt-crew";
                    break;

                case "Closet":
                    iconName = "wardrobe";
                    break;
            }

            return (
                <MaterialCommunityIcons
                    name={iconName}
                    size={windowWidth / 12}
                    color={focused ? "#18d299" : "#ffffff"}
                />
            );
        },
    });

    return (
        <Tab.Navigator
            initialRouteName="Main"
            tabBarOptions={tabBarOptions}
            tabBarPosition="bottom"
            screenOptions={screenOptions}
        >
            <Tab.Screen name="Marketplace" component={MarketplaceScreen} />
            <Tab.Screen name="Main" component={MainScreen} />
            <Tab.Screen name="Closet" component={ClosetScreen} />
        </Tab.Navigator>
    );
};
