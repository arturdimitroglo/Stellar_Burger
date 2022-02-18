import React, { useState } from "react";
import style from './Registration.module.css'
import AppHeader from '../../components/app-header/AppHeader';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'

const Registration = () => {
   const [email, setEmail] = React.useState('')
   const [password, setPassword] = useState('')
   const [name, setName] = useState('')
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
                  Регистрация
               </p>
               <div className="mb-6">
                  <Input
                     type={'text'}
                     placeholder={'Имя'}
                     onChange={e => setName(e.target.value)}
                     icon={undefined}
                     value={name}
                     name={'name'}
                     error={false}
                     ref={inputRef}
                     onIconClick={''}
                     errorText={'Ошибка'}
                     size={'default'}
                  />
               </div>
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
                  Зарегистрироваться
               </Button>

               <div className={`${style.edit} mt-15`}>
                  <p className="text text_type_main-default text_color_inactive">
                     Уже зарегистрированы?
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

export default Registration;