import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFeed } from '../../services/actions/getFeed';
import Main from '../main/Main';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import ForgotPassword from '../../pages/forgot-password/ForgotPassword';
import IngredientsId from '../../pages/ingredients-id/IngredirntsId';
import Login from '../../pages/login/Login';
import NotFound404 from '../../pages/not-found-404/NotFound404';
import Profile from '../../pages/profile/Profile';
import Registration from '../../pages/register/Registration';
import ResetPassword from '../../pages/reset-password/ResetPassword';
import Layout from '../layout/Layout';
import { getUserData } from "../../services/actions/user";
import { closeIngredientDetails } from '../../services/reducers/index';
import Modal from '../modal/Modal';
import IngredientDetails from '../ingredient-details/IngredientDetails';
import RequireAuthForProfile from '../../hoc/RequireAuth';


function App() {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.counterSlice)

  const navigate = useNavigate
  const location = useLocation();
  const background = location.state && location.state.background;
  console.log(location)

  const closeDetails = () => {
    dispatch(closeIngredientDetails());
    background && navigate(-1);
  }


  React.useEffect(
    () => {
      dispatch(getFeed());
      dispatch(getUserData(token));
    }, [dispatch, token])


  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Main />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Registration />} />
          <Route path='forgot-password' element={<ForgotPassword />} />
          <Route path='reset-password' element={<ResetPassword />} />
          <Route path='profile/*' element={
            <RequireAuthForProfile>
              <Profile />
            </RequireAuthForProfile>
          } />
          <Route path='ingredients/:id' element={<IngredientsId />} />
          <Route path='*' element={<NotFound404 />} />
        </Route>
      </Routes>
    </>
  )
}

export default App;
