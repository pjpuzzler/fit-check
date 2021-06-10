import React, { useState } from "react";
import { Platform, StatusBar, Dimensions } from "react-native";
import styled from "styled-components";

import { UserContext } from "../context/UserContext";
import { FirebaseContext } from "../context/FirebaseContext";

import Text from "../components/Text";

export default WardrobeScreen = ({ navigation }) => {
    const windowHeight = Dimensions.get("window").height;
    const windowWidth = Dimensions.get("window").width;

    return <Container></Container>;
};

const Container = styled.SafeAreaView`
    align-items: center;
    width: 100%;
    height: 100%;
`;
