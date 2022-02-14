import Cookies from 'js-cookie';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { DeleteAccount } from '../components/delete-account';
import { ResetPasswordForm } from '../components/reset-password-form';
import { TwoFactorSwitch } from '../components/two-factor-switch';
import useUser from '../hooks/use-user';

const Profile: NextPage = () => {

    const user = useUser();
    const router = useRouter();

    const onSuccess = () => {
        Cookies.remove('access_token');
    }

    return (
        <div className="min-h-screen min-w-screen flex justify-center ml-16 bg-gradient-to-t from-myblue to-second" >
            {user && user.isSuccess &&
                <div className='w-[90%] h-screen'>
                    <h1 className='text-4xl sm:text-5xl text-fontwhite mt-10 text-center mb-10 font-bold'>{user.data?.username}</h1>
                    <h1 className='text-fontwhite text-3xl font-bold'>Sicherheit</h1>
                    <div className='flex flex-col'>
                        <h1 className='text-fontwhite text-xl mt-8 font-bold'>Anmelden in zwei Schritten</h1>
                        <TwoFactorSwitch haveTwoFactor={user.data?.haveTwoFactor}></TwoFactorSwitch>
                        <ResetPasswordForm onSuccess={() => { onSuccess(), router.push('/login') }}></ResetPasswordForm>
                    </div>
                    <div className='flex justify-center'>
                        <div className='absolute bottom-5'>
                            <DeleteAccount></DeleteAccount>
                        </div>
                    </div>
                </div>
            }
        </div >
    );
}

export default Profile;