import React, { createContext } from "react";
import firebase from "firebase";
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
                username: user.username,
                email: user.email,
            });

            delete user.password;

            return { ...user, uid };
        } catch (error) {
            currentUser.delete();
            console.log("Error @createUser:", error.message);
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
