import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import LottieView from "lottie-react-native";

import { UserContext } from "../context/UserContext";
import { FirebaseContext } from "../context/FirebaseContext";

export default LoadingScreen = () => {
    const [_, setUser] = useContext(UserContext);
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
        setTimeout(load, 1000);
    });

    const load = async () => {
        let success = false,
            userInfo;

        const currentUser = await firebase.getCurrentUser();

        if (currentUser) {
            userInfo = await firebase.getUserInfo(currentUser.uid);

            if (userInfo) success = true;
        }

        if (success) setUser({ isLoggedIn: true, ...userInfo });
        else setUser({ isLoggedIn: false });
    };

    return (
        <Container>
            <LottieView
                source={require("../../assets/loadingAnimation.json")}
                autoPlay
                loop
            />
        </Container>
    );
};

const Container = styled.SafeAreaView`
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
`;
