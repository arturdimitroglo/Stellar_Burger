import React, { useRef, useState } from "react";
import style from './ForgotPassword.module.css'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../services/actions/user";



const ForgotPassword = () => {
   const [email, setEmail] = useState('')
   const inputRef = useRef(null)

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const onIconClick = () => {
      setTimeout(() => inputRef.current.focus(), 0)
      alert('Icon Click Callback')
   };

   const sendData = (e) => {
      e.preventDefault();

      if (!email) {
         return;
      }

      dispatch(forgotPassword(email));
      setEmail("");
      navigate("/reset-password");
   }

   return (
      <>
         <form onSubmit={sendData} className={`${style.form} mt-30 mb-20`}>
            <p className="text text_type_main-medium mb-6">
               Востановление пароля
            </p>

            <div className="mb-6">
               <Input
                  type={'email'}
                  placeholder={'Укажите e-mail'}
                  onChange={e => setEmail(e.target.value)}
                  icon={undefined}
                  value={email}
                  name={'Укажите e-mail'}
                  error={false}
                  ref={inputRef}
                  onIconClick={onIconClick}
                  errorText={'Ошибка'}
                  size={'default'}
               />
            </div>

            <Button type="primary" size="medium">
               Востановить
            </Button>
         </form>

         <div className={`${style.edit} mt-10`}>
            <p className="text text_type_main-default text_color_inactive ">
               Вспомнили пароль?
               <Link className={style.link} to="/forgot-password">
                  Войти
               </Link>
            </p>
         </div>

      </>
   )
}

export default ForgotPassword;