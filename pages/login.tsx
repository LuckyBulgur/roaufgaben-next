import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { LoginForm } from '../components/login-form';
import { SignOut } from '../components/sign-out';
import { Title } from '../components/title';
import useUser from '../hooks/use-user';

const Login: NextPage = () => {

    const router = useRouter();
    const user = useUser();

    return (
        <div className="min-h-screen min-w-screen flex justify-center items-center bg-center bg-gradient-to-t from-myblue to-second" >
            <div className="bg-myblue bg-opacity-40 h-screen w-screen sm:w-auto sm:h-auto backdrop-blur-xl p-7 rounded-xl flex flex-col justify-center">
                {
                    user && user.isSuccess && user.data ?
                        <>
                            <Title>Angemeldet</Title>
                            <div className='flex justify-center'>
                                <SignOut></SignOut>
                                <button onClick={() => router.push('/dashboard')} className='bg-green-600 ml-5 h-10 text-myblue font-medium px-4 w-max hover:bg-green-500 py-2 rounded-lg'>Dashboard</button>
                            </div>
                        </> : <>
                            <Title>Anmelden</Title>
                            <LoginForm onSuccess={() => router.push("/dashboard")}></LoginForm>
                        </>
                }
            </div>
        </div >
    );
}

export default Login;