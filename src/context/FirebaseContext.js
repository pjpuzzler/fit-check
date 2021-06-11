import React, { createContext } from "react";
import { firebase } from "@firebase/app";
import "@firebase/firestore";
import "@firebase/auth";
import config from "../config/firebase";

const FirebaseContext = createContext();

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const db = firebase.firestore();

const Firebase = {
    getCurrentUser: () => {
        return firebase.auth().currentUser;
    },

    usernameIsAvailable: async (username) => {
        const snapshot = await db
            .collection("users")
            .where("username", "==", username)
            .get();

        return snapshot.empty;
    },

    emailIsInUse: async (email) => {
        const snapshot = await db
            .collection("users")
            .where("email", "==", email)
            .get();

        return !snapshot.empty;
    },

    createUser: async (user) => {
        try {
            await firebase
                .auth()
                .createUserWithEmailAndPassword(user.email, user.password);

            const currentUser = Firebase.getCurrentUser();
            const uid = currentUser.uid;

            await db.collection("users").doc(uid).set({
                email: user.email,
                outfits: [],
                sex: "",
                username: user.username,
                wardrobe: [],
            });

            delete user.password;

            return { ...user, uid };
        } catch (error) {
            currentUser.delete();
            console.log("Error @createUser:", error.message);
        }
    },

    signIn: async (email, password) => {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    },

    getUserInfo: async (uid) => {
        try {
            const user = await db.collection("users").doc(uid).get();

            if (user.exists) {
                return user.data();
            }
        } catch (error) {
            console.log("Error @getUserInfo:", error.message);
        }
    },

    updateData: async (dataObj) => {
        try {
            const uid = Firebase.getCurrentUser().uid;

            await db.collection("users").doc(uid).update(dataObj);
        } catch (error) {
            console.log("Error @updateData:", error.message);
        }
    },

    logOut: async () => {
        try {
            await firebase.auth().signOut();

            return true;
        } catch (error) {
            console.log("Error @logOut:", error.message);
        }

        return false;
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
