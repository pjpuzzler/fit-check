import React, { useContext, useState, useEffect } from "react";
import {
    Platform,
    StatusBar,
    Dimensions,
    Linking,
    Alert,
    Keyboard,
    BackHandler,
} from "react-native";
import styled from "styled-components";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import LottieView from "lottie-react-native";

import { UserContext } from "../context/UserContext";
import { FirebaseContext } from "../context/FirebaseContext";

import Text from "../components/Text";

export default SettingsScreen = ({ navigation }) => {
    const [user, setUser] = useContext(UserContext);
    const firebase = useContext(FirebaseContext);

    const [authenticationOverlay, setAuthenticationOverlay] = useState(false);
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [authenticationEmail, setAuthenticationEmail] = useState("");
    const [authenticationPassword, setAuthenticationPassword] = useState("");
    const [invalidAuthenticationMessage, setInvalidAuthenticationMessage] =
        useState("");
    const [authenticationLoading, setAuthenticationLoading] = useState(false);

    const windowHeight = Dimensions.get("window").height;
    const windowWidth = Dimensions.get("window").width;

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => {
                if (authenticationOverlay) return true;
            }
        );

        const keyboardDidShowListener = Keyboard.addListener(
            "keyboardDidShow",
            () => {
                setKeyboardVisible(true);
            }
        );

        const keyboardDidHideListener = Keyboard.addListener(
            "keyboardDidHide",
            () => {
                setKeyboardVisible(false);
            }
        );

        return () => {
            backHandler.remove();

            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    });

    const logOut = async () => {
        const res = await logOutAlert();

        if (res) {
            const loggedOut = await firebase.logOut();

            if (loggedOut) setUser((state) => ({ ...state, isLoggedIn: null }));
        }
    };

    const logOutAlert = () => {
        return new Promise((resolve, _) => {
            Alert.alert(
                "Log Out",
                "Are you sure you want to log out?",
                [
                    {
                        text: "NO",
                        onPress: () => resolve(false),
                        style: "cancel",
                    },
                    {
                        text: "YES",
                        onPress: () => resolve(true),
                    },
                ],
                { cancelable: true }
            );
        });
    };

    const changeSex = async (sex) => {
        if (sex === user.sex) return;

        setUser((state) => ({ ...state, sex }));

        const updated = await firebase.updateData(user.uid, { sex });

        if (!updated) setUser((state) => ({ ...state, isLoggedIn: null }));
    };

    const authenticate = async () => {
        setAuthenticationLoading(true);

        let newInvalidAuthenticationMessage;

        if (!authenticationEmail || !authenticationPassword)
            newInvalidAuthenticationMessage = "One or more fields are empty";
        else {
            const [success, error] = await firebase.reauthenticate(
                authenticationEmail,
                authenticationPassword
            );

            if (success) {
                await startDelete();
                return;
            } else if (error) newInvalidAuthenticationMessage = error.message;
            else newInvalidAuthenticationMessage = "An unknown error occurred";
        }

        setInvalidAuthenticationMessage(newInvalidAuthenticationMessage);
        setAuthenticationLoading(false);
    };

    const startDelete = async () => {
        const res = await deleteAlert();

        if (res) await deleteAccount();
        else setAuthenticationLoading(false);
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
        await firebase.deleteAccount();

        setUser((state) => ({ ...state, isLoggedIn: null }));
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
                            changeSex("male");
                        }}
                    >
                        <MaterialCommunityIcons
                            name="gender-male"
                            size={windowWidth / 5}
                            color={user.sex === "male" ? "#5ca0dc" : "#666666"}
                        />
                    </TO>
                    <TO
                        onPress={() => {
                            changeSex("inter");
                        }}
                    >
                        <MaterialCommunityIcons
                            name="gender-male-female"
                            size={windowWidth / 5}
                            color={user.sex === "inter" ? "#b2acd8" : "#666666"}
                        />
                    </TO>
                    <TO
                        onPress={() => {
                            changeSex("female");
                        }}
                    >
                        <MaterialCommunityIcons
                            name="gender-female"
                            size={windowWidth / 5}
                            color={
                                user.sex === "female" ? "#f8b9d4" : "#666666"
                            }
                        />
                    </TO>
                </Container3>

                <SectionTitle>
                    <Text bold color="#18d299">
                        Credits
                    </Text>
                </SectionTitle>

                <Container4>
                    <TO
                        onPress={() =>
                            Linking.openURL(
                                "https://lottiefiles.com/user/37464"
                            )
                        }
                    >
                        <Text bold style={{ textDecorationLine: "underline" }}>
                            Loading Animations
                        </Text>
                    </TO>

                    <TO
                        onPress={() =>
                            Linking.openURL(
                                "https://www.youtube.com/c/DesignIntoCode"
                            )
                        }
                    >
                        <Text
                            bold
                            margin="2% 0 0 0"
                            style={{ textDecorationLine: "underline" }}
                        >
                            Tutorials
                        </Text>
                    </TO>
                </Container4>

                <SectionTitle>
                    <Text bold color="#18d299">
                        Support
                    </Text>
                </SectionTitle>

                <Container4>
                    <Text small center>
                        Question, concern, or suggestion?
                    </Text>

                    <TO
                        onPress={() =>
                            Linking.openURL(
                                "mailto:contact.teamfitcheck@gmail.com"
                            )
                        }
                    >
                        <Text
                            small
                            heavy
                            margin="2% 0 0 0"
                            style={{ textDecorationLine: "underline" }}
                        >
                            contact.teamfitcheck@gmail.com
                        </Text>
                    </TO>
                </Container4>

                <SectionTitle>
                    <Text bold color="#18d299">
                        Deactivation
                    </Text>
                </SectionTitle>

                <Container4>
                    <TO onPress={() => setAuthenticationOverlay(true)}>
                        <Text heavy color="#ff0000">
                            Delete Account
                        </Text>
                    </TO>
                </Container4>
            </Container2>

            {authenticationOverlay ? (
                <Container
                    style={{ position: "absolute", justifyContent: "center" }}
                >
                    <TWF onPress={Keyboard.dismiss}>
                        <AuthenticationOverlayBackground />
                    </TWF>
                    <AuthenticationOverlay
                        style={{ borderRadius: windowWidth / 20 }}
                    >
                        {!keyboardVisible ? (
                            <TopBar>
                                <TO
                                    onPress={() =>
                                        setAuthenticationOverlay(false)
                                    }
                                >
                                    <MaterialCommunityIcons
                                        name="close"
                                        size={windowWidth / 8}
                                        color="#1c4068"
                                    />
                                </TO>

                                <Text color="#1c4068">Delete Account</Text>

                                <MaterialCommunityIcons
                                    name="close"
                                    size={windowWidth / 8}
                                    style={{ opacity: 0 }}
                                />
                            </TopBar>
                        ) : null}

                        <Auth
                            style={{
                                height: (windowHeight * 3) / 20,
                                bottom:
                                    keyboardVisible && !(Platform.OS === "ios")
                                        ? "0%"
                                        : "37%",
                            }}
                            behavior="position"
                            enabled={Platform.OS === "ios"}
                        >
                            <AuthContainer>
                                <AuthField
                                    autoCapitalize="none"
                                    autoCompleteType="email"
                                    autoCorrect={false}
                                    editable={!authenticationLoading}
                                    fontSize={windowWidth / 20}
                                    keyboardType="email-address"
                                    onChangeText={(email) =>
                                        setAuthenticationEmail(email.trim())
                                    }
                                    onSubmitEditing={authenticate}
                                    placeholder="email"
                                    style={{
                                        color: "#1c4068",
                                        borderBottomWidth: windowHeight / 700,
                                        borderBottomColor: "#1c4068",
                                    }}
                                    value={authenticationEmail}
                                />
                            </AuthContainer>
                            <AuthContainer>
                                <AuthField
                                    autoCapitalize="none"
                                    autoCompleteType="password"
                                    autoCorrect={false}
                                    editable={!authenticationLoading}
                                    fontSize={windowWidth / 20}
                                    onChangeText={(password) =>
                                        setAuthenticationPassword(
                                            password.trim()
                                        )
                                    }
                                    onSubmitEditing={authenticate}
                                    placeholder="password"
                                    secureTextEntry={true}
                                    style={{
                                        color: "#1c4068",
                                        borderBottomWidth: windowHeight / 700,
                                        borderBottomColor: "#1c4068",
                                    }}
                                    value={authenticationPassword}
                                />
                            </AuthContainer>
                        </Auth>
                        {!keyboardVisible || Platform.OS === "ios" ? (
                            <BottomContainer>
                                {invalidAuthenticationMessage ? (
                                    <InvalidAuthenticationMessageContainer>
                                        <Text
                                            micro
                                            light
                                            center
                                            color="#ff0000"
                                        >
                                            {invalidAuthenticationMessage}
                                        </Text>
                                    </InvalidAuthenticationMessageContainer>
                                ) : null}
                                <AuthenticateContainer
                                    style={{
                                        borderRadius: windowWidth / 20,
                                        opacity: authenticationLoading
                                            ? 0.5
                                            : null,
                                    }}
                                    onPress={authenticate}
                                    disabled={authenticationLoading}
                                >
                                    {authenticationLoading ? (
                                        <LottieView
                                            source={require("../../assets/loadingAnimation2White.json")}
                                            autoPlay
                                            loop
                                        />
                                    ) : (
                                        <Text bold center color="#ffffff">
                                            Delete
                                        </Text>
                                    )}
                                </AuthenticateContainer>
                            </BottomContainer>
                        ) : null}
                    </AuthenticationOverlay>
                </Container>
            ) : null}
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

const TWF = styled.TouchableWithoutFeedback``;

const AuthenticationOverlayBackground = styled.SafeAreaView`
    position: absolute;
    background-color: #00000040;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
`;

const AuthenticationOverlay = styled.SafeAreaView`
    background-color: #ffffff;
    width: 75%;
    height: 33.33%;
    align-items: center;
`;

const Auth = styled.KeyboardAvoidingView`
    justify-content: center;
    width: 70%;
    position: absolute;
`;

const AuthContainer = styled.SafeAreaView`
    justify-content: center;
    height: 50%;
`;

const AuthField = styled.TextInput``;

const BottomContainer = styled.SafeAreaView`
    width: 100%;
    height: 25%;
    align-items: center;
    position: absolute;
    bottom: 0;
`;

const InvalidAuthenticationMessageContainer = styled.SafeAreaView`
    justify-content: center;
    opacity: 0.75;
    position: absolute;
    bottom: 100%;
    width: 95%;
    height: 66%;
`;

const AuthenticateContainer = styled.TouchableOpacity`
    width: 75%
    height: 60%;
    align-items: center;
    justify-content: center;
    background-color: #ff0000;
    position: absolute;
    bottom: 40%;
`;
