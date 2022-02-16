import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { LoginForm } from '../components/login-form';
import { Title } from '../components/title';
import useUser from '../hooks/use-user';

const Login: NextPage = () => {

    const router = useRouter();
    const user = useUser();
    if (user.data) {
        router.push('/dashboard');
    }

    return (
        <div className="min-h-screen min-w-screen flex justify-center items-center bg-center bg-gradient-to-t from-myblue to-second" >
            <div className="bg-myblue bg-opacity-40 h-screen w-screen sm:w-auto sm:h-auto backdrop-blur-xl p-7 rounded-xl flex flex-col justify-center">
                <Title>Anmelden</Title>
                <LoginForm onSuccess={() => router.push("/dashboard")}></LoginForm>
            </div>
        </div >
    );
}

export default Login;