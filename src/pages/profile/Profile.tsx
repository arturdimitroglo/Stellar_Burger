import style from './Profile.module.css'
import { NavLink, Routes, Route, useLocation } from "react-router-dom";
import UserInfo from "../../components/user-info/UserInfo";
import { logout } from '../../services/actions/user';
import { FC, useState } from 'react';
import { useAppDispatch } from '../../hook/hook';
import OrdersList from '../orders-list/orders-list';
import ModalOrder from '../../components/modal-order/ModalOrder';



const Profile: FC = () => {
   const dispatch = useAppDispatch();

   const [current, setCurrent] = useState('profile')

   const handleLogout = () => {
      setCurrent("login")
      const refreshToken = localStorage.getItem('refreshToken');
      dispatch(logout(refreshToken))
   }

   return (
      <div className={style.wrapper}>
         <nav className={style.navigation}>
            <ul className={`${style.list}`}>
               <li className={style.list_item}>
                  <NavLink
                     className={(current === 'profile') ? `${style.link_active} text text_type_main-medium` : `${style.link} text text_type_main-medium`}
                     to=''
                     onClick={() => setCurrent('profile')}
                  >
                     Профиль
                  </NavLink>
               </li>
               <li>
                  <NavLink
                  className={(current === 'orders') ? `${style.link_active} text text_type_main-medium` : `${style.link} text text_type_main-medium`}
                     to='orders'
                     onClick={() => setCurrent('orders')}
                  >
                     История заказов
                  </NavLink>
               </li>
               <li>
                  <NavLink
                  className={(current === 'login') ? `${style.link_active} text text_type_main-medium` : `${style.link} text text_type_main-medium`}
                     to="login"
                     onClick={handleLogout}
                  >
                     Выход
                  </NavLink>
               </li>
            </ul>
            <p
               className={`${style.text} text text_type_main-default text_color_inactive`}
            >
               В этом разделе вы можете изменить свои персональные данные
            </p>
         </nav>

         <Routes>
            <Route index element={<UserInfo />} />
            <Route path='orders' element={<OrdersList />} >
               <Route path=':id' element={<ModalOrder/>} />
            </Route>
         </Routes>

      </div>
   )
}

export default Profile;