import React, { useContext, useEffect, useState } from "react";
import { Alert, Dimensions } from "react-native";
import styled from "styled-components";
import LottieView from "lottie-react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import { UserContext } from "../context/UserContext";
import { FirebaseContext } from "../context/FirebaseContext";

import Text from "../components/Text";

export default LoadingScreen = () => {
    const [_, setUser] = useContext(UserContext);
    const firebase = useContext(FirebaseContext);

    const [loading, setLoading] = useState(true);

    const windowWidth = Dimensions.get("window").width;

    useEffect(() => {
        if (loading) setTimeout(load, 1000);
    }, [loading]);

    const load = async () => {
        let isLoggedIn = false,
            userInfo = null;

        const [success, currentUser] = await firebase.getCurrentUser();

        if (!success) {
            setLoading(false);
            return;
        }

        if (currentUser) {
            const uid = currentUser.uid;

            userInfo = await firebase.getUserInfo(uid);

            if (userInfo) {
                userInfo = {
                    ...userInfo,
                    currentPalette: {},
                    uid,
                };

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

                    Alert.alert(
                        "Daily Check-In",
                        "+5 Coins!",
                        [
                            {
                                text: "YAY!",
                            },
                        ],
                        { cancelable: true }
                    );

                    userInfo.coins += 5;
                    userInfo.lastDailyCheckIn = lastDailyCheckIn;
                }

                isLoggedIn = true;
            }
        }

        setUser({ isLoggedIn, ...userInfo });
    };

    return (
        <Container>
            {loading ? (
                <LottieView
                    source={require("../../assets/loadingAnimation.json")}
                    autoPlay
                    loop
                />
            ) : (
                <RefreshContainer>
                    <TO onPress={() => setLoading(true)}>
                        <MaterialCommunityIcons
                            name="refresh"
                            size={windowWidth / 3}
                            color="#1c4068"
                        />
                    </TO>

                    <Text large>Could not connect</Text>
                </RefreshContainer>
            )}

            <Text tiny center style={{ position: "absolute", bottom: "3%" }}>
                {"© 2021 Fit Check - Team Fit Check\nMade in Pennsylvania"}
            </Text>
        </Container>
    );
};

const Container = styled.SafeAreaView`
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
`;

const RefreshContainer = styled.SafeAreaView`
    align-items: center;
`;

const TO = styled.TouchableOpacity``;
