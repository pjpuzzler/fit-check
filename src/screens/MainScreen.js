import React, { useContext } from "react";
import { Platform, StatusBar } from "react-native";
import styled from "styled-components";

import { UserContext } from "../context/UserContext";
import { FirebaseContext } from "../context/FirebaseContext";

import Text from "../components/Text";

import Top from "../../assets/clothes/Top";

export default MainScreen = () => {
    const [user, setUser] = useContext(UserContext);

    return (
        <Container>
            <TopBar
                style={{
                    paddingTop:
                        Platform.OS === "android" ? StatusBar.currentHeight : 0,
                }}
            ></TopBar>
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
    width: 100%;
    height: 10%;
    align-items: center;
`;
