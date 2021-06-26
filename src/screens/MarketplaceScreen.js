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
            case "inter":
                newSexFilter = "male";
                break;
            case "male":
                newSexFilter = "female";
                break;
            case "female":
                newSexFilter = "inter";
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
                <TO onPress={changeSexFilter}>
                    <MaterialCommunityIcons
                        name={
                            sexFilter === "inter"
                                ? "gender-male-female"
                                : sexFilter === "male"
                                ? "gender-male"
                                : "gender-female"
                        }
                        size={windowWidth / 8}
                        color="#1c4068bf"
                    />
                </TO>

                <Text large bold>
                    Marketplace
                </Text>

                <TO
                    onPress={() => {
                        navigation.navigate("Search");
                    }}
                >
                    <MaterialCommunityIcons
                        name="account-search"
                        size={windowWidth / 8}
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
    background-color: #ffffff;
`;

const TopBar = styled.SafeAreaView`
    width: 95%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const TO = styled.TouchableOpacity``;
