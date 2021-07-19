import React, { useContext, useState, useEffect } from "react";
import { Platform, StatusBar, Dimensions, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import styled from "styled-components";
import {
    MaterialCommunityIcons,
    FontAwesome5,
} from "react-native-vector-icons";

import { UserContext } from "../context/UserContext";
import { FirebaseContext } from "../context/FirebaseContext";

import Text from "../components/Text";

export default MainScreen = ({ route, navigation }) => {
    const [user, setUser] = useContext(UserContext);
    const firebase = useContext(FirebaseContext);

    const [currentPalette, setCurrentPalette] = useState({});

    const windowWidth = Dimensions.get("window").width;

    const alert = (title, msg) => {
        return new Promise((resolve, _) => {
            Alert.alert(title, msg, [
                {
                    text: "NO",
                    onPress: () => resolve(false),
                    style: "cancel",
                },
                {
                    text: "YES",
                    onPress: () => resolve(true),
                },
            ]);
        });
    };

    const clear = async () => {
        const res = await alert(
            "Clear Palette",
            "Are you sure you want to clear this palette?"
        );

        if (!res) return;

        setCurrentPalette({});
    };

    const save = async () => {
        const palettes = await firebase.savePalette(user.uid, currentPalette);

        if (palettes)
            setUser((state) => ({
                ...state,
                palettes,
            }));
        else setUser((state) => ({ ...state, isLoggedIn: null }));
    };

    const share = async () => {
        const success = await firebase.sharePalette(user.uid, currentPalette);

        if (success) {
        } else setUser((state) => ({ ...state, isLoggedIn: null }));
    };

    return <Container></Container>;
};

const Container = styled.SafeAreaView`
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
`;
