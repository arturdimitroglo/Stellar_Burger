import React, { useState } from "react";
import style from './Login.module.css'
import AppHeader from '../../components/app-header/AppHeader';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'

const Login = () => {
   const [email, setEmail] = React.useState('')
   const [password, setPassword] = useState('')
   const inputRef = React.useRef(null)
   const onChange = e => {
      setPassword(e.target.value)
   }


   return (
      <>
         <div>
            <AppHeader />
            <div className={`${style.content} mt-30`}>
               <p className="text text_type_main-medium mb-6">
                  Вход
               </p>
               <div className="mb-6">
                  <Input
                     type={'email'}
                     placeholder={'E-mail'}
                     onChange={e => setEmail(e.target.value)}
                     icon={undefined}
                     value={email}
                     name={'e-mail'}
                     error={false}
                     ref={inputRef}
                     onIconClick={''}
                     errorText={'Ошибка'}
                     size={'default'}
                  />
               </div>

               <div className="mb-6">
                  <PasswordInput onChange={onChange} value={password} name={'password'} />
               </div>

               <Button type="primary" size="medium">
                  Войти
               </Button>

               <div className={`${style.edit} mt-15`}>
                  <p className="text text_type_main-default text_color_inactive">
                     Вы — новый пользователь?
                     <Button type="secondary" size="medium">
                     Зарегистрироваться
                     </Button>
                  </p>

                  <p className="text text_type_main-default text_color_inactive">
                  Забыли пароль?<Button type="secondary" size="medium">
                  Восстановить пароль
                     </Button>
                  </p>
               </div>
            </div>
         </div>
      </>
   )
}

export default Login;