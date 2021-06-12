import React, { useContext } from "react";
import { Platform, StatusBar, Dimensions } from "react-native";
import styled from "styled-components";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import { UserContext } from "../context/UserContext";
import { FirebaseContext } from "../context/FirebaseContext";

import Text from "../components/Text";

export default UserScreen = ({ navigation }) => {
    const [user] = useContext(UserContext);

    const windowHeight = Dimensions.get("window").height;

    return (
        <Container>
            <TopBar
                style={{
                    paddingTop:
                        Platform.OS === "android" ? StatusBar.currentHeight : 0,
                }}
            >
                <MaterialCommunityIcons
                    name="cog"
                    size={windowHeight / 16}
                    style={{ opacity: 0 }}
                />

                <Text large bold color="#18d299">
                    {user.username}
                </Text>

                <TO
                    onPress={() => {
                        navigation.navigate("Settings");
                    }}
                >
                    <MaterialCommunityIcons
                        name="cog"
                        size={windowHeight / 16}
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
