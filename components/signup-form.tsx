import Button from './button';
import { Signup } from '../auth/validations';
import { useFormik } from "formik"
import { TypeOf } from 'zod';
import getConfig from 'next/config';
import { FC, useState } from 'react';
import { Spinner } from 'evergreen-ui';

const config = getConfig();

type SignUpForm = {
    onSucces?: () => void
}

export const Title: FC = ({ children }) => {
    return (
        <h1 className="text-4xl sm:text-6xl text-fontwhite text-center mb-7">{children}</h1>
    );
}

export const SignupForm = (props: SignUpForm) => {

    const [isRegister, setIsRegister] = useState(false);

    const form = useFormik<TypeOf<typeof Signup>>({
        initialValues: {
            username: '',
            password: '',
            passwordRepeat: ''
        },
        validate(values) {
            try {
                Signup.parse(values)
            } catch (error: any) {
                return error.formErrors.fieldErrors;
            }
        },
        async onSubmit(values) {
            if (isRegister) return;
            setIsRegister(true);
            try {
                const response = await fetch(`${config.publicRuntimeConfig.serverUrl}/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Basic ${Buffer.from(`${values.username}:${values.password}`).toString('base64')}`
                    },
                    body: ""
                });
                const text = await response.text();
                if (text != "Erfolgreich registriert") {
                    setIsRegister(false);
                    if (text.includes("Nutzername")) {
                        form.errors.username = text;
                        return;
                    }
                    form.errors.passwordRepeat = text;
                    return;
                }
                props.onSucces?.();
            }
            catch (error) {
                setIsRegister(true);
                console.log(error);
            }
        }
    });

    return (
        <form onSubmit={form.handleSubmit}>
            <div className="mb-5">
                <label className="text-authgreen">Username</label>
                <input
                    className="w-full bg-mygray p-2 px-3 rounded-lg text-fontwhite"
                    height={50}
                    width={'100%'}
                    placeholder="Username"
                    id="username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                ></input>
                {form.touched.username && form.errors.username && (
                    <p className='text-red mt-1'>{form.errors.username}</p>
                )}
            </div>
            <div className="mb-5">
                <label className="text-authgreen">Passwort</label>
                <input
                    className="w-full bg-mygray p-2 px-3 rounded-lg text-fontwhite"
                    height={50}
                    width={'100%'}
                    name="password"
                    placeholder="Passwort"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                ></input>
                {form.touched.password && form.errors.password && (
                    <p className='text-red mt-1'>{form.errors.password}</p>
                )}
            </div>
            <div className="mb-5">
                <label className="text-authgreen">Passwort Wiederholen</label>
                <input
                    className="w-full bg-mygray p-2 px-3 rounded-lg text-fontwhite"
                    height={50}
                    width={'100%'}
                    name="passwordRepeat"
                    placeholder="Passwort Wiederholen"
                    type="password"
                    id="passwordRepeat"
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                ></input>
                {form.touched.passwordRepeat && form.errors.passwordRepeat && (
                    <p className='text-red mt-1'>{form.errors.passwordRepeat}</p>
                )}
            </div>
            <Button disabled={isRegister} className="bg-authgreen text-myblue font-medium px-4 w-full hover:bg-secgreen py-2 rounded-lg mt-5">{isRegister ? <Spinner marginX="auto" size={24}></Spinner> : "Registrieren"}</Button>
            <div className='mt-2'>
                <a href="./login" className='text-fontwhite'>Bereits registriert? Jetzt Anmelden</a>
            </div>
        </form>
    )
}   