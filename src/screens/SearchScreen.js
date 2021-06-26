import React, { useContext, useState, useRef, useEffect } from "react";
import {
    Platform,
    StatusBar,
    Dimensions,
    Keyboard,
    Alert,
    BackHandler,
} from "react-native";
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
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [searchResultOverlayIndex, setSearchResultOverlayIndex] =
        useState(null);
    const [searchResultOverlayLoading, setSearchResultOverlayLoading] =
        useState(false);

    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;

    const searchBarRef = useRef(null);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => {
                if (searchResultOverlayIndex !== null) {
                    setSearchResultOverlayIndex(null);
                    return true;
                }
            }
        );

        return backHandler.remove;
    });

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () =>
            setTimeout(() => searchBarRef.current.focus(), 200)
        );

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        if (search) {
            setLoading(true);

            getSearchResults();
        } else setSearchResults([]);
    }, [search, user.following]);

    const getSearchResults = async () => {
        const res = await firebase.searchUsers(search, user.username);

        if (res) {
            setSearchResults(res);

            setLoading(false);
            setRefreshing(false);
        } else setUser((state) => ({ ...state, isLoggedIn: null }));
    };

    const renderSearchResult = ({ item, index }) => {
        return (
            <SearchResultContainer
                onPress={() => {
                    setSearchResultOverlayIndex(index);
                    Keyboard.dismiss();
                }}
                style={{
                    paddingTop: windowWidth / 20,
                    paddingBottom: windowWidth / 20,
                    paddingLeft: windowWidth / 20,
                    paddingRight: windowWidth / 20,
                }}
            >
                <ProfilePhotoBorder
                    style={{
                        borderRadius: windowWidth * 0.2,
                        width: windowWidth * 0.2,
                        height: windowWidth * 0.2,
                        backgroundColor: item.premium ? "#ffd700" : "#1c4068",
                    }}
                >
                    <ProfilePhotoContainer
                        style={{
                            borderRadius: windowWidth * 0.2 * 0.9,
                            width: windowWidth * 0.2 * 0.9,
                            height: windowWidth * 0.2 * 0.9,
                        }}
                    >
                        <ProfilePhoto
                            source={
                                !item.profilePhotoUrl ||
                                item.profilePhotoUrl === "default"
                                    ? require("../../assets/defaultProfilePhoto.jpg")
                                    : { uri: item.profilePhotoUrl }
                            }
                        />
                    </ProfilePhotoContainer>
                </ProfilePhotoBorder>

                <Text large bold margin="0 0 0 5%">
                    {item.username}
                </Text>
            </SearchResultContainer>
        );
    };

    const unfollow = async () => {
        const res = await unfollowAlert();

        if (!res) return;

        setSearchResultOverlayLoading(true);

        const following = await firebase.unfollow(
            user.uid,
            searchResults[searchResultOverlayIndex].uid
        );

        if (following) {
            setUser((state) => ({ ...state, following }));
            setSearchResultOverlayLoading(false);
        } else setUser((state) => ({ ...state, isLoggedIn: null }));
    };

    const unfollowAlert = () => {
        return new Promise((resolve, _) => {
            Alert.alert(
                "Unfollow",
                "Are you sure you want to unfollow this user?",
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

    const follow = async () => {
        setSearchResultOverlayLoading(true);

        const following = await firebase.follow(
            user.uid,
            searchResults[searchResultOverlayIndex].uid
        );

        if (following) {
            setUser((state) => ({ ...state, following }));
            setSearchResultOverlayLoading(false);
        } else setUser((state) => ({ ...state, isLoggedIn: null }));
    };

    return (
        <Container>
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
                            onChangeText={(newSearch) =>
                                setSearch(newSearch.trim())
                            }
                            placeholder="username"
                            ref={searchBarRef}
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
                        ) : (
                            <SearchResults
                                data={searchResults}
                                onRefresh={() => {
                                    setRefreshing(true);

                                    getSearchResults();
                                }}
                                initialNumToRender={5}
                                keyboardShouldPersistTaps="handled"
                                keyExtractor={(item) => item.uid}
                                ListEmptyComponent={
                                    !search ? (
                                        <Text large bold center margin="5% 0 0">
                                            Enter Search
                                        </Text>
                                    ) : (
                                        <Text large bold center margin="5% 0 0">
                                            No Results
                                        </Text>
                                    )
                                }
                                refreshing={refreshing}
                                renderItem={renderSearchResult}
                            />
                        )}
                    </SearchContentContainer>
                </Container>
            </TWF>

            {searchResultOverlayIndex !== null ? (
                <Container
                    style={{
                        position: "absolute",
                        justifyContent: "center",
                        backgroundColor: null,
                    }}
                >
                    <TWF onPress={() => setSearchResultOverlayIndex(null)}>
                        <SearchResultOverlayBackground />
                    </TWF>

                    <SearchResultOverlay
                        style={{ borderRadius: windowWidth / 20 }}
                    >
                        <TopBar>
                            <TO
                                onPress={() =>
                                    setSearchResultOverlayIndex(null)
                                }
                            >
                                <MaterialCommunityIcons
                                    name="close"
                                    size={windowWidth / 8}
                                    color="#1c4068"
                                />
                            </TO>

                            <Text
                                color={
                                    searchResults[searchResultOverlayIndex]
                                        .premium
                                        ? "#ffd700"
                                        : "#1c4068"
                                }
                                style={{
                                    fontWeight: searchResults[
                                        searchResultOverlayIndex
                                    ].premium
                                        ? "700"
                                        : "500",
                                    fontSize:
                                        windowWidth /
                                        (1.5 *
                                            searchResults[
                                                searchResultOverlayIndex
                                            ].username.length),
                                }}
                            >
                                {
                                    searchResults[searchResultOverlayIndex]
                                        .username
                                }
                            </Text>

                            <MaterialCommunityIcons
                                name="close"
                                size={windowWidth / 8}
                                style={{ opacity: 0 }}
                            />
                        </TopBar>

                        <SearchResultOverlayContent>
                            <ProfilePhotoBorder
                                style={{
                                    borderRadius: windowWidth * 0.6 * 0.75,
                                    width: windowWidth * 0.6 * 0.75,
                                    height: windowWidth * 0.6 * 0.75,
                                    marginTop: "10%",
                                    backgroundColor: searchResults[
                                        searchResultOverlayIndex
                                    ].premium
                                        ? "#ffd700"
                                        : "#1c4068",
                                }}
                            >
                                <ProfilePhotoContainer
                                    style={{
                                        borderRadius:
                                            windowWidth * 0.6 * 0.75 * 0.9,
                                        width: windowWidth * 0.6 * 0.75 * 0.9,
                                        height: windowWidth * 0.6 * 0.75 * 0.9,
                                    }}
                                >
                                    <ProfilePhoto
                                        source={
                                            !searchResults[
                                                searchResultOverlayIndex
                                            ].profilePhotoUrl ||
                                            searchResults[
                                                searchResultOverlayIndex
                                            ].profilePhotoUrl === "default"
                                                ? require("../../assets/defaultProfilePhoto.jpg")
                                                : {
                                                      uri: searchResults[
                                                          searchResultOverlayIndex
                                                      ].profilePhotoUrl,
                                                  }
                                        }
                                    />
                                </ProfilePhotoContainer>
                            </ProfilePhotoBorder>

                            <StatsContainer>
                                <StatContainer>
                                    <Text>Followers</Text>
                                    <Text
                                        large
                                        color={
                                            searchResults[
                                                searchResultOverlayIndex
                                            ].premium
                                                ? "#ffd700"
                                                : "#1c4068"
                                        }
                                    >
                                        {
                                            searchResults[
                                                searchResultOverlayIndex
                                            ].followers
                                        }
                                    </Text>
                                </StatContainer>
                                <StatContainer>
                                    <Text>Downloads</Text>
                                    <Text
                                        large
                                        color={
                                            searchResults[
                                                searchResultOverlayIndex
                                            ].premium
                                                ? "#ffd700"
                                                : "#1c4068"
                                        }
                                    >
                                        {
                                            searchResults[
                                                searchResultOverlayIndex
                                            ].downloads
                                        }
                                    </Text>
                                </StatContainer>
                            </StatsContainer>

                            <TO>
                                <Text large heavy margin="10% 0 0">
                                    Outfits
                                </Text>
                            </TO>

                            <FollowContainer
                                style={{
                                    borderRadius: windowWidth / 20,
                                    opacity: searchResultOverlayLoading
                                        ? 0.5
                                        : null,
                                }}
                                onPress={
                                    user.following.includes(
                                        searchResults[searchResultOverlayIndex]
                                            .uid
                                    )
                                        ? unfollow
                                        : follow
                                }
                                disabled={searchResultOverlayLoading}
                            >
                                {searchResultOverlayLoading ? (
                                    <LottieView
                                        source={require("../../assets/loadingAnimation2White.json")}
                                        autoPlay
                                        loop
                                    />
                                ) : (
                                    <MaterialCommunityIcons
                                        name={
                                            user.following.includes(
                                                searchResults[
                                                    searchResultOverlayIndex
                                                ].uid
                                            )
                                                ? "account-minus"
                                                : "account-plus"
                                        }
                                        size={windowWidth / 8}
                                        color="#ffffff"
                                    />
                                )}
                            </FollowContainer>
                        </SearchResultOverlayContent>
                    </SearchResultOverlay>
                </Container>
            ) : null}
        </Container>
    );
};

const TWF = styled.TouchableWithoutFeedback``;

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

const SearchResultContainer = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    background-color: #66666640;
`;

const ProfilePhotoBorder = styled.SafeAreaView`
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

const SearchResultOverlayBackground = styled.SafeAreaView`
    position: absolute;
    background-color: #00000040;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
`;

const SearchResultOverlay = styled.SafeAreaView`
    background-color: #ffffff;
    width: 75%;
    height: 75%;
    align-items: center;
`;

const SearchResultOverlayContent = styled.SafeAreaView`
    align-items: center;
    width: 100%;
    height: 100%;
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

const FollowContainer = styled.TouchableOpacity`
    margin-top: 10%;
    width: 75%
    height: 10%;
    align-items: center;
    justify-content: center;
    background-color: #1c4068;
`;
