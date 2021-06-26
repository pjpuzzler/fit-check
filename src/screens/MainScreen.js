import React, { useContext, useState } from "react";
import { Platform, StatusBar, Dimensions, Alert } from "react-native";
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

    const removeClothing = async (clothing) => {
        const clothingCap =
            "selected" + clothing.charAt(0).toUpperCase() + clothing.slice(1);

        if (!user[clothingCap]) return;

        const res = await removeClothingAlert();

        if (!res) return;

        if (clothing === selectedClothing) setSelectedClothing("");

        setUser((state) => ({
            ...state,
            [clothingCap]: null,
        }));
    };

    const removeClothingAlert = () => {
        return new Promise((resolve, _) => {
            Alert.alert(
                "Remove Clothing",
                "Are you sure you want to remove this clothing?",
                [
                    {
                        text: "NO",
                        onPress: () => resolve(false),
                        style: "cancel",
                    },
                    {
                        text: "YES",
                        onPress: () => resolve(true),
                    },
                ]
            );
        });
    };

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
                        onPress={() =>
                            !user.selectedNeckwear
                                ? () =>
                                      navigation.navigate("Clothing", {
                                          clothingType: "neckwear",
                                          isCloset: false,
                                      })
                                : selectedClothing === "neckwear"
                                ? () => setSelectedClothing("")
                                : () => setSelectedClothing("neckwear")
                        }
                        onLongPress={() => removeClothing("neckwear")}
                        style={{
                            position: "absolute",
                            bottom: "64%",
                            left: "88%",
                        }}
                    >
                        <MaterialCommunityIcons
                            name="necklace"
                            size={windowWidth / 10}
                            color={
                                !user.selectedNeckwear
                                    ? "#66666640"
                                    : selectedClothing === "neckwear"
                                    ? "#18d299"
                                    : "#1c4068"
                            }
                        />
                    </TO>

                    <Line
                        style={{ width: "15%", bottom: "50%", left: "70%" }}
                    />
                    <TO
                        onPress={
                            !user.selectedTop
                                ? () =>
                                      navigation.navigate("Clothing", {
                                          clothingType: "top",
                                          isCloset: false,
                                      })
                                : selectedClothing === "top"
                                ? () => setSelectedClothing("")
                                : () => setSelectedClothing("top")
                        }
                        onLongPress={() => removeClothing("top")}
                        containerStyle={{
                            opactiy: !user.selectedTop ? 0.5 : null,
                        }}
                        style={{
                            position: "absolute",
                            bottom: "47.75%",
                            left: "87%",
                        }}
                    >
                        <MaterialCommunityIcons
                            name="tshirt-crew"
                            size={windowWidth / 10}
                            color={
                                !user.selectedTop
                                    ? "#66666640"
                                    : selectedClothing === "top"
                                    ? "#18d299"
                                    : "#1c4068"
                            }
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
                        style={{ width: "5%", bottom: "20.55%", left: "40.6%" }}
                    />
                    <TO
                        onPress={
                            !user.selectedBottom
                                ? () =>
                                      navigation.navigate("Clothing", {
                                          clothingType: "bottom",
                                          isCloset: false,
                                      })
                                : selectedClothing === "bottom"
                                ? () => setSelectedClothing("")
                                : () => setSelectedClothing("bottom")
                        }
                        style={{
                            position: "absolute",
                            bottom: "64%",
                            left: "88%",
                        }}
                    ></TO>

                    <Line
                        style={{ width: "15%", bottom: "40%", left: "15%" }}
                    />
                    <TO
                        onPress={
                            !user.selectedWristwear
                                ? () =>
                                      navigation.navigate("Clothing", {
                                          clothingType: "wristwear",
                                          isCloset: false,
                                      })
                                : selectedClothing === "wristwear"
                                ? () => setSelectedClothing("")
                                : () => setSelectedClothing("wristwear")
                        }
                        style={{
                            position: "absolute",
                            bottom: "37.75%",
                            left: "3%",
                        }}
                    >
                        <MaterialCommunityIcons
                            name="watch"
                            size={windowWidth / 10}
                            color={
                                !user.selectedWristwear
                                    ? "#66666640"
                                    : selectedClothing === "wristwear"
                                    ? "#18d299"
                                    : "#1c4068"
                            }
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
                            !user.selectedFootwear
                                ? () =>
                                      navigation.navigate("Clothing", {
                                          clothingType: "footwear",
                                          isCloset: false,
                                      })
                                : selectedClothing === "footwear"
                                ? () => setSelectedClothing("")
                                : () => setSelectedClothing("footwear")
                        }
                        style={{
                            position: "absolute",
                            bottom: "2%",
                            left: "45.5%",
                        }}
                    >
                        <MaterialCommunityIcons
                            name="shoe-formal"
                            size={windowWidth / 10}
                            color={
                                !user.selectedFootwear
                                    ? "#66666640"
                                    : selectedClothing === "footwear"
                                    ? "#18d299"
                                    : "#1c4068"
                            }
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
                            !user.selectedSocks
                                ? () =>
                                      navigation.navigate("Clothing", {
                                          clothingType: "socks",
                                          isCloset: false,
                                      })
                                : selectedClothing === "socks"
                                ? () => setSelectedClothing("")
                                : () => setSelectedClothing("socks")
                        }
                        style={{
                            position: "absolute",
                            bottom: "7%",
                            left: "10%",
                        }}
                    >
                        <FontAwesome5
                            name="socks"
                            size={windowWidth / 14}
                            color={
                                !user.selectedSocks
                                    ? "#66666640"
                                    : selectedClothing === "socks"
                                    ? "#18d299"
                                    : "#1c4068"
                            }
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
                            !user.selectedOverwear
                                ? () =>
                                      navigation.navigate("Clothing", {
                                          clothingType: "overwear",
                                          isCloset: false,
                                      })
                                : selectedClothing === "overwear"
                                ? () => setSelectedClothing("")
                                : () => setSelectedClothing("overwear")
                        }
                        style={{
                            position: "absolute",
                            bottom: "64%",
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
                            !user.selectedHeadwear
                                ? () =>
                                      navigation.navigate("Clothing", {
                                          clothingType: "headwear",
                                          isCloset: false,
                                      })
                                : selectedClothing === "headwear"
                                ? () => setSelectedClothing("")
                                : () => setSelectedClothing("headwear")
                        }
                        style={{
                            position: "absolute",
                            bottom: "68%",
                            left: "45.5%",
                        }}
                    >
                        <MaterialCommunityIcons
                            name="hat-fedora"
                            size={windowWidth / 10}
                            color={
                                !user.selectedHeadwear
                                    ? "#66666640"
                                    : selectedClothing === "headwear"
                                    ? "#18d299"
                                    : "#1c4068"
                            }
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
    background-color: #6666661a;
`;

const TopBar = styled.SafeAreaView`
    width: 95%;
`;

const TO = styled.TouchableOpacity``;

const TOView = styled.SafeAreaView``;

const Line = styled.SafeAreaView`
    background-color: #666666;
    height: 0.25%;
    opacity: 0.5;
    position: absolute;
`;
