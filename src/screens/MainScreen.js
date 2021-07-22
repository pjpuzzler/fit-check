import React, { useContext, useState, useEffect } from "react";
import { Platform, StatusBar, Dimensions, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import styled from "styled-components";
import { MaterialCommunityIcons, FontAwesome } from "react-native-vector-icons";

import { UserContext } from "../context/UserContext";
import { FirebaseContext } from "../context/FirebaseContext";

import Text from "../components/Text";

export default MainScreen = ({ route, navigation }) => {
    const [user, setUser] = useContext(UserContext);
    const firebase = useContext(FirebaseContext);

    const [currentPalette, setCurrentPalette] = useState([]);

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

        setCurrentPalette([]);
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
            // TODO
        } else setUser((state) => ({ ...state, isLoggedIn: null }));
    };

    const renderPalette = ({ item }) => {
        return (
            <PaletteContainer>
                {item.type === "add" ? (
                    <MaterialCommunityIcons
                        name="plus"
                        size={windowWidth / 2}
                        color="#1c4068"
                    />
                ) : null}
            </PaletteContainer>
        );
    };

    return (
        <Container>
            <TopBar
                style={{
                    paddingTop:
                        Platform.OS === "android" ? StatusBar.currentHeight : 0,
                }}
            >
                <TO onPress={clear} disabled={!currentPalette.length}>
                    <MaterialCommunityIcons
                        name="trash-can"
                        size={windowWidth / 8}
                        style={{
                            opacity: !currentPalette.length ? 0.5 : 1,
                        }}
                        color="#ff0000"
                    />
                </TO>

                <Text large bold>
                    Create Palette
                </Text>

                <TO disabled={!currentPalette.length}>
                    <FontAwesome
                        name="magic"
                        size={windowWidth / 8}
                        style={{
                            opacity: !currentPalette.length ? 0.5 : 1,
                        }}
                        color="#18d299"
                    />
                </TO>
            </TopBar>

            <Palette
                data={
                    currentPalette + currentPalette.length < 6
                        ? [{ type: "add" }]
                        : []
                }
                keyExtractor={(item) => item.type}
                renderItem={renderPalette}
            />
        </Container>
    );
};

const Container = styled.SafeAreaView`
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
`;

const TopBar = styled.SafeAreaView`
    width: 95%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const TO = styled.TouchableOpacity``;

const Palette = styled.FlatList`
    width: 100%;
    height: 80%;
    background-color: green;
    flex-grow: 0;
`;

const PaletteContainer = styled.SafeAreaView``;
