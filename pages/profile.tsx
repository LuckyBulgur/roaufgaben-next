import Cookies from 'js-cookie';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { isMobile, MobileView } from 'react-device-detect';
import { FaMoon, FaSun } from 'react-icons/fa';

import { DeleteAccount } from '../components/delete-account';
import { ResetPasswordForm } from '../components/reset-password-form';
import { TwoFactorSwitch } from '../components/two-factor-switch';
import useUser from '../hooks/use-user';
import useDarkMode from '../hooks/useDarkMode';

const Profile: NextPage = () => {

    const user = useUser();
    const router = useRouter();

    const [darkTheme, setDarkTheme] = useDarkMode();
    const handleMode = () => setDarkTheme(!darkTheme);

    const onSuccess = () => {
        Cookies.remove('access_token');
    }

    return (
        <div className={`min-h-screen min-w-screen flex justify-center ${!isMobile && "ml-16"} dark:bg-gradient-to-t from-myblue to-second`}>
            {user && user.isSuccess &&
                <div className='w-[90%] h-screen'>
                    <h1 className='text-3xl sm:text-5xl dark:text-fontwhite mt-10 sm:text-center mb-10 font-bold'>{user.data?.username}</h1>
                    <h1 className='dark:text-fontwhite text-3xl font-bold'>Sicherheit</h1>
                    <div className='flex flex-col'>
                        <h1 className='dark:text-fontwhite text-xl mt-4 font-bold'>Anmelden in zwei Schritten</h1>
                        <TwoFactorSwitch haveTwoFactor={user.data?.haveTwoFactor}></TwoFactorSwitch>
                        <ResetPasswordForm onSuccess={() => { onSuccess(), router.push('/login') }}></ResetPasswordForm>
                    </div>
                    <div className='flex justify-center'>
                        <div className={`absolute ${!isMobile ? "bottom-5" : "bottom-16"}`}>
                            <DeleteAccount></DeleteAccount>
                        </div>
                    </div>
                    <MobileView>
                        <div className='flex flex-col mt-10'>
                            <h1 className='dark:text-fontwhite text-3xl font-bold'>Aussehen</h1>
                            <span className='bg-myblue mt-3 cursor-pointer w-max p-2 rounded-xl text-fontwhite dark:text-myblue dark:bg-white' onClick={handleMode}>
                                {darkTheme ? (
                                    <FaSun size='24' />
                                ) : (
                                    <FaMoon size='24' />
                                )}
                            </span>
                        </div>
                    </MobileView>
                </div>
            }
        </div >
    );
}

export default Profile;