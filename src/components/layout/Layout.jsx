import React from "react";
import style from './Layout.module.css';
import { Link, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AppHeader from '../app-header/AppHeader'

function Layout() {
   const { feedFailed, feedRequest, ingredients } = useSelector(state => state.counterSlice);

   return (
      <>
         <AppHeader />
         {feedFailed && !feedRequest &&
            <p className={style.differentResult}>
               Произошла ошибка при получении данных, попробуйте перезагрузить страницу
            </p>}

         {feedRequest && !feedFailed && <p className={style.differentResult}>Загрузка...</p>}

         { ingredients && !feedFailed && (
            <Outlet />
         )}
      </>
   )

}

export default Layout;