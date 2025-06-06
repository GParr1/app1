import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile} from "firebase/auth";
import {auth} from "../firebaseConfig"
import {login, logout} from "../state/auth/reducer";
import {dispatch} from "../state/store";

export const authUpdateProfile = async (currentUser) => {
    try {
        await updateProfile(auth.currentUser, {
            displayName: `${currentUser.firstName} ${currentUser.lastName}`,
            ...currentUser
        });
        dispatch(login(auth.currentUser));
        return true;
    } catch (err) {
        return false
    }
};
export const doSignOut = async (currentUser) => {
    try {
        await signOut(auth).catch((error) => console.error("Logout error", error));
        dispatch(logout());
        return true;
    } catch (err) {
        return false
    }
};
export const doSignInWithEmailAndPassword = async ({email, password}) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        dispatch(login(auth.currentUser));
        //dispatch(logout());
        return true;
    } catch (err) {
        return false
    }
};
export const doCreateUserWithEmailAndPassword = async ({account}) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, account.email, account.password);
        await updateProfile(userCredential.user, {
            displayName: `${account.firstName} ${account.lastName}`,
            firstName:`${account.firstName}`,
            lastName:`${account.lastName}`
        });
        dispatch(login(auth.currentUser));
        //dispatch(logout());
        return true;
    } catch (err) {
        return false
    }
};