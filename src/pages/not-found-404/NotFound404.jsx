import style from './NotFound404.module.css';
import AppHeader from '../../components/app-header/AppHeader';
import React from 'react';
// import { Link } from 'react-router-dom';
import pageNotFound from "../../images/404 Error-bro.png";

const NotFound404 = () => {
   return (
      <>
         <AppHeader />
         <div className={style.container}>
            <div className={style.content}>
               <img className={style.img} alt="page not found" src={pageNotFound} />
               <br />
               {/* <Link to='/' className={style.link}>Перейти в список чатов</Link> */}
            </div>
         </div>
      </>
   );
}

export default NotFound404;