import React, { useContext, useState } from "react";
import { Platform, StatusBar, Dimensions } from "react-native";
import styled from "styled-components";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import { UserContext } from "../context/UserContext";
import { FirebaseContext } from "../context/FirebaseContext";

import Text from "../components/Text";

import Tshirt from "../../assets/clothes/t shirt.svg";

export default MainScreen = ({ navigation }) => {
    const [user, setUser] = useContext(UserContext);

    const [selectedClothing, setSelectedClothing] = useState("");

    const windowWidth = Dimensions.get("window").width;

    return (
        <Container>
            <TopBar
                style={{
                    paddingTop:
                        Platform.OS === "android" ? StatusBar.currentHeight : 0,
                }}
            ></TopBar>

            <Line
                style={{
                    width: "15%",
                    bottom: "63%",
                    left: "70%",
                    transform: [{ rotateZ: "-55deg" }],
                }}
            />
            <Line style={{ width: "5%", bottom: "66.5%", left: "81.8%" }} />
            <TO
                onPress={
                    user.selectedNeckwear === ""
                        ? () => navigation.navigate("Clothing", "neckwear")
                        : () => setSelectedClothing("neckwear")
                }
                style={{
                    position: "absolute",
                    bottom: "64%",
                    opacity: 0.5,
                    left: "88%",
                }}
            >
                <MaterialCommunityIcons
                    name="necklace"
                    size={windowWidth / 10}
                    color="#666666"
                />
            </TO>

            <Line style={{ width: "15%", bottom: "50%", left: "70%" }} />
            <TO
                onPress={
                    user.selectedTop === ""
                        ? () => navigation.navigate("Clothing", "top")
                        : () => setSelectedClothing("top")
                }
                style={{
                    position: "absolute",
                    bottom: "47.75%",
                    opacity: 0.5,
                    left: "87%",
                }}
            >
                <MaterialCommunityIcons
                    name="tshirt-crew"
                    size={windowWidth / 10}
                    color="#666666"
                />
            </TO>

            <Line
                style={{
                    width: "15%",
                    bottom: "23%",
                    left: "67%",
                    transform: [{ rotateZ: "35deg" }],
                }}
            />
            <Line style={{ width: "5%", bottom: "20.55%", left: "80.6%" }} />
            <TO
                onPress={
                    user.selectedNeckwear === ""
                        ? () => navigation.navigate("Clothing", "neckwear")
                        : () => setSelectedClothing("neckwear")
                }
                style={{
                    position: "absolute",
                    bottom: "64%",
                    opacity: 0.5,
                    left: "88%",
                }}
            ></TO>

            <Line style={{ width: "15%", bottom: "40%", left: "15%" }} />
            <TO
                onPress={
                    user.selectedWristwear === ""
                        ? () => navigation.navigate("Clothing", "wristwear")
                        : () => setSelectedClothing("wristwear")
                }
                style={{
                    position: "absolute",
                    bottom: "37.75%",
                    opacity: 0.5,
                    left: "3%",
                }}
            >
                <MaterialCommunityIcons
                    name="watch"
                    size={windowWidth / 10}
                    color="#666666"
                />
            </TO>
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
    width: 100%;
    height: 10%;
    align-items: center;
`;

const Line = styled.SafeAreaView`
    background-color: #666666;
    height: 0.25%;
    opacity: 0.5;
    position: absolute;
`;

const TO = styled.TouchableOpacity``;
