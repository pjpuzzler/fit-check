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

    createUser: async (username, email, password) => {
        const [success, res] = await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password).then(userCredential => [true, userCredential.user]).catch(error => [false, error]);
        
        if (!success) return [success, res];
        
        try {
            const uid = res.uid;
            
            await db.collection("users").doc(uid).set({
                following: [],
                outfits: [],
                sex: "",
                username: user.username,
                wardrobe: [],
            });

            return [success, null];
        } catch (error) {
            currentUser.delete();
            console.log("Error @createUser:", error.message);
            return [false, null];
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
