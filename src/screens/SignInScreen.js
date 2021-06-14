import React, { useContext, useState, useEffect } from "react";
import { Dimensions, Keyboard, Platform } from "react-native";
import styled from "styled-components";
import LottieView from "lottie-react-native";

import { UserContext } from "../context/UserContext";
import { FirebaseContext } from "../context/FirebaseContext";

import Text from "../components/Text";

export default SignInScreen = ({ navigation }) => {
    const [_, setUser] = useContext(UserContext);
    const firebase = useContext(FirebaseContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [invalidSignInMessage, setInvalidSignInMessage] = useState("");
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    const windowHeight = Dimensions.get("window").height;
    const windowWidth = Dimensions.get("window").width;

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

    const signIn = async () => {
        setLoading(true);

        let newInvalidSignInMessage;

        if (!email || !password)
            newInvalidSignInMessage = "One or more fields are empty";
        else {
            const [success, error] = await firebase.signIn(email, password);

            if (success) {
                setUser({ isLoggedIn: null });
                return;
            } else if (error) newInvalidSignInMessage = error.message;
            else newInvalidSignInMessage = "An unknown error occurred";
        }

        setInvalidSignInMessage(newInvalidSignInMessage);
        setLoading(false);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Main>
                    <Text title semi center>
                        returning user?
                    </Text>
                </Main>
                <Auth
                    style={{
                        height: windowHeight / 5,
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
                            autoCompleteType="email"
                            autoCorrect={false}
                            fontSize={windowWidth / 16}
                            keyboardType="email-address"
                            onChangeText={(email) => setEmail(email.trim())}
                            onSubmitEditing={() => signIn()}
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
                            fontSize={windowWidth / 16}
                            onChangeText={(password) =>
                                setPassword(password.trim())
                            }
                            onSubmitEditing={() => signIn()}
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
                        {invalidSignInMessage ? (
                            <InvalidSignInMessageContainer>
                                <Text tiny light center color="#ff0000">
                                    {invalidSignInMessage}
                                </Text>
                            </InvalidSignInMessageContainer>
                        ) : null}
                        <SignInContainer
                            style={{
                                borderRadius: windowWidth / 20,
                                opacity: loading ? 0.5 : null,
                            }}
                            onPress={signIn}
                            disabled={loading}
                        >
                            {loading ? (
                                <LottieView
                                    source={require("../../assets/loadingAnimation2White.json")}
                                    autoPlay
                                    loop
                                />
                            ) : (
                                <Text bold large center color="#ffffff">
                                    sign in
                                </Text>
                            )}
                        </SignInContainer>
                        <SignUp onPress={() => navigation.navigate("SignUp")}>
                            <Text color="#1c4068">need an account?</Text>
                        </SignUp>
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

const InvalidSignInMessageContainer = styled.SafeAreaView`
    justify-content: center;
    opacity: 0.75;
    position: absolute;
    bottom: 80.1%;
    width: 95%;
    height: 27%;
`;

const SignInContainer = styled.TouchableOpacity`
    width: 75%
    height: 40%;
    align-items: center;
    justify-content: center;
    background-color: #18d299;
    position: absolute;
    bottom: 40%;
`;

const SignUp = styled.TouchableOpacity`
    position: absolute;
    bottom: 10%;
`;
