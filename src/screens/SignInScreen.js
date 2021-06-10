import React, { useContext, useState, useEffect } from "react";
import { Dimensions, Keyboard, Platform } from "react-native";
import styled from "styled-components";

import { UserContext } from "../context/UserContext";
import { FirebaseContext } from "../context/FirebaseContext";

import Text from "../components/Text";

export default SignInScreen = ({ navigation }) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const [invalidSignInMessage, setInvalidSignInMessage] = useState();
    const [keyboardVisible, setKeyboardVisible] = useState(false);
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

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const signIn = async () => {
        setLoading(true);

        let signedIn = false;

        try {
            signedIn = await firebase.signIn(email, password);
        } catch (error) {
            console.log("Error @signIn: ", error.message);
        } finally {
            if (signedIn) {
                setUser({
                    isLoggedIn: null,
                });
            } else {
                setInvalidSignInMessage("invalid email and/or password");
            }
            setLoading(false);
        }
    };

    return (
        <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
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
                            fontSize={windowHeight / 28}
                            keyboardType="email-address"
                            onChangeText={(email) => setEmail(email.trim())}
                            onSubmitEditing={() => signIn()}
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
                            onSubmitEditing={() => signIn()}
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
                        {invalidSignInMessage ? (
                            <InvalidSignInContainer>
                                <Text tiny light color="#ff0000">
                                    {invalidSignInMessage}
                                </Text>
                            </InvalidSignInContainer>
                        ) : null}
                        <SignInContainer
                            style={{ borderRadius: windowHeight / 30 }}
                            onPress={signIn}
                            disabled={loading}
                        >
                            {loading ? (
                                <Loading color="#ffffff" />
                            ) : (
                                <Text bold large center color="#ffffff">
                                    sign in
                                </Text>
                            )}
                        </SignInContainer>
                        <SignUp
                            onPress={() => navigation.navigate("SignUp")}
                            style={{ padding: windowHeight / 100 }}
                        >
                            <Text medium center>
                                need an account?
                            </Text>
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
    height: 45%;
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

const InvalidSignInContainer = styled.SafeAreaView`
    opacity: 0.75;
    position: absolute;
    bottom: 91%;
`;

const SignInContainer = styled.TouchableOpacity`
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

const SignUp = styled.TouchableOpacity`
    position: absolute;
    bottom: 9.5%;
`;
