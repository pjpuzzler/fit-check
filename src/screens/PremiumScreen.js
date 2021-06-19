import React, { useContext, useState } from "react";
import { Platform, StatusBar, Dimensions } from "react-native";
import styled from "styled-components";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import { UserContext } from "../context/UserContext";
import { FirebaseContext } from "../context/FirebaseContext";

import Text from "../components/Text";

export default PremiumScreen = ({ navigation }) => {
    const [user, setUser] = useContext(UserContext);

    const [loading, setLoading] = useState(false);

    const windowWidth = Dimensions.get("window").width;

    const buy = async () => {};

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

                <Text large heavy color="#ffd700">
                    Premium
                </Text>

                <MaterialCommunityIcons
                    name="arrow-left"
                    size={windowWidth / 8}
                    style={{ opacity: 0 }}
                />
            </TopBar>

            <Text large heavy center margin="5% 0 0">
                With Premium, you get access to:
            </Text>

            <Text
                heavy
                center
                margin="9% 0 0"
                style={{ textDecorationLine: "underline" }}
            >
                Unlimited outfit slots
            </Text>

            <Text
                heavy
                center
                margin="18% 0 0"
                style={{ textDecorationLine: "underline" }}
            >
                All clothing items
            </Text>

            <Text
                heavy
                center
                margin="18% 0 0"
                style={{ textDecorationLine: "underline" }}
            >
                Premium flair
            </Text>

            <Text
                heavy
                center
                margin="18% 0 0"
                style={{ textDecorationLine: "underline" }}
            >
                Upcoming smart-pick tech
            </Text>

            <BuyButton
                style={{
                    borderRadius: windowWidth / 13.33,
                    opacity: loading ? 0.5 : null,
                }}
                onPress={buy}
                disabled={loading}
            >
                {loading ? (
                    <LottieView
                        source={require("../../assets/loadingAnimation2White.json")}
                        autoPlay
                        loop
                    />
                ) : (
                    <Text bold center color="#ffffff">
                        $2.99
                    </Text>
                )}
            </BuyButton>
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

const BuyButton = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    width: 75%;
    height: 10%;
    background-color: #ffd700;
    position: absolute;
    bottom: 5%;
`;
