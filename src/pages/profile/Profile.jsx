import React, { useState } from "react";
import style from './Profile.module.css'
import AppHeader from '../../components/app-header/AppHeader';
import { Tab, Input, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'

const Profile = () => {
   const [email, setEmail] = React.useState('bob@example.com')
   const [password, setPassword] = useState('password')
   const [name, setName] = React.useState('hui')
   const inputRef = React.useRef(null)

   const onChange = e => {
      setEmail(e.target.value)
   }
   const [current, setCurrent] = React.useState('one')
   const [typeInput, setTypeInput] = useState('password')

   return (
      <>
         <div>
            <AppHeader />

            <div className={style.container}>
               <div className={`${style.content} mt-30`}>
                  <div className={`${style.navigation} `}>
                     <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                        Профиль
                     </Tab>
                     <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                        История заказов
                     </Tab>
                     <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                        Выход
                     </Tab>

                     <p className="text text_type_main-default text_color_inactive mt-20">
                        В этом разделе вы можете
                        изменить свои персональные данные
                     </p>
                  </div>

                  <div className={style.edit}>
                     <div className="mb-6">
                        <Input
                           type={'text'}
                           placeholder={'Имя'}
                           onChange={e => setName(e.target.value)}
                           icon={"EditIcon"}
                           value={name}
                           name={'name'}
                           error={false}
                           ref={inputRef}
                           onIconClick={'onIconClick'}
                           errorText={'Ошибка'}
                           size={'default'}
                        />
                     </div>
                     <div className="mb-6">
                        <EmailInput onChange={onChange} value={email} name={'email'} />
                     </div>
                     <div className="mb-6">
                        <PasswordInput onChange={onChange} value={password} name={'password'} />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default Profile;