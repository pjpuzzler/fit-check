import React, { useContext, useState } from "react";
import { Platform, StatusBar, Dimensions, Linking } from "react-native";
import styled from "styled-components";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import { UserContext } from "../context/UserContext";
import { FirebaseContext } from "../context/FirebaseContext";

import Text from "../components/Text";

export default SettingsScreen = ({ navigation }) => {
    const [user, setUser] = useContext(UserContext);
    const firebase = useContext(FirebaseContext);

    const windowHeight = Dimensions.get("window").height;

    const logOut = async () => {
        const loggedOut = await firebase.logOut();

        if (loggedOut) setUser((state) => ({ ...state, isLoggedIn: false }));
    };

    const changeSex = async (sex) => {
        if (sex === user.sex) return;

        setUser((state) => ({ ...state, sex }));

        await firebase.updateData({ sex });
    };

    return (
        <Container>
            <TopBar
                style={{
                    paddingTop:
                        Platform.OS === "android" ? StatusBar.currentHeight : 0,
                }}
            >
                <IconContainer onPress={navigation.goBack}>
                    <MaterialCommunityIcons
                        name="arrow-left"
                        size={windowHeight / 16}
                        color="#1c4068"
                    />
                </IconContainer>

                <Text large bold>
                    Settings
                </Text>

                <IconContainer onPress={logOut}>
                    <MaterialCommunityIcons
                        name="logout"
                        size={windowHeight / 16}
                        color="#1c4068"
                    />
                </IconContainer>
            </TopBar>

            <Container2 contentContainerStyle={{ alignItems: "center" }}>
                <SectionTitle>
                    <Text color="#18d299">Preferred Clothing Type</Text>
                </SectionTitle>

                <Container3>
                    <IconContainer
                        onPress={() => {
                            changeSex("m");
                        }}
                    >
                        <MaterialCommunityIcons
                            name="gender-male"
                            size={windowHeight / 10}
                            color={user.sex === "m" ? "#18d299" : "#666666"}
                        />
                    </IconContainer>
                    <IconContainer
                        onPress={() => {
                            changeSex("b");
                        }}
                    >
                        <MaterialCommunityIcons
                            name="gender-male-female"
                            size={windowHeight / 10}
                            color={user.sex === "b" ? "#18d299" : "#666666"}
                        />
                    </IconContainer>
                    <IconContainer
                        onPress={() => {
                            changeSex("f");
                        }}
                    >
                        <MaterialCommunityIcons
                            name="gender-female"
                            size={windowHeight / 10}
                            color={user.sex === "f" ? "#18d299" : "#666666"}
                        />
                    </IconContainer>
                </Container3>

                <SectionTitle>
                    <Text color="#18d299">Credits</Text>
                </SectionTitle>

                <Text
                    margin="5% 0 0 0"
                    style={{ textDecorationLine: "underline" }}
                    onPress={() =>
                        Linking.openURL("https://lottiefiles.com/user/37464")
                    }
                >
                    Loading Animation
                </Text>

                <Text
                    margin="5% 0 0 0"
                    style={{ textDecorationLine: "underline" }}
                    onPress={() =>
                        Linking.openURL(
                            "https://www.youtube.com/c/DesignIntoCode"
                        )
                    }
                >
                    Tutorials
                </Text>
            </Container2>
        </Container>
    );
};

const Container = styled.SafeAreaView`
    align-items: center;
    width: 100%;
    height: 100%;
`;

const TopBar = styled.SafeAreaView`
    width: 95%;
    flex-direction: row;
    justify-content: space-between;
`;

const IconContainer = styled.TouchableOpacity``;

const Container2 = styled.ScrollView`
    width: 100%;
    height: 100%;
`;

const SectionTitle = styled.SafeAreaView`
    width: 100%;
    background-color: #1c4068;
    align-items: center;
    justify-content: center;
    padding: 2% 0;
`;

const Container3 = styled.SafeAreaView`
    justify-content: space-around;
    flex-direction: row;
    width: 100%;
    margin: 5% 0;
`;
