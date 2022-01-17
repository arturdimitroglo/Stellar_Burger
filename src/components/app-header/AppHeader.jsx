import React from 'react';
import PropTypes from 'prop-types';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './AppHeader.module.css';

const AppHeader = () => {
   return (
      <header className={`${style.header} text text_type_main-default`}>
         <nav className={`${style.content} p-4`}>
            <div className={`${style.navigation} mr-30`}>
               <a href='' className={`${style.link} p-5 m-2`}>
                  <BurgerIcon type="primary" />
                  <p className="m-2">Конструктор</p>
               </a>

               <a href='' className={`${style.link} ${style.link_inactive} p-5`}>
                  <ListIcon type="secondary" />
                  <p className="m-2">Лента заказов</p>
               </a>
            </div>

            <div className={style.logo}>
               <Logo />
            </div>

            <a href='' className={`${style.link} ${style.link_inactive} ml-30`}>
               <ProfileIcon type="secondary" />
               <p className="m-2">Личный кабинет</p>
            </a>
         </nav>
      </header>
   )
}

export default AppHeader;