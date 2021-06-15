import React, { useContext, useState, useRef, useEffect } from "react";
import { Platform, StatusBar, Dimensions, Keyboard } from "react-native";
import styled from "styled-components";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import LottieView from "lottie-react-native";

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

    const getSearchResults = async () => {
        setLoading(true);

        let res;

        res = await firebase.searchUsers(search, user.username);

        if (res) {
            setSearchResults(res);
            setLoading(false);
        } else setUser({ isLoggedIn: null });
    };

    const renderSearchResult = ({ item }) => {
        return <Text center>{item.username}</Text>;
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
                    <TO onPress={navigation.goBack}>
                        <MaterialCommunityIcons
                            name="arrow-left"
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
                            if (search) getSearchResults();
                        }}
                        placeholder="username"
                        style={{
                            color: "#1c4068",
                            borderBottomWidth: windowHeight / 700,
                            borderBottomColor: "#1c4068",
                        }}
                        textAlign="center"
                        value={search}
                    />

                    <TO disabled={!search} onPress={() => setSearch("")}>
                        <MaterialCommunityIcons
                            name="close"
                            size={windowWidth / 8}
                            color="#1c4068"
                            style={{ opacity: !search ? 0 : null }}
                        />
                    </TO>
                </TopBar>

                <SearchContentContainer>
                    {loading ? (
                        <LottieView
                            source={require("../../assets/loadingAnimation2Primary.json")}
                            autoPlay
                            loop
                        />
                    ) : !search ? (
                        <Text large bold>
                            Enter Search
                        </Text>
                    ) : searchResults.length === 0 ? (
                        <Text large bold>
                            No Results
                        </Text>
                    ) : (
                        <SearchResults
                            data={searchResults}
                            keyExtractor={(item) => item.uid}
                            renderItem={renderSearchResult}
                        />
                    )}
                </SearchContentContainer>
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

const SearchContentContainer = styled.SafeAreaView`
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
`;

const SearchResults = styled.FlatList`
    width: 100%;
    height: 100%;
`;
