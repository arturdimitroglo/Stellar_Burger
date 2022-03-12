import { tokenExpired, unauthorized } from '../../utils/baseURL';
import mainApi from '../../utils/checkResponse';
import {
   setForgotPasswordState,
   setForgotPassword,
   setForgotPasswordSuccess,
   setForgotPasswordFailed,
   setResetPassword,
   setResetPasswordSuccess,
   setResetPasswordFailed,
   registrationUser,
   registrationUserSuccess,
   registrationUserFailed,
   setLogin,
   setLoginSuccess,
   setLoginFailed,
   sendUserInfo,
   sendUserInfoSuccess,
   sendUserInfoFailed,
   setLogout,
   setLogoutSuccess,
   setLogoutFailed,
   setGetUserInfo,
   setGetUserInfoSuccess,
   setGetUserInfoFailed,
   setRefreshToken,
   setRefreshTokenSuccess,
   setRefreshTokenFailed,
} from '../reducers/user';
import { AppDispatch } from '../store';

export const forgotPassword = (email) => {
   return (dispatch) => {
      dispatch(setForgotPassword())

      mainApi.sendEmail(email)
         .then(() => {
            dispatch(setForgotPasswordSuccess());
            dispatch(setForgotPasswordState(true))
         })
         .catch((err) => {
            dispatch(setForgotPasswordFailed())
         })
   }
}

export const resetPassword = (password, code) => {
   return (dispatch) => {
      dispatch(setResetPassword())

      mainApi.resetPassword(password, code)
         .then(() => {
            dispatch(setResetPasswordSuccess());
            dispatch(setForgotPasswordState(false))
         })
         .catch((err) => {
            setResetPasswordFailed();
         })
   }
}

export const registration = (email, name, password) => {
   return (dispatch) => {
      dispatch(registrationUser())

      mainApi.register(email, name, password)
         .then(res => {
            dispatch(registrationUserSuccess(res))
            localStorage.setItem('refreshToken', res.refreshToken)
         })
         .catch((err) => {
            dispatch(registrationUserFailed())
         })
   }
}

export const login = (email, password) => {
   return (dispatch) => {
      dispatch(setLogin())

      mainApi.login(email, password)
         .then(res => {
            dispatch(setLoginSuccess(res))
            localStorage.setItem('refreshToken', res.refreshToken)
         })
         .catch((err) => {
            dispatch(setLoginFailed())
            console.log(err)
         })
   }
}

export const sendUserData = (token, name, email, password) => {
   return (dispatch) => {
      dispatch(sendUserInfo())

      mainApi.sendUserInfo(token, name, email, password)
         .then((res) => {
            dispatch(sendUserInfoSuccess(res.user))
         })
         .catch((err) => {
            if (err === tokenExpired ) {
               dispatch(refreshToken(localStorage.getItem('refreshToken')))
            }

            dispatch(sendUserInfoFailed())
         })
   }
}

export const logout = (refreshToken) => {
   return (dispatch) => {
      dispatch(setLogout())

      mainApi.refreshToken(refreshToken)
         .then(() => {
            localStorage.removeItem('refreshToken');
            dispatch(setLogoutSuccess());
         })
         .catch((err) => {
            dispatch(setLogoutFailed())
         })
   }
}

export const getUserData = (token ) => {
   return (dispatch) => {
      dispatch(setGetUserInfo())

      mainApi.getUserData(token)
         .then((res) => {
            dispatch(setGetUserInfoSuccess(res.user))
         })
         .catch((err) => {
            if (err === tokenExpired || err === unauthorized) {
               dispatch(refreshToken(localStorage.getItem('refreshToken')))
            }
            dispatch(setGetUserInfoFailed())
         })
   }
}

const refreshToken = (refreshToken) => {
   return (dispatch) => {
      dispatch(setRefreshToken())

      mainApi.refreshToken(refreshToken)
         .then((res) => {
            localStorage.setItem('refreshToken', res.refreshToken)
            dispatch(setRefreshTokenSuccess(res))
         })
         .catch((err) => {
            dispatch(setRefreshTokenFailed())
         })
   }
}
//разобраться с типизацией refreshToken
// Планирую переписать на axios
