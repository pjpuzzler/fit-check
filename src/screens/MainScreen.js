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

export default MainScreen = ({ route, navigation }) => {
    const [user, setUser] = useContext(UserContext);
    const firebase = useContext(FirebaseContext);

    const windowWidth = Dimensions.get("window").width;

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
            "Clear Palette",
            "Are you sure you want to clear this palette?"
        );

        if (!res) return;

        setCurrentPalette({});
    };

    const save = async () => {
        const oid = await firebase.saveOutfit(currentOutfit);

        if (oid) {
            const newOutfit = { ...currentOutfit, oid };

            setCurrentOutfit(newOutfit);
            setUser((state) => ({
                ...state,
                outfits: [...outfits, newOutfit],
            }));
        } else setUser((state) => ({ ...state, isLoggedIn: null }));
    };

    const update = async () => {
        const success = await firebase.updateOutfit(currentOutfit);

        if (success)
            setUser((state) => ({
                ...state,
                outfits: [
                    ...user.outfits.filter(
                        (outfit) => outfit.oid !== currentOutfit.oid
                    ),
                    currentOutfit,
                ],
            }));
        else setUser((state) => ({ ...state, isLoggedIn: null }));
    };

    const share = async () => {
        const success = await firebase.shareOutfit(currentOutfit);

        if (success) {
            const newOutfit = { ...currentOutfit, shared: true };

            setCurrentOutfit(newOutfit);
            setUser((state) => ({
                ...state,
                outfits: [
                    ...user.outfits.filter(
                        (outfit) => outfit.oid !== newOutfit.oid
                    ),
                    newOutfit,
                ],
            }));
        } else setUser((state) => ({ ...state, isLoggedIn: null }));
    };

    const unshare = async () => {
        const success = await firebase.unshareOutfit(currentOutfit);

        if (success) {
            const { shared: _, ...newOutfit } = currentOutfit;

            setCurrentOutfit(newOutfit);
            setUser((state) => ({
                ...state,
                outfits: [
                    ...user.outfits.filter(
                        (outfit) => outfit.oid !== newOutfit.oid
                    ),
                    newOutfit,
                ],
            }));
        } else setUser((state) => ({ ...state, isLoggedIn: null }));
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
                            currentOutfit.neckwear
                                ? () => setSelectedClothing("neckwear")
                                : () =>
                                      navigation.navigate("Clothing", {
                                          clothingType: "neckwear",
                                          isPicker: true,
                                      })
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
                                selectedClothing === "neckwear"
                                    ? "#18d299"
                                    : currentOutfit.neckwear
                                    ? "#1c4068"
                                    : "#666666bf"
                            }
                        />
                    </TO>

                    <Line
                        style={{ width: "15%", bottom: "50%", left: "70%" }}
                    />
                    <TO
                        onPress={
                            currentOutfit.top
                                ? () => setSelectedClothing("top")
                                : () =>
                                      navigation.navigate("Clothing", {
                                          clothingType: "top",
                                          isPicker: true,
                                      })
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
                                selectedClothing === "top"
                                    ? "#18d299"
                                    : currentOutfit.top
                                    ? "#1c4068"
                                    : "#666666bf"
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
                            currentOutfit.bottom
                                ? () => setSelectedClothing("bottom")
                                : () =>
                                      navigation.navigate("Clothing", {
                                          clothingType: "bottom",
                                          isPicker: true,
                                      })
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
                            currentOutfit.wristwear
                                ? () => setSelectedClothing("wristwear")
                                : () =>
                                      navigation.navigate("Clothing", {
                                          clothingType: "wristwear",
                                          isPicker: true,
                                      })
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
                                selectedClothing === "wristwear"
                                    ? "#18d299"
                                    : currentOutfit.wristwear
                                    ? "#1c4068"
                                    : "#666666bf"
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
                            currentOutfit.footwear
                                ? () => setSelectedClothing("footwear")
                                : () =>
                                      navigation.navigate("Clothing", {
                                          clothingType: "footwear",
                                          isPicker: true,
                                      })
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
                                selectedClothing === "footwear"
                                    ? "#18d299"
                                    : currentOutfit.footwear
                                    ? "#1c4068"
                                    : "#666666bf"
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
                            currentOutfit.socks
                                ? () => setSelectedClothing("socks")
                                : () =>
                                      navigation.navigate("Clothing", {
                                          clothingType: "socks",
                                          isPicker: true,
                                      })
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
                                selectedClothing === "socks"
                                    ? "#18d299"
                                    : currentOutfit.socks
                                    ? "#1c4068"
                                    : "#666666bf"
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
                            currentOutfit.overwear
                                ? () => setSelectedClothing("overwear")
                                : () =>
                                      navigation.navigate("Clothing", {
                                          clothingType: "overwear",
                                          isPicker: true,
                                      })
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
                            currentOutfit.headwear
                                ? () => setSelectedClothing("headwear")
                                : () =>
                                      navigation.navigate("Clothing", {
                                          clothingType: "headwear",
                                          isPicker: true,
                                      })
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
                                selectedClothing === "headwear"
                                    ? "#18d299"
                                    : currentOutfit.headwear
                                    ? "#1c4068"
                                    : "#666666bf"
                            }
                        />
                    </TO>
                </Container>
            ) : null}

            <OutfitContainer>
                <TO
                    onPress={() => setSelectedClothing("top")}
                    onLongPress={() => removeClothing("top")}
                    style={{ position: "absolute", bottom: "40%" }}
                >
                    {Top ? (
                        <Top
                            width={windowWidth * 0.65}
                            height={windowWidth * 0.65}
                            color1={
                                currentOutfit.top.color1
                                    ? currentOutfit.top.color1.hex
                                    : "#999999bf"
                            }
                            shadow1={
                                currentOutfit.top.color1
                                    ? currentOutfit.top.color1.shadow
                                    : "#888888bf"
                            }
                            color2={
                                currentOutfit.top.color2
                                    ? currentOutfit.top.color2.hex
                                    : "#777777bf"
                            }
                            shadow2={
                                currentOutfit.top.color2
                                    ? currentOutfit.top.color2.shadow
                                    : "#666666bf"
                            }
                            color3={
                                currentOutfit.top.color3
                                    ? currentOutfit.top.color3.hex
                                    : "#555555bf"
                            }
                            shadow3={
                                currentOutfit.top.color3
                                    ? currentOutfit.top.color3.shadow
                                    : "#444444bf"
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
                                color="#ff0000"
                                style={{
                                    opacity: !Object.keys(currentOutfit).length
                                        ? 0.5
                                        : null,
                                }}
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
                                color="#1c4068"
                                style={{
                                    opacity: !Object.keys(currentOutfit).length
                                        ? 0.5
                                        : null,
                                }}
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
    height: 76%;
    width: 65%;
    bottom: 7%;
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
