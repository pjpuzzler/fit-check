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

    const windowWidth = Dimensions.get("window").width;

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
                <TO onPress={() => {}}>
                    <MaterialCommunityIcons
                        name="magnify"
                        size={windowWidth / 10}
                        color="#1c4068"
                    />
                </TO>

                <Text large bold>
                    Marketplace
                </Text>

                <TO onPress={changeSexFilter}>
                    <MaterialCommunityIcons
                        name={
                            sexFilter === "b"
                                ? "gender-male-female"
                                : sexFilter === "m"
                                ? "gender-male"
                                : "gender-female"
                        }
                        size={windowWidth / 10}
                        color="#1c4068"
                    />
                </TO>
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

const TO = styled.TouchableOpacity``;
