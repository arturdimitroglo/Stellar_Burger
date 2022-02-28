import { createSlice } from '@reduxjs/toolkit';
import { v4 as generateUniqueId } from 'uuid';

const initialState = {
   forgotPasswordRequest: false,
   forgotPasswordFailed: false,
   isForgotPassword: false,

   resetPasswordRequest: false,
   resetPasswordFailed: false,

   registrationRequest: false,
   registrationFailed: false,

   token: null,

   loginRequest: false,
   loginFailed: false,

   sendUserInfoRequest: false,
   sendUserInfoFailed: false,

   userInfo: null,

   logoutRequest: false,
   logoutFailed: false,

   getUserInfoRequest: false,
   getUserInfoFailed: false,

   refreshTokenRequest: false,
   refreshTokenFailed: false,
}

const userSlice = createSlice({
   name: 'burger',
   initialState,
   reducers: {
      //выход
      setLogout(state) {
         state.logoutRequest = true;
         state.logoutFailed = false;
      },
      setLogoutSuccess(state) {
         state.logoutRequest = false;
         state.token = null;
         state.userInfo = null;
      },
      setLogoutFailed(state) {
         state.logoutRequest = false;
         state.logoutFailed = true;
      },

      setRefreshToken(state) {
         state.refreshTokenRequest = true;
         state.refreshTokenFailed = false;
      },
      setRefreshTokenSuccess(state, action) {
         state.refreshTokenRequest = false;
         state.token = action.payload;
      },
      setRefreshTokenFailed(state) {
         state.refreshTokenRequest = false;
         state.refreshTokenFailed = true;
      },

      setGetUserInfo(state) {
         state.getUserInfoRequest = true;
         state.getUserInfoFailed = false;
      },
      setGetUserInfoSuccess(state, action) {
         state.getUserInfoRequest = false;
         state.userInfo = action.payload;
      },
      setGetUserInfoFailed(state) {
         state.getUserInfoRequest = false;
         state.getUserInfoFailed = true;
      },

      sendUserInfo(state) {
         state.sendUserInfoRequest = true;
         state.sendUserInfoFailed = false;
      },
      sendUserInfoSuccess(state, action) {
         state.state.sendUserInfoRequest = false;
         state.userInfo = action.payload;
      },
      sendUserInfoFailed(state) {
         state.sendUserInfoRequest = false;
         state.sendUserInfoFailed = true;
      },

      //вход
      setLogin(state) {
         state.loginRequest = true;
         state.loginFailed = false;
      },
      setLoginSuccess(state, action) {
         state.loginRequest = false;
         state.token = action.payload.accessToken;
         state.userInfo = action.payload.user;
      },
      setLoginFailed(state) {
         state.loginRequest = false;
         state.loginFailed = true;
      },
      //востановление пароля
      setForgotPassword(state) {
         state.forgotPasswordRequest = true;
         state.forgotPasswordFailed = false;
      },
      setForgotPasswordSuccess(state) {
         state.forgotPasswordRequest = false;
      },
      setForgotPasswordFailed(state) {
         state.forgotPasswordFailed = true;
         state.forgotPasswordRequest = false;
      },

      //изменение пароля
      setResetPassword(state) {
         state.resetPasswordRequest = true;
         state.resetPasswordFailed = false;
      },
      setResetPasswordSuccess(state) {
         state.resetPasswordRequest = false;
      },
      setResetPasswordFailed(state) {
         state.resetPasswordFailed = true;
         state.resetPasswordRequest = false;
      },

      //регистрация
      registrationUser(state) {
         state.registrationRequest = true;
         state.registrationFailed = false;
      },
      registrationUserSuccess(state, action) {
         state.registrationRequest = false;
         state.token = action.payload;
      },
      registrationUserFailed(state) {
         state.registrationRequest = false;
         state.registrationFailed = true;
      },
   }
})

export const {
   setRefreshToken,
   setRefreshTokenSuccess,
   setRefreshTokenFailed,
   setGetUserInfo,
   setGetUserInfoSuccess,
   setGetUserInfoFailed,
   setLogout,
   setLogoutSuccess,
   setLogoutFailed,
   sendUserInfo,
   sendUserInfoSuccess,
   sendUserInfoFailed,
   setLogin,
   setLoginSuccess,
   setLoginFailed,
   registrationUser,
   registrationUserSuccess,
   registrationUserFailed,
   setResetPassword,
   setResetPasswordSuccess,
   setResetPasswordFailed,
   setForgotPassword,
   setForgotPasswordSuccess,
   setForgotPasswordFailed,
} = userSlice.actions

export default userSlice.reducer