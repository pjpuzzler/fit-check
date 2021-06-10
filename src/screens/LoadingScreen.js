import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import LottieView from "lottie-react-native";

import { UserContext } from "../context/UserContext";
import { FirebaseContext } from "../context/FirebaseContext";

export default LoadingScreen = () => {
    const [_, setUser] = useContext(UserContext);
    const firebaseContext = useContext(FirebaseContext);

    useEffect(() => {
        setTimeout(async () => {
            const currentUser = firebaseContext.getCurrentUser();

            if (currentUser) {
                const userInfo = await firebaseContext.getUserInfo(
                    currentUser.uid
                );

                setUser({ isLoggedIn: true, ...userInfo });
            } else setUser({ isLoggedIn: false });
        }, 1000);
    }, []);

    return (
        <Container>
            <LottieView
                source={require("../../assets/loadingAnimation.json")}
                autoPlay
                loop
                style={{ width: "45%" }}
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
