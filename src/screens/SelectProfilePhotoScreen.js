import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Dimensions, Alert } from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import * as ImagePicker from "expo-image-picker";
import LottieView from "lottie-react-native";

import { UserContext } from "../context/UserContext";
import { FirebaseContext } from "../context/FirebaseContext";

import Text from "../components/Text";

export default SelectProfilePhotoScreen = () => {
    const [user, setUser] = useContext(UserContext);
    const firebase = useContext(FirebaseContext);

    const [uri, setUri] = useState("");
    const [loading, setLoading] = useState(false);

    const windowWidth = Dimensions.get("window").width;

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

    const continue_ = async () => {
        if (!uri) {
            const res = await noProfilePhotoAlert();

            if (!res) return;
        }

        setLoading(true);

        let profilePhotoUrl;

        if (uri) {
            profilePhotoUrl = await firebase.uploadProfilePhoto(uri);

            if (!profilePhotoUrl) {
                setUser((state) => ({ ...state, isLoggedIn: null }));
                return;
            }
        } else profilePhotoUrl = "default";

        setUser((state) => ({ ...state, profilePhotoUrl }));

        const updated = await firebase.updateData(user.uid, {
            profilePhotoUrl,
        });

        if (!updated) {
            setUser((state) => ({ ...state, isLoggedIn: null }));
            firebase.deleteProfilePhoto(profilePhotoUrl);
        }
    };

    const noProfilePhotoAlert = () => {
        return new Promise((resolve, _) => {
            Alert.alert(
                "No Profile Photo",
                "Are you sure you want to continue with no profile photo?",
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
            <TitleContainer>
                <Text large heavy center>
                    Profile Photo
                </Text>
                <Text small center>
                    (This can be changed later)
                </Text>
            </TitleContainer>
            <ProfilePhotoContainer
                disabled={loading}
                onPress={addImage}
                onLongPress={removeImage}
                style={{
                    borderRadius: windowWidth * 0.6,
                    width: windowWidth * 0.6,
                    height: windowWidth * 0.6,
                    backgroundColor: !uri ? "#666666" : null,
                }}
            >
                {uri ? (
                    <ProfilePhoto source={{ uri }} />
                ) : (
                    <MaterialCommunityIcons
                        size={windowWidth / 12}
                        name="image-plus"
                        color="#ffffff"
                    />
                )}
            </ProfilePhotoContainer>
            <ContinueButton
                style={{
                    borderRadius: windowWidth / 13.33,
                    opacity: loading ? 0.5 : null,
                }}
                onPress={continue_}
                disabled={loading}
            >
                {loading ? (
                    <LottieView
                        source={require("../../assets/loadingAnimation2White.json")}
                        autoPlay
                        loop
                    />
                ) : (
                    <Text bold center color="#ffffff">
                        Continue
                    </Text>
                )}
            </ContinueButton>
        </Container>
    );
};

const Container = styled.SafeAreaView`
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

const TitleContainer = styled.SafeAreaView`
    position: absolute;
    top: 10%;
`;

const ProfilePhotoContainer = styled.TouchableOpacity`
    justify-content: center;
    overflow: hidden;
    align-items: center;
`;

const ProfilePhoto = styled.Image`
    width: 100%;
    height: 100%;
`;

const ContinueButton = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    width: 75%;
    height: 10%;
    background-color: #18d299;
    position: absolute;
    bottom: 10%;
`;
