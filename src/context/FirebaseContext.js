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
        const res;
        
        try {
            res = await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password);
        } catch (error) {
            return [false, error]
        }
        
        const success;
        
        try {
            const uid = res.user.uid;
            
            await db.collection("users").doc(uid).set({
                following: [],
                outfits: [],
                sex: "",
                username: user.username,
                wardrobe: [],
            });

            success = true;
        } catch (error) {
            currentUser.delete();
            console.log("Error @createUser:", error.message);
            success = false;
        } finally {
            return [success, null];
        }
    },

    signIn: async (email, password) => {
        const success, res;
        
        try {
            res = await firebase.auth().signInWithEmailAndPassword(email, password);
            success = true;
        } catch (error) {
            res = error;
            success = false;
        } finally {
            return [success, res];
        }
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
