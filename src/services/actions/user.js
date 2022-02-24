import mainApi from '../../utils/checkResponse';
import {
   setForgotPassword,
   setForgotPasswordSuccess,
   setForgotPasswordFailed,
   setForgotPasswordState,
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
} from '../reducers/index';

export const forgotPassword = (email) => {
   return (dispatch) => {
      dispatch(setForgotPassword())

      mainApi.sendEmail(email)
         .then((res) => {
            dispatch(setForgotPasswordState(res.success))
         })
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
         .then((res) => {
            console.log(res)
            // dispatch(setForgotPasswordState(false))
         })
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
            dispatch(sendUserInfoFailed())
         })
   }
}

export const logout = (refreshToken) => {
   return (dispatch) => {
      dispatch(setLogout())

      mainApi.refreshToken(refreshToken)
         .then(() => {
            localStorage.removeItem('refreshToken')
            dispatch(setLogoutSuccess())
         })
         .catch((err) => {
            dispatch(setLogoutFailed())
         })
   }
}

export const getUserData = (token) => {
   return (dispatch) => {
      dispatch(setGetUserInfo())

      mainApi.getUser(token)
         .then((res) => {
            dispatch(setGetUserInfoSuccess(res.user))
         })
         .catch((err) => {
            dispatch(setGetUserInfoFailed())
            dispatch(refreshToken(localStorage.getItem('refreshToken')))
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
         })
   }
}
