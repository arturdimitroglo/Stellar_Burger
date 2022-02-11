import React, { useState } from "react";
import style from './ResetPassword.module.css'
import AppHeader from '../../components/app-header/AppHeader';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'

const ResetPassword = () => {
   const [value, setValue] = React.useState('')
   const [password, setPassword] = useState('')
   const [typeInput, setTypeInput] = useState('password')
   const [icon, setIcon] = useState('ShowIcon')
   const inputRef = React.useRef(null)
   const onIconClick = () => {
      setTimeout(() => inputRef.current.focus(), 0)
      setTypeInput(typeInput === 'password' ? 'email' : 'password')
      setIcon(icon === 'ShowIcon' ? "HideIcon" : 'ShowIcon')
   }


   return (
      <>
         <div>
            <AppHeader />
            <div className={`${style.content} mt-30`}>
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
                     type={'email'}
                     placeholder={'Введите код из письма'}
                     onChange={e => setValue(e.target.value)}
                     icon={undefined}
                     value={value}
                     name={'name'}
                     error={false}
                     ref={inputRef}
                     onIconClick={''}
                     errorText={'Ошибка'}
                     size={'default'}
                  />
               </div>

               <Button type="primary" size="medium">
                  Востановить
               </Button>

               <div className={`${style.edit} mt-15`}>
                  <p className="text text_type_main-default text_color_inactive">
                     Вспомнили пароль?
                  </p>

                  <Button type="secondary" size="medium">
                     Войти
                  </Button>
               </div>
            </div>
         </div>
      </>
   )
}

export default ResetPassword;