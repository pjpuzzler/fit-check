import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import LottieView from "lottie-react-native";

import { UserContext } from "../context/UserContext";
import { FirebaseContext } from "../context/FirebaseContext";

import Text from "../components/Text";

export default LoadingScreen = () => {
    const [_, setUser] = useContext(UserContext);
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
        setTimeout(load, 1000);
    });

    const load = async () => {
        let isLoggedIn = false,
            userInfo = {};

        const currentUser = await firebase.getCurrentUser();

        if (currentUser) {
            userInfo = await firebase.getUserInfo(currentUser.uid);

            if (userInfo) isLoggedIn = true;
        }

        setUser({ isLoggedIn, ...userInfo });
    };

    return (
        <Container>
            <LottieView
                source={require("../../assets/loadingAnimation.json")}
                autoPlay
                loop
                style={{ width: "100%" }}
            />

            <Text tiny center style={{ position: "absolute", bottom: "2%" }}>
                {"© 2021 Fit Check - Team Fit Check\nMade in Centre Hall, PA"}
            </Text>
        </Container>
    );
};

const Container = styled.SafeAreaView`
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
`;
