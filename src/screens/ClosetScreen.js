import React, { useContext, useState, useEffect } from "react";
import {
    Platform,
    StatusBar,
    Dimensions,
    BackHandler,
    Alert,
} from "react-native";
import styled from "styled-components";
import {
    MaterialCommunityIcons,
    FontAwesome5,
} from "react-native-vector-icons";
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
        user.profilePhotoUrl !== "default" ? user.profilePhotoUrl : ""
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
    }, []);

    const cancel = () => {
        if (uri !== user.profilePhotoUrl)
            setUri(
                user.profilePhotoUrl !== "default" ? user.profilePhotoUrl : ""
            );
        setProfileOverlay(false);
    };

    const confirm = async () => {
        setLoading(true);

        if (user.profilePhotoUrl !== "default") {
            const success = await firebase.deleteProfilePhoto(
                user.profilePhotoUrl
            );

            if (!success) {
                setUser((state) => ({ ...state, isLoggedIn: null }));
                return;
            }
        }

        let profilePhotoUrl = uri
            ? await firebase.uploadProfilePhoto(uri)
            : "default";

        if (profilePhotoUrl) {
            setUser((state) => ({ ...state, profilePhotoUrl }));

            const updated = await firebase.updateData(user.uid, {
                profilePhotoUrl,
            });

            if (!updated) {
                setUser((state) => ({ ...state, isLoggedIn: null }));
                return;
            }
        } else {
            setUser((state) => ({ ...state, isLoggedIn: null }));
            return;
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
                ],
                { cancelable: true }
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
                        backgroundColor: user.premium ? "#ffd700" : "#18d299",
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
                                user.profilePhotoUrl !== "default"
                                    ? { uri: user.profilePhotoUrl }
                                    : require("../../assets/defaultProfilePhoto.jpg")
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
                <Container
                    style={{
                        position: "absolute",
                        justifyContent: "center",
                        backgroundColor: null,
                    }}
                >
                    <TWF onPress={cancel}>
                        <ProfileOverlayBackground />
                    </TWF>

                    <ProfileOverlay style={{ borderRadius: windowWidth / 20 }}>
                        <TopBar>
                            <TO onPress={cancel}>
                                <MaterialCommunityIcons
                                    name="close"
                                    size={windowWidth / 8}
                                    color="#1c4068"
                                />
                            </TO>

                            <Text
                                color={user.premium ? "#ffd700" : "#18d299"}
                                style={{
                                    fontWeight: user.premium ? "700" : "500",
                                    fontSize:
                                        windowWidth /
                                        (11 + user.username.length),
                                }}
                            >
                                {user.username}
                            </Text>

                            <TO
                                onPress={
                                    uri !== user.profilePhotoUrl &&
                                    !(
                                        !uri &&
                                        user.profilePhotoUrl === "default"
                                    )
                                        ? confirm
                                        : () => navigation.navigate("Premium")
                                }
                                disabled={
                                    (uri === user.profilePhotoUrl ||
                                        (uri === "" &&
                                            user.profilePhotoUrl ===
                                                "default")) &&
                                    user.premium
                                }
                            >
                                <MaterialCommunityIcons
                                    name={
                                        uri !== user.profilePhotoUrl &&
                                        !(
                                            !uri &&
                                            user.profilePhotoUrl === "default"
                                        )
                                            ? "check"
                                            : "crown"
                                    }
                                    size={windowWidth / 8}
                                    color={
                                        uri !== user.profilePhotoUrl &&
                                        !(
                                            !uri &&
                                            user.profilePhotoUrl === "default"
                                        )
                                            ? "#1c4068"
                                            : "#ffd700"
                                    }
                                    style={{
                                        opacity:
                                            (uri === user.profilePhotoUrl ||
                                                (uri === "" &&
                                                    user.profilePhotoUrl ===
                                                        "default")) &&
                                            user.premium
                                                ? 0
                                                : null,
                                    }}
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
                                        backgroundColor: user.premium
                                            ? "#ffd700"
                                            : "#18d299",
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
                                                    uri !== "default"
                                                        ? { uri }
                                                        : require("../../assets/defaultProfilePhoto.jpg")
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
                                        <Text
                                            large
                                            color={
                                                user.premium
                                                    ? "#ffd700"
                                                    : "#18d299"
                                            }
                                        >
                                            {user.followers}
                                        </Text>
                                    </StatContainer>
                                    <StatContainer>
                                        <Text>Downloads</Text>
                                        <Text
                                            large
                                            color={
                                                user.premium
                                                    ? "#ffd700"
                                                    : "#18d299"
                                            }
                                        >
                                            {user.downloads}
                                        </Text>
                                    </StatContainer>
                                </StatsContainer>

                                <TO
                                    onPress={() =>
                                        navigation.navigate("Following")
                                    }
                                >
                                    <Text heavy margin="8% 0 0" color="#18d299">
                                        Following ({user.following.length})
                                    </Text>
                                </TO>

                                <TO>
                                    <Text heavy margin="8% 0 0" color="#ffd700">
                                        {user.coins} coins
                                    </Text>
                                </TO>
                            </ProfileOverlayContent>
                        )}
                    </ProfileOverlay>
                </Container>
            ) : null}
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

const ProfilePhotoBorder = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
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

const TWF = styled.TouchableWithoutFeedback``;

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
