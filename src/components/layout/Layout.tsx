import React, { FC } from "react";
import style from './Layout.module.css';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppHeader from '../app-header/AppHeader'
import { useAppSelector } from "../../hook/hook";

const Layout: FC = () => {
   const { feedFailed, feedRequest, ingredients } = useAppSelector(state => state.ingredientSlice);

   return (
      <>
         <AppHeader />
         {feedFailed && !feedRequest &&
            <p className={style.differentResult}>
               Произошла ошибка при получении данных, попробуйте перезагрузить страницу
            </p>}

         {feedRequest && !feedFailed && <p className={style.differentResult}>Загрузка...</p>}

         {ingredients && !feedFailed && (
            <Outlet />
         )}
      </>
   )
}

export default Layout;