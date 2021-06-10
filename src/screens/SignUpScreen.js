import React, { useContext, useState, useEffect } from "react";
import { BackHandler, Dimensions, Keyboard, Platform } from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";

import { FirebaseContext } from "../context/FirebaseContext";
import { UserContext } from "../context/UserContext";

import Text from "../components/Text";

export default SignUpScreen = ({ navigation }) => {
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [invalidSignUpMessage, setInvalidSignUpMessage] = useState();
    const [loading, setLoading] = useState(false);
    const [_, setUser] = useContext(UserContext);
    const firebase = useContext(FirebaseContext);

    const windowHeight = Dimensions.get("window").height;

    useEffect(() => {
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
        const backAction = () => {
            if (overlayVisible) {
                setOverlayVisible(false);
            } else {
                navigation.goBack();
            }
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
            backHandler.remove();
        };
    }, []);

    const signUp = async () => {
        setLoading(true);

        if (!username || username.length < 3 || username.length > 15) {
            setInvalidSignUpMessage("username must be 3-15 characters");
        } else if (!/^[0-9a-zA-Z_.-]+$/.test(username)) {
            setInvalidSignUpMessage(
                "username must contain only letters, numbers, and _/./-"
            );
        } else if (!(await firebase.usernameIsAvailable(username))) {
            setInvalidSignUpMessage("username is in use");
        } else if (
            !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                email
            )
        ) {
            setInvalidSignUpMessage("email must be valid");
        } else if (await firebase.emailIsInUse(email)) {
            setInvalidSignUpMessage("email is in use");
        } else if (!password || password.length < 8 || password.length > 20) {
            setInvalidSignUpMessage("password must be 8-20 characters");
        } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])./.test(password)) {
            setInvalidSignUpMessage(
                "password must contain lowercase, uppercase, and a digit"
            );
        } else {
            setInvalidSignUpMessage();

            const user = {
                username,
                email,
                password,
            };

            try {
                const createdUser = await firebase.createUser(user);

                setUser({ ...createdUser, isLoggedIn: null });
            } catch (error) {
                console.log("Error @signUp: ", error);
            }
        }

        setLoading(false);
    };

    return (
        <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
            <Container>
                <Main>
                    <Text title semi center>
                        new user?
                    </Text>
                </Main>

                <Auth
                    style={{
                        height: windowHeight / 3.33,
                        bottom:
                            keyboardVisible && !(Platform.OS === "ios")
                                ? "0%"
                                : "24%",
                    }}
                    behavior="position"
                    enabled={Platform.OS === "ios"}
                >
                    <AuthContainer>
                        <AuthField
                            autoCapitalize="none"
                            autoCompleteType="username"
                            autoCorrect={false}
                            fontSize={windowHeight / 28}
                            onChangeText={(username) => {
                                setUsername(username.trim());
                            }}
                            onSubmitEditing={() => signUp()}
                            placeholder="username"
                            style={{
                                borderBottomWidth: windowHeight / 700,
                                borderBottomColor: "#666666",
                            }}
                            value={username}
                        />
                    </AuthContainer>

                    <AuthContainer>
                        <AuthField
                            autoCapitalize="none"
                            autoCompleteType="email"
                            autoCorrect={false}
                            fontSize={windowHeight / 28}
                            keyboardType="email-address"
                            onChangeText={(email) => setEmail(email.trim())}
                            onSubmitEditing={() => signUp()}
                            placeholder="email"
                            style={{
                                borderBottomWidth: windowHeight / 700,
                                borderBottomColor: "#666666",
                            }}
                            value={email}
                        />
                    </AuthContainer>

                    <AuthContainer>
                        <AuthField
                            autoCapitalize="none"
                            autoCompleteType="password"
                            autoCorrect={false}
                            fontSize={windowHeight / 28}
                            onChangeText={(password) =>
                                setPassword(password.trim())
                            }
                            onSubmitEditing={() => signUp()}
                            placeholder="password"
                            secureTextEntry={true}
                            style={{
                                borderBottomWidth: windowHeight / 700,
                                borderBottomColor: "#666666",
                            }}
                            value={password}
                        />
                    </AuthContainer>
                </Auth>

                {!keyboardVisible || Platform.OS === "ios" ? (
                    <BottomContainer>
                        {invalidSignUpMessage ? (
                            <InvalidSignUpMessageContainer>
                                <Text tiny light color="#ff0000">
                                    {invalidSignUpMessage}
                                </Text>
                            </InvalidSignUpMessageContainer>
                        ) : null}

                        <ContinueContainer
                            style={{ borderRadius: windowHeight / 30 }}
                            onPress={signUp}
                            disabled={loading}
                        >
                            {loading ? (
                                <Loading color="#ffffff" />
                            ) : (
                                <Text bold large center color="#ffffff">
                                    sign up
                                </Text>
                            )}
                        </ContinueContainer>

                        <SignIn
                            onPress={() => navigation.navigate("SignIn")}
                            style={{ padding: windowHeight / 100 }}
                        >
                            <Text medium center>
                                have an account?
                            </Text>
                        </SignIn>
                    </BottomContainer>
                ) : null}
            </Container>
        </TouchableWithoutFeedback>
    );
};

const TouchableWithoutFeedback = styled.TouchableWithoutFeedback``;

const Container = styled.SafeAreaView`
    width: 100%;
    height: 100%;
    align-items: center;
`;

const Main = styled.SafeAreaView`
    position: absolute;
    margin-top: 25%;
`;

const Auth = styled.KeyboardAvoidingView`
    justify-content: center;
    width: 70%;
    position: absolute;
`;

const AuthContainer = styled.SafeAreaView`
    justify-content: center;
    height: 31.25%;
`;

const AuthField = styled.TextInput`
    height: 100%;
`;

const BottomContainer = styled.SafeAreaView`
    width: 100%;
    height: 25%;
    align-items: center;
    position: absolute;
    bottom: 0;
`;

const InvalidSignUpMessageContainer = styled.SafeAreaView`
    opacity: 0.75;
    position: absolute;
    bottom: 91%;
`;

const ContinueContainer = styled.TouchableOpacity`
    width: 75%
    height: 40%;
    align-items: center;
    justify-content: center;
    background-color: #1c4068;
    position: absolute;
    bottom: 44%;
`;

const Loading = styled.ActivityIndicator.attrs((props) => ({
    size: "large",
}))``;

const SignIn = styled.TouchableOpacity`
    position: absolute;
    bottom: 9.5%;
`;
