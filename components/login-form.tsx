import Button from './button';
import { Login } from '../auth/validations';
import { useFormik } from "formik"
import { TypeOf } from 'zod';
import getConfig from 'next/config';
import { FC, useState } from 'react';
import Cookies from 'js-cookie';
import { Spinner } from 'evergreen-ui';

const config = getConfig();

type LoginForm = {
    onSucces?: () => void
}

export const Title: FC = ({ children }) => {
    return (
        <h1 className="text-4xl sm:text-6xl text-fontwhite text-center mb-7">{children}</h1>
    );
}

export const LoginForm = (props: LoginForm) => {

    const [isLogginIn, setIsLogginIn] = useState(false);
    const [haveTwoFactor, setHaveTwoFactor] = useState(false);

    const form = useFormik<TypeOf<typeof Login>>({
        initialValues: {
            username: '',
            password: '',
            twoFactor: undefined
        },
        validate(values) {
            try {
                Login.parse(values)
            } catch (error: any) {
                return error.formErrors.fieldErrors;
            }
        },
        async onSubmit(values) {
            if (isLogginIn) return;
            setIsLogginIn(true);
            if (haveTwoFactor) {
                const response = await fetch(`${config.publicRuntimeConfig.serverUrl}/verify2fa`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'username': `${Buffer.from(`${values.username}`).toString('base64')}`,
                        'authtoken': values.twoFactor as string
                    },
                    body: ""
                });
                const json = await response.json();

                if (json.message === "Gültiger Authcode") {
                    Cookies.set('token', json.userkey, { expires: 7 });
                    props.onSucces?.();
                } else if (json.message === "Ungültiger Token") {
                    form.errors.twoFactor = json.message;
                } else {
                    form.errors.twoFactor = json.message;
                }
                setIsLogginIn(false);
                return;
            };
            try {
                const response = await fetch(`${config.publicRuntimeConfig.serverUrl}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Basic ${Buffer.from(`${values.username}:${values.password}`).toString('base64')}`
                    },
                    body: ""
                });
                const json = await response.json();
                if (json.message === "Sie werden eingeloggt") {
                    Cookies.set('token', json.key, { expires: 7 });
                    props.onSucces?.();
                } else if (json.message === "2FA") {
                    setHaveTwoFactor(true);
                } else {
                    form.errors.password = json.message;
                }
                setIsLogginIn(false);
            }
            catch (error) {
                setIsLogginIn(false);
                form.errors.password = "Server Fehler, versuche es später erneut";
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
            {haveTwoFactor && (
                <div className="mb-5">
                    <label className="text-authgreen">Verifizierungscode</label>
                    <input
                        className="w-full bg-mygray p-2 px-3 rounded-lg text-fontwhite"
                        height={50}
                        width={'100%'}
                        name="twoFactor"
                        placeholder="Verifizierungscode"
                        id="twoFactor"
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                    ></input>
                    {form.touched.twoFactor && form.errors.twoFactor && (
                        <p className='text-red mt-1'>{form.errors.twoFactor}</p>
                    )}
                </div>)
            }
            <Button disabled={isLogginIn} className="bg-authgreen text-myblue font-medium px-4 w-full hover:bg-secgreen py-2 rounded-lg mt-5">{(isLogginIn) ? <Spinner marginX="auto" size={24}></Spinner> : (haveTwoFactor) ? "Verifizieren" : "Anmelden"}</Button>
            <div className={haveTwoFactor ? 'hidden' : 'mt-2'}>
                <a href="./register" className='text-fontwhite'>Kein Account? Jetzt Registrieren</a>
            </div>
        </form>
    )
}   