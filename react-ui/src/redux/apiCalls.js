import { loginFailure, loginStart, loginSuccess, loginLoggedOut } from "./userRedux";
import { publicRequest } from "../requestMethods";

// LOGGING IN CALL
export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
    } catch(err) {
        dispatch(loginFailure());
    }
}

// LOGGING OUT CALL
export const logout = async (dispatch) => {
    dispatch(loginLoggedOut());
}

// REGISTER ACCOUNT CALL
export const register = async (user) => {
    try {
        const res = await publicRequest.post("/auth/register", user);
    } catch(err) {
        console.log(err);
    }
}