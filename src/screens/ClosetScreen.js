import React, { useContext, useState, useEffect } from "react";
import {
    Platform,
    StatusBar,
    Dimensions,
    BackHandler,
    Alert,
} from "react-native";
import styled from "styled-components";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import * as ImagePicker from "expo-image-picker";
import LottieView from "lottie-react-native";

import { UserContext } from "../context/UserContext";
import { FirebaseContext } from "../context/FirebaseContext";

import Text from "../components/Text";

export default ClosetScreen = ({ navigation }) => {
    const [user, setUser] = useContext(UserContext);
    const firebase = useContext(FirebaseContext);

    const [profileOverlay, setProfileOverlay] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uri, setUri] = useState(
        user.profilePhotoUrl === "default" ? "" : user.profilePhotoUrl
    );

    const windowWidth = Dimensions.get("window").width;

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => {
                if (profileOverlay) {
                    cancel();
                    return true;
                }
            }
        );

        return () => backHandler.remove();
    });

    const cancel = () => {
        setUri(user.profilePhotoUrl);
        setProfileOverlay(false);
    };

    const confirm = async () => {
        setLoading(true);

        if (uri !== user.profilePhotoUrl) {
            if (user.profilePhotoUrl !== "default")
                await firebase.deleteProfilePhoto(user.profilePhotoUrl);

            let profilePhotoUrl;

            if (uri) {
                profilePhotoUrl = await firebase.uploadProfilePhoto(uri);
            } else profilePhotoUrl = "default";

            if (profilePhotoUrl) {
                setUser((state) => ({ ...state, profilePhotoUrl }));

                const updated = await firebase.updateData({ profilePhotoUrl });

                if (!updated) {
                    setUser({ isLoggedIn: null });
                    return;
                }
            } else {
                setUser({ isLoggedIn: null });
                return;
            }
        }

        setLoading(false);
        setProfileOverlay(false);
    };

    const addImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });

        if (!result.cancelled) {
            setUri(result.uri);
        }
    };

    const removeImage = async () => {
        const res = await removeImageAlert();

        if (res) setUri("");
    };

    const removeImageAlert = () => {
        return new Promise((resolve, _) => {
            Alert.alert(
                "Remove Image",
                "Are you sure you want to remove this image?",
                [
                    {
                        text: "NO",
                        onPress: () => resolve(false),
                        style: "cancel",
                    },
                    {
                        text: "YES",
                        onPress: () => resolve(true),
                    },
                ]
            );
        });
    };

    return (
        <Container>
            <TopBar
                style={{
                    paddingTop:
                        Platform.OS === "android" ? StatusBar.currentHeight : 0,
                }}
            >
                <ProfilePhotoBorder
                    onPress={() => setProfileOverlay(true)}
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
                    My Closet
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

            {profileOverlay ? (
                <ProfileOverlayBackground>
                    <ProfileOverlay style={{ borderRadius: windowWidth / 20 }}>
                        <TopBar>
                            <TO onPress={cancel}>
                                <MaterialCommunityIcons
                                    name="close"
                                    size={windowWidth / 8}
                                    color="#1c4068"
                                />
                            </TO>

                            <Text large bold color="#1c4068">
                                {user.username}
                            </Text>

                            <TO onPress={confirm}>
                                <MaterialCommunityIcons
                                    name="check"
                                    size={windowWidth / 8}
                                    color="#1c4068"
                                />
                            </TO>
                        </TopBar>

                        {loading ? (
                            <LottieView
                                source={require("../../assets/loadingAnimation2Primary.json")}
                                autoPlay
                                loop
                            />
                        ) : (
                            <ProfileOverlayContent>
                                <ProfilePhotoBorder
                                    onPress={addImage}
                                    onLongPress={removeImage}
                                    style={{
                                        borderRadius: windowWidth * 0.6 * 0.75,
                                        width: windowWidth * 0.6 * 0.75,
                                        height: windowWidth * 0.6 * 0.75,
                                        marginTop: "10%",
                                    }}
                                >
                                    <ProfilePhotoContainer
                                        style={{
                                            borderRadius:
                                                windowWidth * 0.6 * 0.75 * 0.9,
                                            width:
                                                windowWidth * 0.6 * 0.75 * 0.9,
                                            height:
                                                windowWidth * 0.6 * 0.75 * 0.9,
                                            backgroundColor: !uri
                                                ? "#666666"
                                                : null,
                                        }}
                                    >
                                        {uri ? (
                                            <ProfilePhoto
                                                source={
                                                    uri === "default"
                                                        ? require("../../assets/defaultProfilePhoto.jpg")
                                                        : { uri }
                                                }
                                            />
                                        ) : (
                                            <MaterialCommunityIcons
                                                size={(windowWidth * 3) / 48}
                                                name="image-plus"
                                                color="#ffffff"
                                            />
                                        )}
                                    </ProfilePhotoContainer>
                                </ProfilePhotoBorder>

                                <StatsContainer>
                                    <StatContainer>
                                        <Text>Followers</Text>
                                        <Text large>{user.followers}</Text>
                                    </StatContainer>
                                    <StatContainer>
                                        <Text>Downloads</Text>
                                        <Text large>{user.downloads}</Text>
                                    </StatContainer>
                                </StatsContainer>

                                <TO>
                                    <Text heavy margin="10% 0 0">
                                        Following
                                    </Text>
                                </TO>
                            </ProfileOverlayContent>
                        )}
                    </ProfileOverlay>
                </ProfileOverlayBackground>
            ) : null}
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

const ProfileOverlayBackground = styled.SafeAreaView`
    position: absolute;
    background-color: #00000040;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
`;

const ProfileOverlay = styled.SafeAreaView`
    background-color: #ffffff;
    width: 75%;
    height: 75%;
    align-items: center;
`;

const ProfileOverlayContent = styled.SafeAreaView`
    align-items: center;
`;

const StatsContainer = styled.SafeAreaView`
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 10%;
    width: 100%;
`;

const StatContainer = styled.SafeAreaView`
    align-items: center;
`;