import React, { useContext, useState, useEffect } from "react";
import { Platform, StatusBar, Dimensions, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import styled from "styled-components";
import {
    MaterialCommunityIcons,
    FontAwesome5,
} from "react-native-vector-icons";

import { UserContext } from "../context/UserContext";
import { FirebaseContext } from "../context/FirebaseContext";

import Text from "../components/Text";
import { getMatchScore } from "../components/colors";

import { svgDict } from "../../assets/clothingData";

export default MainScreen = ({ route, navigation }) => {
    const [user, setUser] = useContext(UserContext);

    const [currentOutfit, setCurrentOutfit] = useState({});
    const [selectedClothing, setSelectedClothing] = useState("");
    const [fullscreen, setFullscreen] = useState(false);
    const [matchScore, setMatchScore] = useState(null);

    const [Top, setTop] = useState(null);

    const windowWidth = Dimensions.get("window").width;

    useEffect(() => {
        if (route.params && route.params.outfit)
            setCurrentOutfit({ ...currentOutfit, ...route.params.outfit });
    }, [route.params]);

    useEffect(() => {
        const colors = [
            ...Object.values(currentOutfit)
                .filter((c) => c.color1)
                .map((c) => c.color1),
            ...Object.values(currentOutfit)
                .filter((c) => c.color2)
                .map((c) => c.color2),
            ...Object.values(currentOutfit)
                .filter((c) => c.color3)
                .map((c) => c.color3),
        ];

        if (colors.length) setMatchScore(getMatchScore(colors));

        if (currentOutfit.top)
            setTop(
                svgDict[
                    currentOutfit.top + (currentOutfit.overwear ? "_under" : "")
                ]
            );
    }, [currentOutfit]);

    const removeClothing = async (clothingType) => {
        if (!currentOutfit[clothingType]) return;

        const res = await alert(
            "Remove Clothing",
            "Are you sure you want to remove this clothing?"
        );

        if (!res) return;

        if (clothingType === selectedClothing) setSelectedClothing("");

        const { [clothingType]: _, ...newOutfit } = currentOutfit;

        setCurrentOutfit(newOutfit);
    };

    const alert = (title, msg) => {
        return new Promise((resolve, _) => {
            Alert.alert(title, msg, [
                {
                    text: "NO",
                    onPress: () => resolve(false),
                    style: "cancel",
                },
                {
                    text: "YES",
                    onPress: () => resolve(true),
                },
            ]);
        });
    };

    const clear = async () => {
        const res = await alert(
            "Clear Outfit",
            "Are you sure you want to clear this outfit?"
        );

        if (!res) return;

        setUser((state) => ({
            ...state,
            currentOutfit: {},
        }));
    };

    return (
        <Container>
            {!selectedClothing && !fullscreen ? (
                <Container style={{ position: "absolute" }}>
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
                            !currentOutfit.neckwear
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
                                !currentOutfit.neckwear ? "#666666" : "#1c4068"
                            }
                        />
                    </TO>

                    <Line
                        style={{ width: "15%", bottom: "50%", left: "70%" }}
                    />
                    <TO
                        onPress={
                            !currentOutfit.top
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
                        style={{
                            position: "absolute",
                            bottom: "47.75%",
                            left: "87%",
                        }}
                    >
                        <MaterialCommunityIcons
                            name="tshirt-crew"
                            size={windowWidth / 10}
                            color={!currentOutfit.top ? "#666666" : "#1c4068"}
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
                            !currentOutfit.bottom
                                ? () =>
                                      navigation.navigate("Clothing", {
                                          clothingType: "bottom",
                                          isCloset: false,
                                      })
                                : selectedClothing === "bottom"
                                ? () => setSelectedClothing("")
                                : () => setSelectedClothing("bottom")
                        }
                        onLongPress={() => removeClothing("bottom")}
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
                            !currentOutfit.wristwear
                                ? () =>
                                      navigation.navigate("Clothing", {
                                          clothingType: "wristwear",
                                          isCloset: false,
                                      })
                                : selectedClothing === "wristwear"
                                ? () => setSelectedClothing("")
                                : () => setSelectedClothing("wristwear")
                        }
                        onLongPress={() => removeClothing("wristwear")}
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
                                !currentOutfit.wristwear ? "#666666" : "#1c4068"
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
                            !currentOutfit.footwear
                                ? () =>
                                      navigation.navigate("Clothing", {
                                          clothingType: "footwear",
                                          isCloset: false,
                                      })
                                : selectedClothing === "footwear"
                                ? () => setSelectedClothing("")
                                : () => setSelectedClothing("footwear")
                        }
                        onLongPress={() => removeClothing("footwear")}
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
                                !currentOutfit.footwear ? "#666666" : "#1c4068"
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
                            !currentOutfit.socks
                                ? () =>
                                      navigation.navigate("Clothing", {
                                          clothingType: "socks",
                                          isCloset: false,
                                      })
                                : selectedClothing === "socks"
                                ? () => setSelectedClothing("")
                                : () => setSelectedClothing("socks")
                        }
                        onLongPress={() => removeClothing("socks")}
                        style={{
                            position: "absolute",
                            bottom: "7%",
                            left: "10%",
                        }}
                    >
                        <FontAwesome5
                            name="socks"
                            size={windowWidth / 14}
                            color={!currentOutfit.socks ? "#666666" : "#1c4068"}
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
                            !currentOutfit.overwear
                                ? () =>
                                      navigation.navigate("Clothing", {
                                          clothingType: "overwear",
                                          isCloset: false,
                                      })
                                : selectedClothing === "overwear"
                                ? () => setSelectedClothing("")
                                : () => setSelectedClothing("overwear")
                        }
                        onLongPress={() => removeClothing("overwear")}
                        style={{
                            position: "absolute",
                            bottom: "64%",
                            left: "88%",
                        }}
                    ></TO>

                    <Line
                        style={{
                            width: "5%",
                            bottom: "74%",
                            left: "48%",
                            transform: [{ rotateZ: "90deg" }],
                        }}
                    />
                    <TO
                        onPress={
                            !currentOutfit.headwear
                                ? () =>
                                      navigation.navigate("Clothing", {
                                          clothingType: "headwear",
                                          isCloset: false,
                                      })
                                : selectedClothing === "headwear"
                                ? () => setSelectedClothing("")
                                : () => setSelectedClothing("headwear")
                        }
                        onLongPress={() => removeClothing("headwear")}
                        style={{
                            position: "absolute",
                            bottom: "76%",
                            left: "45.5%",
                        }}
                    >
                        <MaterialCommunityIcons
                            name="hat-fedora"
                            size={windowWidth / 10}
                            color={
                                !currentOutfit.headwear ? "#666666" : "#1c4068"
                            }
                        />
                    </TO>
                </Container>
            ) : null}

            <OutfitContainer>
                <TO
                    onPress={
                        selectedClothing === "top"
                            ? () => setSelectedClothing("")
                            : () => setSelectedClothing("top")
                    }
                    onLongPress={() => removeClothing("top")}
                    style={{ position: "absolute", bottom: "33%" }}
                >
                    {Top ? (
                        <Top
                            width={windowWidth * 0.6}
                            height={windowWidth * 0.6}
                            color1={
                                currentOutfit.top.color1
                                    ? currentOutfit.top.color1.hex
                                    : null
                            }
                            shadow1={
                                currentOutfit.top.color1
                                    ? currentOutfit.top.color1.shadow
                                    : null
                            }
                            color2={
                                currentOutfit.top.color2
                                    ? currentOutfit.top.color2.hex
                                    : null
                            }
                            shadow2={
                                currentOutfit.top.color2
                                    ? currentOutfit.top.color2.shadow
                                    : null
                            }
                            color3={
                                currentOutfit.top.color3
                                    ? currentOutfit.top.color3.hex
                                    : null
                            }
                            shadow3={
                                currentOutfit.top.color3
                                    ? currentOutfit.top.color3.shadow
                                    : null
                            }
                        />
                    ) : null}
                </TO>
            </OutfitContainer>

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
            ) : !fullscreen ? (
                <TopBar
                    style={{
                        paddingTop:
                            Platform.OS === "android"
                                ? StatusBar.currentHeight
                                : 0,
                    }}
                >
                    <ButtonsContainer>
                        <TO
                            onPress={clear}
                            disabled={!Object.keys(currentOutfit).length}
                        >
                            <MaterialCommunityIcons
                                name="delete"
                                size={windowWidth / 8}
                                color={
                                    Object.keys(currentOutfit).length
                                        ? "#ff0000"
                                        : "#ff000040"
                                }
                            />
                        </TO>

                        <TO>
                            <Circle
                                style={{
                                    borderRadius: windowWidth,
                                    width: windowWidth / 5,
                                    height: windowWidth / 5,
                                }}
                            >
                                <MaterialCommunityIcons
                                    name="creation"
                                    size={windowWidth / 8}
                                    color="#ffffff"
                                />
                            </Circle>
                        </TO>

                        <TO disabled={!Object.keys(currentOutfit).length}>
                            <MaterialCommunityIcons
                                name="information"
                                size={windowWidth / 8}
                                color={
                                    Object.keys(currentOutfit).length
                                        ? "#1c4068"
                                        : "#1c406840"
                                }
                            />
                        </TO>
                    </ButtonsContainer>
                </TopBar>
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

const OutfitContainer = styled.SafeAreaView`
    height: 90%;
    width: 60%;
    position: absolute;
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

const ButtonsContainer = styled.SafeAreaView`
    height: 40%;
    flex-direction: row;
    justify-content: space-between;
`;

const TO = styled.TouchableOpacity``;

const Line = styled.SafeAreaView`
    background-color: #666666;
    height: 0.25%;
    opacity: 0.5;
    position: absolute;
`;

const Circle = styled.SafeAreaView`
    background-color: #18d299;
    align-items: center;
    justify-content: center;
`;
