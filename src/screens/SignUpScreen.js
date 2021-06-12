import React, { useContext, useState, useEffect } from "react";
import { Dimensions, Keyboard, Platform } from "react-native";
import styled from "styled-components";

import { FirebaseContext } from "../context/FirebaseContext";
import { UserContext } from "../context/UserContext";

import Text from "../components/Text";

export default SignUpScreen = ({ navigation }) => {
    const [_, setUser] = useContext(UserContext);
    const firebase = useContext(FirebaseContext);

    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [invalidSignUpMessage, setInvalidSignUpMessage] = useState("");
    const [loading, setLoading] = useState(false);

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

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    });

    const signUp = async () => {
        setInvalidSignUpMessage("");
        setLoading(true);

        let newInvalidSignUpMessage;
        const usernameIsAvailable = await firebase.usernameIsAvailable(
            username
        );

        if (usernameIsAvailable === null)
            newInvalidSignUpMessage = "An unknown error occured";
        else if (username.length < 3 || username.length > 15)
            newInvalidSignUpMessage = "Username must be 3-15 characters";
        else if (!/^[0-9a-zA-Z_.-]+$/.test(username))
            newInvalidSignUpMessage =
                "Username must contain only letters, numbers, and _/./-";
        else if (!usernameIsAvailable)
            newInvalidSignUpMessage = "Username is in use";
        else {
            const [success, res] = await firebase.createUser(
                username,
                email,
                password
            );

            if (success) {
                setUser({ isLoggedIn: null });
                return;
            } else if (res) newInvalidSignUpMessage = res.message;
            else newInvalidSignUpMessage = "An unknown error occurred";
        }

        setInvalidSignUpMessage(newInvalidSignUpMessage);
        setLoading(false);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                                color: "#1c4068",
                                borderBottomWidth: windowHeight / 700,
                                borderBottomColor: "#1c4068",
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
                                color: "#1c4068",
                                borderBottomWidth: windowHeight / 700,
                                borderBottomColor: "#1c4068",
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
                                color: "#1c4068",
                                borderBottomWidth: windowHeight / 700,
                                borderBottomColor: "#1c4068",
                            }}
                            value={password}
                        />
                    </AuthContainer>
                </Auth>

                {!keyboardVisible || Platform.OS === "ios" ? (
                    <BottomContainer>
                        {invalidSignUpMessage ? (
                            <InvalidSignUpMessageContainer>
                                <Text tiny light center color="#ff0000">
                                    {invalidSignUpMessage}
                                </Text>
                            </InvalidSignUpMessageContainer>
                        ) : null}

                        <SignUpContainer
                            style={{
                                borderRadius: windowHeight / 30,
                                opacity: loading ? 0.5 : null,
                            }}
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
                        </SignUpContainer>

                        <SignIn
                            onPress={() => navigation.navigate("SignIn")}
                            style={{ padding: windowHeight / 100 }}
                        >
                            <Text color="#1c4068">have an account?</Text>
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
    justify-content: center;
    opacity: 0.75;
    position: absolute;
    bottom: 85.5%;
    width: 95%;
    height: 20%;
`;

const SignUpContainer = styled.TouchableOpacity`
    width: 75%
    height: 40%;
    align-items: center;
    justify-content: center;
    background-color: #18d299;
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
