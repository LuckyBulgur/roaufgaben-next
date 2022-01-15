import Cookies from "js-cookie";
import { NextPage } from "next";
import { useEffect } from "react";
import { SignupForm, Title } from "../components/signup-form";
import { useRouter } from "next/router";

const Register: NextPage = () => {

    const router = useRouter();
    return (
        <div className="min-h-screen min-w-screen flex justify-center items-center bg-center bg-gradient-to-t from-myblue to-second" >
            <div className="bg-myblue bg-opacity-40 h-screen w-screen sm:w-auto sm:h-auto  backdrop-blur-xl p-7 rounded-xl flex flex-col justify-center">
                <Title>Konto erstellen</Title>
                <SignupForm onSuccess={() => window.location.assign('/login')}></SignupForm>
            </div>
        </div >
    );
}

export default Register;