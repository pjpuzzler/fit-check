import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Dimensions } from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import { UserContext } from "../context/UserContext";
import { FirebaseContext } from "../context/FirebaseContext";

import Text from "../components/Text";

export default SelectSexScreen = () => {
    const [sex, setSex] = useState("");
    const [loading, setLoading] = useState(false);

    const [user, setUser] = useContext(UserContext);
    const firebase = useContext(FirebaseContext);

    const windowHeight = Dimensions.get("window").height;

    const continue_ = async () => {
        setLoading(true);

        if (sex) {
            setUser((state) => ({ ...state, sex }));

            await firebase.updateData({ sex });
        }

        setLoading(false);
    };

    return (
        <TWF
            onPress={() => {
                setSex("");
            }}
        >
            <Container>
                <Container2>
                    <Text bold>Select Type of Clothing</Text>
                    <Text small>(This can be changed later)</Text>
                    <Container3>
                        <BothContainer>
                            <IconContainer
                                onPress={() => {
                                    setSex(sex === "b" ? "" : "b");
                                }}
                            >
                                <MaterialCommunityIcons
                                    name="gender-male-female"
                                    size={windowHeight / 5.5}
                                    color={sex === "b" ? "#1c4058" : "#666666"}
                                />
                            </IconContainer>
                        </BothContainer>
                        <MFContainer>
                            <IconContainer
                                onPress={() => {
                                    setSex(sex === "m" ? "" : "m");
                                }}
                            >
                                <MaterialCommunityIcons
                                    name="gender-male"
                                    size={windowHeight / 5.5}
                                    color={sex === "m" ? "#1c4068" : "#666666"}
                                />
                            </IconContainer>
                            <IconContainer
                                onPress={() => {
                                    setSex(sex === "f" ? "" : "f");
                                }}
                            >
                                <MaterialCommunityIcons
                                    name="gender-female"
                                    size={windowHeight / 5.5}
                                    color={sex === "f" ? "#1c4068" : "#666666"}
                                />
                            </IconContainer>
                        </MFContainer>
                    </Container3>
                    <ContinueButton
                        style={{
                            borderRadius: windowHeight / 30,
                            opacity: loading || !sex ? 0.5 : null,
                        }}
                        onPress={continue_}
                        disabled={loading || !sex}
                    >
                        {loading ? (
                            <Loading />
                        ) : (
                            <Text bold center color="#ffffff">
                                Continue
                            </Text>
                        )}
                    </ContinueButton>
                </Container2>
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
`;

const Container2 = styled.SafeAreaView`
    align-items: center;
    justify-content: center;
    width: 100%;
`;

const Container3 = styled.SafeAreaView`
    align-items: center;
    justify-content: center;
    width: 90%;
    height: 60%;
    margin: 5% 0;
`;

const BothContainer = styled.SafeAreaView`
    align-items: center;
    justify-content: center;
    height: 50%;
`;

const MFContainer = styled.SafeAreaView`
    justify-content: space-around;
    width: 100%;
    height: 50%;
    flex-direction: row;
`;

const IconContainer = styled.TouchableOpacity``;

const ContinueButton = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 12%;
    background-color: #1c4068;
`;

const Loading = styled.ActivityIndicator.attrs((props) => ({
    size: "large",
}))``;
