import React, { useState } from "react";
import { Platform, StatusBar, Dimensions } from "react-native";
import styled from "styled-components";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { UserContext } from "../context/UserContext";
import { FirebaseContext } from "../context/FirebaseContext";

import Text from "../components/Text";

export default WardrobeScreen = ({ navigation }) => {
    const [showOutfits, setShowOutfits] = useState(true);

    const windowHeight = Dimensions.get("window").height;

    const MainStack = createMaterialTopTabNavigator();

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
            return <Text color={focused ? "1c4068" : null}>{route.name}</Text>;
        },
    });

    return (
        <MainStack.Navigator
            tabBarOptions={tabBarOptions}
            screenOptions={screenOptions}
        >
            <MainStack.Screen name="Outfits" component={OutfitsScreen} />
            <MainStack.Screen name="Wardrobe" component={WardrobeScreen} />
        </MainStack.Navigator>
    );

    return (
        <Container>
            <TopBar
                style={{
                    paddingTop:
                        Platform.OS === "android"
                            ? StatusBar.currentHeight + windowHeight / 50
                            : windowHeight / 50,
                }}
            >
                <TopBarCircle
                    style={{
                        width: windowWidth / 1.5,
                        height: windowWidth / 6,
                        borderRadius: windowWidth,
                    }}
                >
                    <Text large bold>
                        {showOutfits ? "outfits" : "wardrobe"}
                    </Text>
                </TopBarCircle>
            </TopBar>
        </Container>
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
