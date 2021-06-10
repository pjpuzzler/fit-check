import React from "react";
import { Platform, StatusBar, Dimensions } from "react-native";
import styled from "styled-components";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import OutfitsScreen from "../screens/OutfitsScreen";
import WardrobeScreen from "../screens/WardrobeScreen";

import Text from "../components/Text";

export default ClosetStack = ({ navigation }) => {
    const windowHeight = Dimensions.get("window").height;

    const ClosetNav = createMaterialTopTabNavigator();

    const tabBarOptions = {
        indicatorStyle: {
            opacity: 0,
        },
        iconStyle: {
            height: "100%",
            width: "100%",
            marginTop:
                Platform.OS === "android"
                    ? StatusBar.currentHeight + windowHeight * 0.03
                    : windowHeight * 0.03,
        },
        pressColor: "#18d299",
        showLabel: false,
        style: {
            backgroundColor: "#1c4068",
            height:
                Platform.OS === "android"
                    ? StatusBar.currentHeight + windowHeight * 0.08
                    : windowHeight * 0.08,
        },
        showIcon: true,
    };

    const screenOptions = ({ route }) => ({
        tabBarIcon: ({ focused }) => {
            return (
                <Text color={focused ? "#18d299" : "#ffffff"}>
                    {route.name}
                </Text>
            );
        },
    });

    return (
        <ClosetNav.Navigator
            tabBarOptions={tabBarOptions}
            screenOptions={screenOptions}
            swipeEnabled={false}
        >
            <ClosetNav.Screen name="Outfits" component={OutfitsScreen} />
            <ClosetNav.Screen name="Wardrobe" component={WardrobeScreen} />
        </ClosetNav.Navigator>
    );
};

const Container = styled.SafeAreaView`
    align-items: center;
    width: 100%;
    height: 100%;
`;

const TopBar = styled.SafeAreaView`
    width: 100%;
    height: 10%;
    align-items: center;
`;

const TopBarCircle = styled.SafeAreaView`
    background-color: #ffffff;
    align-items: center;
    justify-content: center;
`;
