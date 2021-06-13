import React, { useContext, useState } from "react";
import { Platform, StatusBar, Dimensions } from "react-native";
import styled from "styled-components";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import { UserContext } from "../context/UserContext";
import { FirebaseContext } from "../context/FirebaseContext";

import Text from "../components/Text";

export default SearchScreen = ({ navigation }) => {
    const [user, setUser] = useContext(UserContext);

    const [loading, setLoading] = useState(false);

    const windowWidth = Dimensions.get("window").width;

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
    align-items: center;
`;

const TO = styled.TouchableOpacity``;
