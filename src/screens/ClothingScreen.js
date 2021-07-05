import React, { useContext, useState, useEffect } from "react";
import { Platform, StatusBar, Dimensions } from "react-native";
import styled from "styled-components";
import {
    MaterialCommunityIcons,
    FontAwesome5,
} from "react-native-vector-icons";

import { UserContext } from "../context/UserContext";

import Text from "../components/Text";

import { clothes, svgDict } from "../../assets/clothingData";

export default ClothingScreen = ({ route, navigation }) => {
    const [user, setUser] = useContext(UserContext);

    const clothingType = route.params.clothingType;
    const isPicker = route.params.isPicker;
    const clothingData = clothes[clothingType];

    const [wardrobeFilter, setWardrobeFilter] = useState(true);
    const [sexFilter, setSexFilter] = useState(user.sex);
    const [preData, setPreData] = useState(clothingData);
    const [data, setData] = useState(preData);

    const windowWidth = Dimensions.get("window").width;

    useEffect(() => {
        setData(
            sexFilter !== "inter"
                ? preData.filter((clothing) => clothing.sex.includes(sexFilter))
                : preData
        );
    }, [sexFilter, preData]);

    useEffect(() => {
        setPreData(wardrobeFilter ? user.clothing : clothingData);
    }, [wardrobeFilter]);

    const renderClothing = ({ item }) => {
        const Clothing = svgDict[item.name];

        return (
            <ClothingContainer
                onPress={
                    isPicker
                        ? () =>
                              navigation.navigate("Main", {
                                  screen: "Main",
                                  params: { outfit: { [clothingType]: item } },
                              })
                        : () => {}
                }
                style={{ borderRadius: windowWidth / 20 }}
            >
                {Clothing ? (
                    <Clothing
                        width={windowWidth * 0.48}
                        height={windowWidth * 0.48}
                    />
                ) : (
                    <FontAwesome5
                        name="question"
                        size={windowWidth / 6}
                        color="#1c4068"
                    />
                )}
            </ClothingContainer>
        );
    };

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

                <Text large bold>
                    {clothingType.charAt(0).toUpperCase() +
                        clothingType.slice(1)}
                </Text>

                <TO onPress={() => setWardrobeFilter(!wardrobeFilter)}>
                    <MaterialCommunityIcons
                        name={wardrobeFilter ? "wardrobe" : "all-inclusive"}
                        size={windowWidth / 8}
                        color="#1c4068bf"
                    />
                </TO>
            </TopBar>

            <FiltersContainer>
                <TO onPress={() => setSexFilter("male")}>
                    <MaterialCommunityIcons
                        name="gender-male"
                        size={windowWidth / 12}
                        color={sexFilter === "male" ? "#1c4068" : "#666666"}
                    />
                </TO>

                <TO onPress={() => setSexFilter("inter")}>
                    <MaterialCommunityIcons
                        name="gender-male-female"
                        size={windowWidth / 12}
                        color={sexFilter === "inter" ? "#1c4068" : "#666666"}
                    />
                </TO>

                <TO onPress={() => setSexFilter("female")}>
                    <MaterialCommunityIcons
                        name="gender-female"
                        size={windowWidth / 12}
                        color={sexFilter === "female" ? "#1c4068" : "#666666"}
                    />
                </TO>
            </FiltersContainer>

            <ClothingList
                data={data}
                renderItem={renderClothing}
                initialNumToRender={9}
                keyExtractor={(item) => item.name}
                numColumns={2}
            />
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

const FiltersContainer = styled.SafeAreaView`
    width: 85%;
    margin-top: 5%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const ClothingList = styled.FlatList`
    width: 100%;
    height: 100%;
    margin-top: 5%;
`;

const ClothingContainer = styled.TouchableOpacity`
    width: 47%;
    justify-content: center;
    align-items: center;
    margin: 2% 0 0 2%;
    background-color: #66666640;
`;
