import * as actionTypes from './actionsTypes';
import axios from 'axios';



export const authStart = () => {
    return {
            type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token,userId) => {
    return {
            type: actionTypes.AUTH_SUCCESS,
            token,
            userId
    }
}

export const authFail = (error) => {
    return {
            type: actionTypes.AUTH_FAIL,
            error
    }
}

export const logout = () => {
    localStorage.clear();
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        },expirationTime * 1000)
    }
}

export const auth = (email,password,isSignUp) => {
    return dispatch => {
            dispatch(authStart());
            const authData = {email,password,returnSecureToken: true}
            let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDiFLvKB0Vs1kv_lGbpS_u_TZJnkWRGbKg';
            if(!isSignUp){
                url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDiFLvKB0Vs1kv_lGbpS_u_TZJnkWRGbKg';
            }
            axios.post(url,authData)
            .then(res => {
                const expDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('expirationDate',expDate)
                localStorage.setItem('userId', res.data.localId)
                dispatch(authSuccess(res.data.idToken, res.data.localId)) 
                dispatch(checkAuthTimeout(res.data.expiresIn))
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error))
            })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.AUTH_REDIRECT_PATH,
        path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) { dispatch(logout())}
        else {
            const expDate = new Date (localStorage.getItem('expirationDate'));
            if(expDate > new Date()) {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token,userId));
                dispatch(checkAuthTimeout((expDate.getTime() - new Date().getTime())/1000))
            } else {
                dispatch(logout());
            }
        }
    }
}