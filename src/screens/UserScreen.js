import React, { useContext } from "react";
import { Platform, StatusBar, Dimensions } from "react-native";
import styled from "styled-components";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import { UserContext } from "../context/UserContext";
import { FirebaseContext } from "../context/FirebaseContext";

import Text from "../components/Text";

export default UserScreen = ({ navigation }) => {
    const [user, setUser] = useContext(UserContext);
    const firebase = useContext(FirebaseContext);

    const windowHeight = Dimensions.get("window").height;

    const logOut = async () => {
        const loggedOut = await firebase.logOut();

        if (loggedOut) setUser((state) => ({ ...state, isLoggedIn: false }));
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
                        name="cog"
                        size={windowHeight / 16}
                        color="#1c4068"
                    />
                </IconContainer>

                <Text large bold>
                    {user.username}
                </Text>

                <IconContainer onPress={logOut}>
                    <MaterialCommunityIcons
                        name="logout"
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
