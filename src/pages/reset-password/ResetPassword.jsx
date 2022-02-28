import React, { useState } from "react";
import style from './ResetPassword.module.css'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../services/actions/user";


const ResetPassword = () => {
   const [code, setCode] = React.useState('')
   const [password, setPassword] = useState('')
   const [typeInput, setTypeInput] = useState('password')
   const [icon, setIcon] = useState('ShowIcon')

   const inputRef = React.useRef(null)

   const navigate = useNavigate();
   const dispatch = useDispatch();

   const onIconClick = () => {
      setTimeout(() => inputRef.current.focus(), 0)
      setTypeInput(typeInput === 'password' ? 'email' : 'password')
      setIcon(icon === 'ShowIcon' ? "HideIcon" : 'ShowIcon')
   }

   const sendData = (e) => {
      e.preventDefault();

      if (!code || !password) {
         return;
      }
      
      dispatch(resetPassword(password, code));
      setCode("");
      setPassword("");
      navigate('/');
   }

   return (
      <>
         <form onSubmit={sendData} className={`${style.form} mt-30 mb-20`}>
            <p className="text text_type_main-medium mb-6">
               Востановление пароля
            </p>

            <div className="mb-6">
               <Input
                  type={typeInput}
                  placeholder={'Введите новый пароль'}
                  onChange={e => setPassword(e.target.value)}
                  icon={icon}
                  value={password}
                  name={'name'}
                  error={false}
                  ref={inputRef}
                  onIconClick={onIconClick}
                  errorText={'Ошибка'}
                  size={'default'}
               />
            </div>

            <div className="mb-6">
               <Input
                  type={'text'}
                  placeholder={'Введите код из письма'}
                  onChange={e => setCode(e.target.value)}
                  icon={undefined}
                  value={code}
                  name={'code'}
                  error={false}
                  ref={inputRef}
                  onIconClick={''}
                  errorText={'Ошибка'}
                  size={'default'}
               />
            </div>

            <Button type="primary" size="medium">
               Сохранить
            </Button>
         </form>

         <div className={`${style.edit} mt-15`}>
            <p className="text text_type_main-default text_color_inactive">
               Вспомнили пароль?
               <Link className={style.link} to="/forgot-password">
                  Войти
               </Link>
            </p>
         </div>
      </>
   )
}

export default ResetPassword;