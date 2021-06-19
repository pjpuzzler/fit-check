import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Dimensions } from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import LottieView from "lottie-react-native";

import { UserContext } from "../context/UserContext";
import { FirebaseContext } from "../context/FirebaseContext";

import Text from "../components/Text";

export default SelectSexScreen = () => {
    const [user, setUser] = useContext(UserContext);
    const firebase = useContext(FirebaseContext);

    const [sex, setSex] = useState("");
    const [loading, setLoading] = useState(false);

    const windowWidth = Dimensions.get("window").width;

    const continue_ = async () => {
        setLoading(true);

        setUser((state) => ({ ...state, sex }));

        const updated = await firebase.updateData(user.uid, { sex });

        if (!updated) setUser((state) => ({ ...state, isLoggedIn: null }));
    };

    return (
        <TWF
            onPress={() => {
                setSex("");
            }}
        >
            <Container>
                <TitleContainer>
                    <Text large heavy center>
                        Preferred Clothing
                    </Text>
                    <Text small center>
                        (This can be changed later)
                    </Text>
                </TitleContainer>
                <TO
                    disabled={loading}
                    onPress={() => {
                        setSex(sex === "inter" ? "" : "inter");
                    }}
                >
                    <MaterialCommunityIcons
                        name="gender-male-female"
                        size={windowWidth / 2.25}
                        color={sex === "inter" ? "#b2acd8" : "#666666"}
                    />
                </TO>
                <MFContainer>
                    <TO
                        disabled={loading}
                        onPress={() => {
                            setSex(sex === "male" ? "" : "male");
                        }}
                    >
                        <MaterialCommunityIcons
                            name="gender-male"
                            size={windowWidth / 2.25}
                            color={sex === "male" ? "#6ca0dc" : "#666666"}
                        />
                    </TO>
                    <TO
                        disabled={loading}
                        onPress={() => {
                            setSex(sex === "female" ? "" : "female");
                        }}
                    >
                        <MaterialCommunityIcons
                            name="gender-female"
                            size={windowWidth / 2.25}
                            color={sex === "female" ? "#f8b9d4" : "#666666"}
                        />
                    </TO>
                </MFContainer>
                <ContinueButton
                    style={{
                        borderRadius: windowWidth / 20,
                        opacity: loading || !sex ? 0.5 : null,
                    }}
                    onPress={continue_}
                    disabled={loading || !sex}
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
        </TWF>
    );
};

const TWF = styled.TouchableWithoutFeedback``;

const Container = styled.SafeAreaView`
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
`;

const TitleContainer = styled.SafeAreaView`
    position: absolute;
    top: 10%;
`;

const MFContainer = styled.SafeAreaView`
    flex-direction: row;
`;

const TO = styled.TouchableOpacity``;

const ContinueButton = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    width: 75%;
    height: 10%;
    background-color: #18d299;
    position: absolute;
    bottom: 10%;
`;
