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

import Tshirt from "../../assets/clothes/tshirt.svg";

export default MainScreen = ({ navigation }) => {
    const [user, setUser] = useContext(UserContext);

    const [selectedClothing, setSelectedClothing] = useState("");
    const [fullscreen, setFullscreen] = useState(false);

    const windowWidth = Dimensions.get("window").width;

    const removeClothing = async (clothingType) => {
        if (!(clothingType in user.currentOutfit)) return;

        const res = await alert(
            "Remove Clothing",
            "Are you sure you want to remove this clothing?"
        );

        if (!res) return;

        if (clothingType === selectedClothing) setSelectedClothing("");

        const { [clothingType]: _, ...currentOutfit } = user.currentOutfit;

        setUser((state) => ({
            ...state,
            currentOutfit,
        }));
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
            {!fullscreen ? (
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
                            !("neckwear" in user.currentOutfit)
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
                                !("neckwear" in user.currentOutfit)
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
                            !("top" in user.currentOutfit)
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
                            color={
                                !("top" in user.currentOutfit)
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
                        style={{ width: "5%", bottom: "20.55%", left: "80.6%" }}
                    />
                    <TO
                        onPress={
                            !("bottom" in user.currentOutfit)
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
                            !("wristwear" in user.currentOutfit)
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
                                !("wristwear" in user.currentOutfit)
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
                            !("footwear" in user.currentOutfit)
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
                                !("footwear" in user.currentOutfit)
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
                            !("socks" in user.currentOutfit)
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
                            color={
                                !("socks" in user.currentOutfit)
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
                            !("overwear" in user.currentOutfit)
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
                            bottom: "66%",
                            left: "48%",
                            transform: [{ rotateZ: "90deg" }],
                        }}
                    />
                    <TO
                        onPress={
                            !("headwear" in user.currentOutfit)
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
                            bottom: "68%",
                            left: "45.5%",
                        }}
                    >
                        <MaterialCommunityIcons
                            name="hat-fedora"
                            size={windowWidth / 10}
                            color={
                                !("headwear" in user.currentOutfit)
                                    ? "#66666640"
                                    : selectedClothing === "headwear"
                                    ? "#18d299"
                                    : "#1c4068"
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
                    style={{ position: "absolute", bottom: "40%" }}
                >
                    {"top" in user.currentOutfit &&
                    user.currentOutfit.top.name === "tshirt" ? (
                        <Tshirt
                            width={windowWidth * 0.65}
                            height={windowWidth * 0.65}
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
                            disabled={!Object.keys(user.currentOutfit).length}
                        >
                            <MaterialCommunityIcons
                                name="delete"
                                size={windowWidth / 8}
                                color={
                                    Object.keys(user.currentOutfit).length
                                        ? "#ff0000"
                                        : "#ff000040"
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
    width: 65%;
    position: absolute;
`;

const OverlayColor = styled.SafeAreaView`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ff000040;
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
    height: 25%;
    width: 30%;
`;

const TO = styled.TouchableOpacity``;

const Line = styled.SafeAreaView`
    background-color: #666666;
    height: 0.25%;
    opacity: 0.5;
    position: absolute;
`;
