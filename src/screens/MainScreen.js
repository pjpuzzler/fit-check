import React, { useContext, useState } from "react";
import { Platform, StatusBar, Dimensions } from "react-native";
import styled from "styled-components";
import {
    MaterialCommunityIcons,
    FontAwesome5,
} from "react-native-vector-icons";

import { UserContext } from "../context/UserContext";
import { FirebaseContext } from "../context/FirebaseContext";

import Text from "../components/Text";

import Tshirt from "../../assets/clothes/t shirt.svg";

export default MainScreen = ({ navigation }) => {
    const [user, setUser] = useContext(UserContext);

    const [selectedClothing, setSelectedClothing] = useState("");
    const [fullscreen, setFullscreen] = useState(false);

    const windowWidth = Dimensions.get("window").width;

    return (
        <Container>
            {selectedClothing && !fullscreen ? (
                <ClothingEditorContainer>
                    <TopBar
                        style={{
                            paddingTop:
                                Platform.OS === "android"
                                    ? StatusBar.currentHeight
                                    : 0,
                        }}
                    >
                        <TO onPress={() => setSelectedClothing("")}>
                            <MaterialCommunityIcons
                                name="close"
                                size={windowWidth / 8}
                                color="#1c4068"
                            />
                        </TO>
                    </TopBar>
                </ClothingEditorContainer>
            ) : null}

            {!fullscreen ? (
                <Container>
                    <Line
                        style={{
                            width: "15%",
                            bottom: "63%",
                            left: "70%",
                            transform: [{ rotateZ: "-55deg" }],
                        }}
                    />
                    <Line
                        style={{ width: "5%", bottom: "66.5%", left: "81.8%" }}
                    />
                    <TO
                        onPress={
                            user.selectedNeckwear === ""
                                ? () =>
                                      navigation.navigate("Clothing", {
                                          clothingType: "neckwear",
                                          isCloset: false,
                                      })
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

                    <Line
                        style={{ width: "15%", bottom: "50%", left: "70%" }}
                    />
                    <TO
                        onPress={
                            user.selectedTop === ""
                                ? () =>
                                      navigation.navigate("Clothing", {
                                          clothingType: "top",
                                          isCloset: false,
                                      })
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
                    <Line
                        style={{ width: "5%", bottom: "20.55%", left: "80.6%" }}
                    />
                    <TO
                        onPress={
                            user.selectedNeckwear === ""
                                ? () =>
                                      navigation.navigate("Clothing", {
                                          clothingType: "neckwear",
                                          isCloset: false,
                                      })
                                : () => setSelectedClothing("neckwear")
                        }
                        style={{
                            position: "absolute",
                            bottom: "64%",
                            opacity: 0.5,
                            left: "88%",
                        }}
                    ></TO>

                    <Line
                        style={{ width: "15%", bottom: "40%", left: "15%" }}
                    />
                    <TO
                        onPress={
                            user.selectedWristwear === ""
                                ? () =>
                                      navigation.navigate("Clothing", {
                                          clothingType: "wristwear",
                                          isCloset: false,
                                      })
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

                    <Line
                        style={{
                            width: "5%",
                            bottom: "9%",
                            left: "48%",
                            transform: [{ rotateZ: "90deg" }],
                        }}
                    />
                    <TO
                        onPress={
                            user.selectedFootwear === ""
                                ? () =>
                                      navigation.navigate("Clothing", {
                                          clothingType: "footwear",
                                          isCloset: false,
                                      })
                                : () => setSelectedClothing("footwear")
                        }
                        style={{
                            position: "absolute",
                            bottom: "2%",
                            opacity: 0.5,
                            left: "45.5%",
                        }}
                    >
                        <MaterialCommunityIcons
                            name="shoe-formal"
                            size={windowWidth / 10}
                            color="#666666"
                        />
                    </TO>

                    <Line
                        style={{
                            width: "15%",
                            bottom: "13%",
                            left: "20%",
                            transform: [{ rotateZ: "-25deg" }],
                        }}
                    />
                    <TO
                        onPress={
                            user.selectedSocks === ""
                                ? () =>
                                      navigation.navigate("Clothing", {
                                          clothingType: "socks",
                                          isCloset: false,
                                      })
                                : () => setSelectedClothing("socks")
                        }
                        style={{
                            position: "absolute",
                            bottom: "7%",
                            opacity: 0.5,
                            left: "10%",
                        }}
                    >
                        <FontAwesome5
                            name="socks"
                            size={windowWidth / 14}
                            color="#666666"
                        />
                    </TO>

                    <Line
                        style={{
                            width: "15%",
                            bottom: "60%",
                            left: "15%",
                            transform: [{ rotateZ: "55deg" }],
                        }}
                    />
                    <Line
                        style={{ width: "5%", bottom: "63.4%", left: "13.2%" }}
                    />
                    <TO
                        onPress={
                            user.selectedOverwear === ""
                                ? () =>
                                      navigation.navigate("Clothing", {
                                          clothingType: "overwear",
                                          isCloset: false,
                                      })
                                : () => setSelectedClothing("overwear")
                        }
                        style={{
                            position: "absolute",
                            bottom: "64%",
                            opacity: 0.5,
                            left: "88%",
                        }}
                    ></TO>

                    <Line
                        style={{
                            width: "5%",
                            bottom: "66%",
                            left: "48%",
                            transform: [{ rotateZ: "90deg" }],
                        }}
                    />
                    <TO
                        onPress={
                            user.selectedHeadwear === ""
                                ? () =>
                                      navigation.navigate("Clothing", {
                                          clothingType: "headwear",
                                          isCloset: false,
                                      })
                                : () => setSelectedClothing("headwear")
                        }
                        style={{
                            position: "absolute",
                            bottom: "68%",
                            opacity: 0.5,
                            left: "45.5%",
                        }}
                    >
                        <MaterialCommunityIcons
                            name="hat-fedora"
                            size={windowWidth / 10}
                            color="#666666"
                        />
                    </TO>
                </Container>
            ) : null}
        </Container>
    );
};

const Container = styled.SafeAreaView`
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
`;

const ClothingEditorContainer = styled.SafeAreaView`
    width: 100%;
    height: 25%;
    align-items: center;
`;

const TopBar = styled.SafeAreaView`
    width: 95%;
`;

const TO = styled.TouchableOpacity``;

const Line = styled.SafeAreaView`
    background-color: #666666;
    height: 0.25%;
    opacity: 0.5;
    position: absolute;
`;
