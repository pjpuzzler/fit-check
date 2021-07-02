import React, { useContext, useState, useEffect } from "react";
import { Platform, StatusBar, Dimensions } from "react-native";
import styled from "styled-components";
import {
    MaterialCommunityIcons,
    FontAwesome5,
} from "react-native-vector-icons";

import { UserContext } from "../context/UserContext";

import Text from "../components/Text";

import clothes from "../../assets/clothingData";
import Tshirt from "../../assets/clothes/tshirt.svg";

export default ClothingScreen = ({ route, navigation }) => {
    const [user, setUser] = useContext(UserContext);

    const clothingType = route.params.clothingType;
    const isCloset = route.params.isCloset;
    const clothingData = clothes.filter(
        (clothing) => clothing.type === clothingType
    );

    const [wardrobeClothing, setWardrobeClothing] = useState(true);
    const [filter, setFilter] = useState("all");
    const [data, setData] = useState(clothingData);

    const windowWidth = Dimensions.get("window").width;

    useEffect(() => {
        setData(
            filter !== "all"
                ? clothingData.filter((clothing) =>
                      clothing.settings.includes(filter)
                  )
                : clothingData
        );
    }, [filter]);

    const renderClothing = ({ item }) => {
        return (
            <ClothingContainer
                onPress={() =>
                    navigation.navigate("Main", {
                        outfit: { [clothingType]: item },
                    })
                }
                style={{ borderRadius: windowWidth / 20 }}
            >
                {item.name === "tshirt" ? (
                    <Tshirt
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

                <TO onPress={() => setWardrobeClothing(!wardrobeClothing)}>
                    <MaterialCommunityIcons
                        name={wardrobeClothing ? "wardrobe" : "all-inclusive"}
                        size={windowWidth / 8}
                        color="#1c4068bf"
                    />
                </TO>
            </TopBar>

            <FiltersContainer>
                <TO onPress={() => setFilter("all")}>
                    <MaterialCommunityIcons
                        name="all-inclusive"
                        size={windowWidth / 12}
                        color={filter === "all" ? "#1c4068" : "#666666bf"}
                        style={{ opacity: filter !== "all" ? 0.5 : null }}
                    />
                </TO>

                <TO onPress={() => setFilter("casual")}>
                    <MaterialCommunityIcons
                        name="white-balance-sunny"
                        size={windowWidth / 12}
                        color={filter === "casual" ? "#1c4068" : "#666666bf"}
                        style={{ opacity: filter !== "casual" ? 0.5 : null }}
                    />
                </TO>

                <TO onPress={() => setFilter("formal")}>
                    <MaterialCommunityIcons
                        name="account-tie"
                        size={windowWidth / 12}
                        color={filter === "formal" ? "#1c4068" : "#666666bf"}
                        style={{ opacity: filter !== "formal" ? 0.5 : null }}
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
