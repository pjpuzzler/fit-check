import React, { useContext, useState } from "react";
import { Platform, StatusBar, Dimensions, Keyboard } from "react-native";
import styled from "styled-components";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import { UserContext } from "../context/UserContext";
import { FirebaseContext } from "../context/FirebaseContext";

import Text from "../components/Text";

export default SearchScreen = ({ navigation }) => {
    const [user, setUser] = useContext(UserContext);
    const firebase = useContext(FirebaseContext);

    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;

    const submitSearch = async () => {
        let res;

        res = await firebase.searchUsers(search);

        console.log(typeof res);

        if (!res) setUser({ isLoggedIn: null });
    };

    return (
        <TWF onPress={Keyboard.dismiss}>
            <Container>
                <TopBar
                    style={{
                        paddingTop:
                            Platform.OS === "android"
                                ? StatusBar.currentHeight
                                : 0,
                    }}
                >
                    <TO
                        onPress={
                            search ? () => setSearch("") : navigation.goBack
                        }
                    >
                        <MaterialCommunityIcons
                            name={search ? "close" : "arrow-left"}
                            size={windowWidth / 8}
                            color="#1c4068"
                        />
                    </TO>

                    <SearchBar
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoFocus={true}
                        fontSize={windowWidth / 16}
                        maxLength={15}
                        onChangeText={(search) => {
                            setSearch(search.trim());
                        }}
                        onSubmitEditing={submitSearch}
                        placeholder="search user"
                        style={{
                            color: "#1c4068",
                            borderBottomWidth: windowHeight / 700,
                            borderBottomColor: "#1c4068",
                        }}
                        textAlign="center"
                        value={search}
                    />

                    <TO onPress={submitSearch} disabled={!search}>
                        <MaterialCommunityIcons
                            name="check"
                            size={windowWidth / 8}
                            color="#1c4068"
                            style={{
                                opacity: !search ? 0 : null,
                            }}
                        />
                    </TO>
                </TopBar>
            </Container>
        </TWF>
    );
};

const TWF = styled.TouchableWithoutFeedback``;

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

const TO = styled.TouchableOpacity`
    align-items: center;
`;

const SearchBar = styled.TextInput`
    width: 60%;
`;

const Container2 = styled.SafeAreaView`
    width: 100%;
    flex-direction: row;
`;
