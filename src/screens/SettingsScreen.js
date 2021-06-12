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

    const windowHeight = Dimensions.get("window").height;

    const logOut = async () => {
        const loggedOut = await firebase.logOut();

        if (loggedOut) setUser((state) => ({ ...state, isLoggedIn: null }));
    };

    const changeSex = async (sex) => {
        if (sex === user.sex) return;

        const prevSex = user.sex;

        setUser((state) => ({ ...state, sex }));

        const updated = await firebase.updateData({ sex });

        if (!updated) setUser((state) => ({ ...state, sex: prevSex }));
    };

    const startDelete = async () => {
        Alert.alert(
            "Delete Account",
            "Are you sure you want to delete your account?",
            [
                {
                    text: "No",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    onPress: await deleteAccount(),
                    style: "destructive",
                },
            ]
        );
    };

    const deleteAccount = async () => {
        const deleted = await firebase.deleteAccount();

        if (deleted) setUser((state) => ({ ...state, isLoggedIn: null }));
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
                        size={windowHeight / 16}
                        color="#1c4068"
                    />
                </TO>

                <Text large bold>
                    Settings
                </Text>

                <TO onPress={logOut}>
                    <MaterialCommunityIcons
                        name="logout"
                        size={windowHeight / 16}
                        color="#1c4068"
                    />
                </TO>
            </TopBar>

            <Container2 contentContainerStyle={{ alignItems: "center" }}>
                <SectionTitle>
                    <Text color="#18d299">Preferred Clothing Type</Text>
                </SectionTitle>

                <Container3>
                    <TO
                        onPress={() => {
                            changeSex("m");
                        }}
                    >
                        <MaterialCommunityIcons
                            name="gender-male"
                            size={windowHeight / 10}
                            color={user.sex === "m" ? "#6ca0dc" : "#666666"}
                        />
                    </TO>
                    <TO
                        onPress={() => {
                            changeSex("b");
                        }}
                    >
                        <MaterialCommunityIcons
                            name="gender-male-female"
                            size={windowHeight / 10}
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
                            size={windowHeight / 10}
                            color={user.sex === "f" ? "#f8b9d4" : "#666666"}
                        />
                    </TO>
                </Container3>

                <SectionTitle>
                    <Text color="#18d299">Account</Text>
                </SectionTitle>

                <Container4>
                    <TO>
                        <Text
                            color="#ff0000"
                            style={{ textDecorationLine: "underline" }}
                            onPress={async () => await startDelete()}
                        >
                            Delete Account
                        </Text>
                    </TO>
                </Container4>

                <SectionTitle>
                    <Text color="#18d299">Credits</Text>
                </SectionTitle>

                <Container4>
                    <TO>
                        <Text
                            style={{ textDecorationLine: "underline" }}
                            onPress={() =>
                                Linking.openURL(
                                    "https://lottiefiles.com/user/37464"
                                )
                            }
                        >
                            Loading Animation
                        </Text>
                    </TO>

                    <TO>
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
    padding: 2% 0;
`;

const Container3 = styled.SafeAreaView`
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    width: 100%;
    margin: 5% 0;
`;

const Container4 = styled.SafeAreaView`
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 5% 0;
`;
