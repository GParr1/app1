import {updateProfile} from "firebase/auth";
import {auth} from "../firebaseConfig"
export const authUpdateProfile = async (currentUser) => {
    try {
        await updateProfile(auth.currentUser, {
            displayName: `${currentUser.firstName} ${currentUser.lastName}`,
            ...currentUser
        });
        return true;
    } catch (err) {
        return false
    }
};