import React from "react";
import style from './ForgotPassword.module.css'
import AppHeader from '../../components/app-header/AppHeader';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'

const ForgotPassword = () => {
   const [value, setValue] = React.useState('')
   const inputRef = React.useRef(null)
   const onIconClick = () => {
      setTimeout(() => inputRef.current.focus(), 0)
      alert('Icon Click Callback')
   }

   return (
      <>
         <div>
            <AppHeader />
            <div className={`${style.content} mt-30`}>
               <p className="text text_type_main-medium ">
                  Востановление пароля
               </p>

               <Input
                  type={'email'}
                  placeholder={'Укажите e-mail'}
                  onChange={e => setValue(e.target.value)}
                  icon={undefined}
                  value={value}
                  name={'Укажите e-mail'}
                  error={false}
                  ref={inputRef}
                  onIconClick={onIconClick}
                  errorText={'Ошибка'}
                  size={'default'}
               />

               <Button type="primary" size="medium">
                  Востановить
               </Button>

               <div className={`${style.edit} mt-10`}>
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

export default ForgotPassword;