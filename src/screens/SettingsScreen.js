import React, { useContext } from "react";
import { Platform, StatusBar, Dimensions, Linking, Alert } from "react-native";
import styled from "styled-components";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import { UserContext } from "../context/UserContext";
import { FirebaseContext } from "../context/FirebaseContext";

import Text from "../components/Text";

export default SettingsScreen = ({ navigation }) => {
    const [user, setUser] = useContext(UserContext);
    const firebase = useContext(FirebaseContext);

    const windowWidth = Dimensions.get("window").width;

    const logOut = async () => {
        const loggedOut = await firebase.logOut();

        if (loggedOut) setUser({ isLoggedIn: null });
    };

    const changeSex = async (sex) => {
        if (sex === user.sex) return;

        setUser((state) => ({ ...state, sex }));

        const updated = await firebase.updateData({ sex });

        if (!updated) setUser({ isLoggedIn: null });
    };

    const startDelete = async () => {
        const res = await reseteAlert();

        if (res) await deleteAccount();
    };

    const deleteAlert = () => {
        return new Promise((resolve, _) => {
            Alert.alert(
                "Delete Account",
                "Are you sure you want to delete your account?",
                [
                    {
                        text: "NO",
                        onPress: () => resolve(false),
                        style: "cancel",
                    },
                    {
                        text: "DELETE",
                        onPress: () => resolve(true),
                        style: "destructive",
                    },
                ]
            );
        });
    };

    const deleteAccount = async () => {
        const deleted = await firebase.deleteAccount();

        if (deleted) setUser({ isLoggedIn: null });
    };

    return (
        <Container>
            <TopBar
                style={{
                    paddingTop:
                        Platform.OS === "android" ? StatusBar.currentHeight : 0,
                }}
            >
                <TO onPress={navigation.goBack}>
                    <MaterialCommunityIcons
                        name="arrow-left"
                        size={windowWidth / 8}
                        color="#1c4068"
                    />
                </TO>

                <Text large bold>
                    Settings
                </Text>

                <TO onPress={logOut}>
                    <MaterialCommunityIcons
                        name="logout"
                        size={windowWidth / 8}
                        color="#1c4068"
                    />
                </TO>
            </TopBar>

            <Container2 contentContainerStyle={{ alignItems: "center" }}>
                <SectionTitle>
                    <Text bold color="#18d299">
                        Preferred Clothing Type
                    </Text>
                </SectionTitle>

                <Container3>
                    <TO
                        onPress={() => {
                            changeSex("m");
                        }}
                    >
                        <MaterialCommunityIcons
                            name="gender-male"
                            size={windowWidth / 5}
                            color={user.sex === "m" ? "#5ca0dc" : "#666666"}
                        />
                    </TO>
                    <TO
                        onPress={() => {
                            changeSex("b");
                        }}
                    >
                        <MaterialCommunityIcons
                            name="gender-male-female"
                            size={windowWidth / 5}
                            color={user.sex === "b" ? "#b2acd8" : "#666666"}
                        />
                    </TO>
                    <TO
                        onPress={() => {
                            changeSex("f");
                        }}
                    >
                        <MaterialCommunityIcons
                            name="gender-female"
                            size={windowWidth / 5}
                            color={user.sex === "f" ? "#f8b9d4" : "#666666"}
                        />
                    </TO>
                </Container3>

                <SectionTitle>
                    <Text bold color="#18d299">
                        Account
                    </Text>
                </SectionTitle>

                <Container4>
                    <TO>
                        <Text
                            heavy
                            color="#ff0000"
                            style={{ textDecorationLine: "underline" }}
                            onPress={startDelete}
                        >
                            Delete Account
                        </Text>
                    </TO>
                </Container4>

                <SectionTitle>
                    <Text bold color="#18d299">
                        Credits
                    </Text>
                </SectionTitle>

                <Container4>
                    <TO>
                        <Text
                            bold
                            style={{ textDecorationLine: "underline" }}
                            onPress={() =>
                                Linking.openURL(
                                    "https://lottiefiles.com/user/37464"
                                )
                            }
                        >
                            Loading Animations
                        </Text>
                    </TO>

                    <TO>
                        <Text
                            bold
                            margin="2% 0 0 0"
                            style={{ textDecorationLine: "underline" }}
                            onPress={() =>
                                Linking.openURL(
                                    "https://www.youtube.com/c/DesignIntoCode"
                                )
                            }
                        >
                            Tutorials
                        </Text>
                    </TO>
                </Container4>
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
    align-items: center;
`;

const TO = styled.TouchableOpacity``;

const Container2 = styled.ScrollView`
    width: 100%;
    height: 100%;
`;

const SectionTitle = styled.SafeAreaView`
    width: 100%;
    background-color: #1c4068;
    align-items: center;
    justify-content: center;
    margin: 2% 0;
    padding: 2% 0;
`;

const Container3 = styled.SafeAreaView`
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    width: 100%;
`;

const Container4 = styled.SafeAreaView`
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 2% 0;
`;
