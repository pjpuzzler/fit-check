import React, { useContext, useState } from "react";
import { Platform, StatusBar, Dimensions } from "react-native";
import styled from "styled-components";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import { UserContext } from "../context/UserContext";
import { FirebaseContext } from "../context/FirebaseContext";

import Text from "../components/Text";

export default MarketplaceScreen = ({ navigation }) => {
    const [user, _] = useContext(UserContext);

    const [sexFilter, setSexFilter] = useState(user.sex);

    const windowHeight = Dimensions.get("window").height;

    const changeSexFilter = () => {
        let newSexFilter;

        switch (sexFilter) {
            case "b":
                newSexFilter = "m";
                break;
            case "m":
                newSexFilter = "f";
                break;
            case "f":
                newSexFilter = "b";
                break;
        }

        setSexFilter(newSexFilter);
    };

    return (
        <Container>
            <TopBar
                style={{
                    paddingTop:
                        Platform.OS === "android" ? StatusBar.currentHeight : 0,
                }}
            >
                <IconContainer onPress={() => {}}>
                    <MaterialCommunityIcons
                        name="magnify"
                        size={windowHeight / 16}
                        color="#1c4068"
                    />
                </IconContainer>

                <Text large bold>
                    Marketplace
                </Text>

                <IconContainer onPress={changeSexFilter}>
                    <MaterialCommunityIcons
                        name={
                            sexFilter === "b"
                                ? "gender-male-female"
                                : sexFilter === "m"
                                ? "gender-male"
                                : "gender-female"
                        }
                        size={windowHeight / 16}
                        color="#1c4068"
                    />
                </IconContainer>
            </TopBar>
        </Container>
    );
};

const Container = styled.SafeAreaView`
    align-items: center;
    width: 100%;
    height: 100%;
`;

const TopBar = styled.SafeAreaView`
    width: 95%;
    flex-direction: row;
    justify-content: space-between;
`;

const IconContainer = styled.TouchableOpacity``;
