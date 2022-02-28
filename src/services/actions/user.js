import { tokenExpired, unauthorized } from '../../utils/baseURL';
import mainApi from '../../utils/checkResponse';
import {
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

export const forgotPassword = (email) => {
   return (dispatch) => {
      dispatch(setForgotPassword())

      mainApi.sendEmail(email)
         .then(() => {
            dispatch(setForgotPasswordSuccess())
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
            dispatch(setResetPasswordSuccess())
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
            dispatch(registrationUserSuccess(res.accessToken))
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

export const getUserData = (token) => {
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
            dispatch(setRefreshTokenSuccess(res.accessToken))
         })
         .catch((err) => {
            dispatch(setRefreshTokenFailed())
            console.log(`${err} не авторизован`)
         })
   }
}

// Планирую переписать на axios
