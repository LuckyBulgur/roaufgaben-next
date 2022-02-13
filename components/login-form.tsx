import Button from './button';
import { useRouter } from 'next/router';
import { Login } from '../auth/validations';
import { useFormik } from "formik"
import { TypeOf } from 'zod';
import { FC, useState } from 'react';
import { Spinner } from 'evergreen-ui';
import useLoginMutation from '../hooks/login-mutation';
import useTwoFactorMutation from '../hooks/two-factor-mutation';
import Cookies from 'js-cookie';

interface LoginProps {
    onSuccess?: () => void;
}

export const LoginForm: FC<LoginProps> = (props: LoginProps) => {

    const [isLogginIn, setIsLogginIn] = useState(false);
    const [haveTwoFactor, setHaveTwoFactor] = useState(false);

    const loginMutation = useLoginMutation();
    const twoFactorMutation = useTwoFactorMutation();

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
                const twoFactorResult = await twoFactorMutation.mutateAsync({
                    username: values.username,
                    password: values.password,
                    twoFactor: values.twoFactor as string
                });

                const { access_token, message } = twoFactorResult;

                if (access_token) {
                    Cookies.set("access_token", access_token);
                    props.onSuccess?.();
                } else if (message == "Unauthorized") {
                    form.errors.password = "Falsches Passwort oder Benutzername";
                } else {
                    form.errors.twoFactor = message;
                }
                setIsLogginIn(false);
                return;
            };
            try {
                const loginResult = await loginMutation.mutateAsync({
                    username: values.username,
                    password: values.password
                });

                const { access_token, message } = loginResult;

                if (message === "You need to verify") {
                    setHaveTwoFactor(true);
                    setIsLogginIn(false);
                    return;
                }

                if (access_token) {
                    Cookies.set("access_token", access_token);
                    props.onSuccess?.();
                } else if (message == "Unauthorized") {
                    form.errors.password = "Falsches Passwort oder Benutzername";
                } else {
                    form.errors.password = message;
                }
                setIsLogginIn(false);
            } catch (error) {
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