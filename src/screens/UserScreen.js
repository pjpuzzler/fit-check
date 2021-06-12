import React, { useContext } from "react";
import { Platform, StatusBar, Dimensions } from "react-native";
import styled from "styled-components";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import { UserContext } from "../context/UserContext";
import { FirebaseContext } from "../context/FirebaseContext";

import Text from "../components/Text";

export default UserScreen = ({ navigation }) => {
    const [user] = useContext(UserContext);

    const windowWidth = Dimensions.get("window").width;

    return (
        <Container>
            <TopBar
                style={{
                    paddingTop:
                        Platform.OS === "android" ? StatusBar.currentHeight : 0,
                }}
            >
                <ProfilePhotoBorder
                    style={{
                        borderRadius: windowWidth * 0.125,
                        width: windowWidth * 0.125,
                        height: windowWidth * 0.125,
                    }}
                >
                    <ProfilePhotoContainer
                        style={{
                            borderRadius: windowWidth * 0.125 * 0.9,
                            width: windowWidth * 0.125 * 0.9,
                            height: windowWidth * 0.125 * 0.9,
                        }}
                    >
                        <ProfilePhoto
                            source={
                                user.profilePhotoUrl === "default"
                                    ? require("../../assets/defaultProfilePhoto.jpg")
                                    : { uri: user.profilePhotoUrl }
                            }
                        />
                    </ProfilePhotoContainer>
                </ProfilePhotoBorder>

                <Text large bold color="#1c4068">
                    {user.username}
                </Text>

                <TO
                    onPress={() => {
                        navigation.navigate("Settings");
                    }}
                >
                    <MaterialCommunityIcons
                        name="cog"
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

const ProfilePhotoBorder = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    background-color: #1c4068;
`;

const ProfilePhotoContainer = styled.SafeAreaView`
    justify-content: center;
    overflow: hidden;
    align-items: center;
`;

const ProfilePhoto = styled.Image`
    width: 100%;
    height: 100%;
`;

const TO = styled.TouchableOpacity``;
