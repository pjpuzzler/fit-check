import React, { useContext, useEffect } from "react";
import { Alert } from "react-native";
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
            userInfo = null;

        const currentUser = await firebase.getCurrentUser();

        if (currentUser) {
            const uid = currentUser.uid;

            userInfo = await firebase.getUserInfo(uid);

            if (userInfo) {
                const lastDailyCheckIn = firebase.getTimestamp();

                if (
                    (lastDailyCheckIn.toDate().getTime() -
                        userInfo.lastDailyCheckIn.toDate().getTime()) /
                        (1000 * 3600 * 24) >=
                    1
                ) {
                    await firebase.updateData(uid, {
                        coins: userInfo.coins + 5,
                        lastDailyCheckIn,
                    });

                    Alert.alert("Daily Check-In", "+5 Coins!", [
                        {
                            text: "YAY!",
                        },
                    ]);

                    userInfo = { ...userInfo, coins, lastDailyCheckIn, uid };
                } else userInfo = { ...userInfo, uid };
                isLoggedIn = true;
            }
        }

        setUser({ isLoggedIn, ...userInfo });
    };

    return (
        <Container>
            <LottieView
                source={require("../../assets/loadingAnimation.json")}
                autoPlay
                loop
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
