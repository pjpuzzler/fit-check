import React, { createContext } from "react";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import config from "../config/firebase";

const FirebaseContext = createContext();

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const db = firebase.firestore();

const Firebase = {
    getCurrentUser: () => {
        let currentUser = null;

        try {
            currentUser = firebase.auth().currentUser;
        } catch (error) {
            console.log("Error @getCurrentUser:", error.message);
        } finally {
            return currentUser;
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
                downloads: 0,
                followers: 0,
                following: [],
                outfits: [],
                profilePhotoUrl: "",
                sex: "",
                username,
                wardrobe: [],
            });

            success = true;
        } catch (error) {
            console.log("Error @createUser:", error.message);
            await Firebase.deleteAccount();
        } finally {
            return [success, null];
        }
    },

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
            const photo = await Firebase.getBlob(uri);
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

    getBlob: async (uri) => {
        return await new Promise((resolve, reject) => {
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
    },

    getUserInfo: async (uid) => {
        let userInfo = null;

        try {
            const user = await db.collection("users").doc(uid).get();

            if (user.exists) userInfo = user.data();
        } catch (error) {
            console.log("Error @getUserInfo:", error.message);
        } finally {
            return userInfo;
        }
    },

    updateData: async (dataObj) => {
        let success = false;

        try {
            const currentUser = Firebase.getCurrentUser();

            if (currentUser) {
                await db
                    .collection("users")
                    .doc(currentUser.uid)
                    .update(dataObj);

                success = true;
            }
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
        let success = false;

        try {
            const currentUser = Firebase.getCurrentUser();

            if (currentUser) {
                const docRef = db.collection("users").doc(currentUser.uid);
                const doc = await docRef.get();

                if (doc.exists) await docRef.delete();

                await currentUser.delete();
                success = true;
            }
        } catch (error) {
            console.log("Error @deleteAccount:", error.message);
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
