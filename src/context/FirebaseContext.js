import React, { createContext } from "react";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import config from "../config/firebase";

const FirebaseContext = createContext();

if (!firebase.apps.length) firebase.initializeApp(config);

const db = firebase.firestore();

const Firebase = {
    getCurrentUser: () => {
        let success = false,
            currentUser = null;

        try {
            currentUser = firebase.auth().currentUser;

            success = true;
        } catch (error) {
            console.log("Error @getCurrentUser:", error.message);
        } finally {
            return [success, currentUser];
        }
    },

    usernameIsAvailable: async (username) => {
        let available = null;

        try {
            const snapshot = await db
                .collection("users")
                .where("username", "==", username)
                .get();

            available = snapshot.empty;
        } catch (error) {
            console.log("Error @usernameIsAvailable:", erorr.message);
        } finally {
            return available;
        }
    },

    createUser: async (username, email, password) => {
        let res;

        try {
            res = await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password);
        } catch (error) {
            console.log("Error @createUser:", error.message);

            return [false, error];
        }

        let success = false;
        const uid = res.user.uid;

        try {
            await db.collection("users").doc(uid).set({
                coins: 0,
                colors: [],
                downloads: 0,
                followers: 0,
                following: [],
                lastDailyCheckIn: Firebase.getTimestamp(),
                palettes: [],
                premium: false,
                profilePhotoUrl: "",
                sex: "",
                sharedPalettes: [],
                username,
            });

            success = true;
        } catch (error) {
            console.log("Error @createUser:", error.message);

            await Firebase.deleteAccount();
        } finally {
            return [success, null];
        }
    },

    getTimestamp: () => firebase.firestore.Timestamp.now(),

    signIn: async (email, password) => {
        let success = false,
            err = null;

        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);

            success = true;
        } catch (error) {
            console.log("Error @signIn:", error.message);

            err = error;
        } finally {
            return [success, err];
        }
    },

    uploadProfilePhoto: async (uri) => {
        let url = null;

        try {
            const photo = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();

                xhr.onload = () => {
                    resolve(xhr.response);
                };

                xhr.onerror = () => {
                    reject(new TypeError("Network request failed"));
                };

                xhr.responseType = "blob";
                xhr.open("GET", uri, true);
                xhr.send(null);
            });
            const uid = Firebase.getCurrentUser().uid;
            const imageRef = firebase.storage().ref("profilePhotos").child(uid);

            await imageRef.put(photo);

            url = await imageRef.getDownloadURL();
        } catch (error) {
            console.log("Error @uploadProfilePhoto:", error.message);
        } finally {
            return url;
        }
    },

    getUserInfo: async (uid) => {
        let userInfo = null;

        try {
            const userDoc = await db.collection("users").doc(uid).get();

            if (userDoc.exists) userInfo = userDoc.data();
        } catch (error) {
            console.log("Error @getUserInfo:", error.message);
        } finally {
            return userInfo;
        }
    },

    updateData: async (uid, dataObj) => {
        let success = false;

        try {
            await db.collection("users").doc(uid).update(dataObj);

            success = true;
        } catch (error) {
            console.log("Error @updateData:", error.message);
        } finally {
            return success;
        }
    },

    logOut: async () => {
        let success = false;

        try {
            await firebase.auth().signOut();

            success = true;
        } catch (error) {
            console.log("Error @logOut:", error.message);
        } finally {
            return success;
        }
    },

    deleteAccount: async () => {
        try {
            const currentUser = Firebase.getCurrentUser();

            if (currentUser) {
                const docRef = db.collection("users").doc(currentUser.uid);
                const doc = await docRef.get();

                if (doc.exists) {
                    const profilePhotoUrl = doc.data().profilePhotoUrl;
                    if (profilePhotoUrl !== "default") {
                        const success = await Firebase.deleteProfilePhoto(
                            profilePhotoUrl
                        );

                        if (!success) return;
                    }

                    await docRef.delete();
                }

                await currentUser.delete();
            }
        } catch (error) {
            console.log("Error @deleteAccount:", error.message);
        }
    },

    deleteProfilePhoto: async (url) => {
        let success = false;

        try {
            const ref = firebase.storage().refFromURL(url);

            await ref.delete();

            success = true;
        } catch (error) {
            console.log("Error @deleteProfilePhoto:", error.message);
        } finally {
            return success;
        }
    },

    searchUsers: async (search, username) => {
        let res = null;

        try {
            let tempRes = await db
                .collection("users")
                .where("username", ">=", search)
                .where("username", "<=", search + "~")
                .where("username", "!=", username)
                .orderBy("username")
                .limit(5)
                .get();
            tempRes = tempRes.docs.map((doc) => ({
                ...doc.data(),
                uid: doc.id,
            }));

            res = tempRes;
        } catch (error) {
            console.log("Error @searchUsers:", error.message);
        } finally {
            return res;
        }
    },

    searchFollowing: async (search, following, shown = []) => {
        let res = null;

        try {
            const tempRes = [];

            for (let i = 0; i < following.length && tempRes.length < 10; i++) {
                const uid = following[i];

                if (shown.includes(uid)) continue;

                const data = (
                    await db.collection("users").doc(uid).get()
                ).data();

                if (data.username >= search && data.username <= search + "~")
                    tempRes.push({
                        ...data,
                        uid,
                    });
            }

            res = tempRes;
        } catch (error) {
            console.log("Error @searchUsers:", error.message);
        } finally {
            return res;
        }
    },

    reauthenticate: async (email, password) => {
        let success = false,
            err = null;

        try {
            const currentUser = Firebase.getCurrentUser();
            const credential = firebase.auth.EmailAuthProvider.credential(
                email,
                password
            );

            await currentUser.reauthenticateWithCredential(credential);

            success = true;
        } catch (error) {
            console.log("Error @reauthenticate:", error.message);

            err = error;
        } finally {
            return [success, err];
        }
    },

    unfollow: async (uid1, uid2) => {
        let following = null;

        try {
            const userRef1 = db.collection("users").doc(uid1);
            const userRef2 = db.collection("users").doc(uid2);

            following = await db.runTransaction(async (t) => {
                const userDoc1 = await t.get(userRef1);
                const userData1 = userDoc1.data();

                if (!userData1.following.includes(uid2)) return;

                const userDoc2 = await t.get(userRef2);

                following = userData1.following.filter(
                    (followingUid) => followingUid !== uid2
                );

                t.update(userRef1, {
                    following,
                });

                t.update(userRef2, {
                    followers: userDoc2.data().followers - 1,
                });

                return following;
            });
        } catch (error) {
            console.log("Error @unfollow:", error.message);
        } finally {
            return following;
        }
    },

    follow: async (uid1, uid2) => {
        let following = null;

        try {
            const userRef1 = db.collection("users").doc(uid1);
            const userRef2 = db.collection("users").doc(uid2);

            following = await db.runTransaction(async (t) => {
                const userDoc1 = await t.get(userRef1);
                const userData1 = userDoc1.data();

                if (userData1.following.includes(uid2)) return;

                const userDoc2 = await t.get(userRef2);

                following = [...userData1.following, uid2];

                t.update(userRef1, {
                    following,
                });

                t.update(userRef2, {
                    followers: userDoc2.data().followers + 1,
                });

                return following;
            });
        } catch (error) {
            console.log("Error @follow:", error.message);
        } finally {
            return following;
        }
    },

    savePalette: async (uid, palette) => {
        let palettes = null;

        try {
            const userRef = db.collection("users").doc(uid);

            palettes = await db.runTransaction(async (t) => {
                const userDoc = await t.get(userRef);
                const userData = userDoc.data();

                palettes = [...userData.palettes, palette];

                t.update(userRef, {
                    palettes,
                });

                return palettes;
            });
        } catch (error) {
            console.log("Error @savePalette", error.message);
        } finally {
            return palettes;
        }
    },

    sharePalette: async (uid, palette) => {
        let success = false;

        try {
            await db.collection("marketplace").add({
                downloaded: [],
                palette,
                timeShared: Firebase.getTimestamp(),
                uid,
            });

            success = true;
        } catch (error) {
            console.log("Error @sharePalette:", error.message);
        } finally {
            return success;
        }
    },

    unsharePalette: async (pid) => {
        let success = false;

        try {
            await db.collection("marketplace").doc(pid).delete();

            success = true;
        } catch (error) {
            console.log("Error @unsharePalette:", error.message);
        } finally {
            return success;
        }
    },
};

const FirebaseProvider = (props) => {
    return (
        <FirebaseContext.Provider value={Firebase}>
            {props.children}
        </FirebaseContext.Provider>
    );
};

export { FirebaseContext, FirebaseProvider };
