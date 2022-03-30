import React, { FC } from 'react';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './AppHeader.module.css';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import OrdersFeed from '../../pages/orders-feed/orders-feed';
import ModalOrder from '../modal-order/ModalOrder';


const AppHeader: FC = () => {
   
   return (
      <header className={`${style.header} text text_type_main-default`}>
         <nav className={`${style.content} p-4`}>
            <div className={`${style.navigation} mr-30`}>
               <NavLink to='/' className={({ isActive }) => isActive ? `${style.link_active} p-5 m-2` : `${style.link} p-5 m-2`}>
                  <BurgerIcon type="secondary" />
                  <p className="m-2">Конструктор</p>
               </NavLink>

               <NavLink to='feed' className={({ isActive }) => isActive ? `${style.link_active} p-5 m-2` : `${style.link} p-5 m-2`}>
                  <ListIcon type="secondary" />
                  <p className="m-2">Лента заказов</p>
               </NavLink>
            </div>

            <Link to='/' className={style.logo}>
               <Logo />
            </Link>
            <NavLink to='profile' className={({ isActive }) => isActive ? `${style.link_active} p-5 m-2` : `${style.link} p-5 m-2`}>
               <ProfileIcon type="secondary" />
               <p className="m-2">Личный кабинет</p>
            </NavLink>
         </nav>
         <Routes>
            <Route path='feed' element={<OrdersFeed />} >
               <Route path=':id' element={<ModalOrder />} />
            </Route>
         </Routes>
      </header>
   )
}

export default AppHeader;