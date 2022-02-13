import { Spinner } from 'evergreen-ui';
import { useFormik } from 'formik';
import Link from 'next/link';
import { FC, useState } from 'react';
import { TypeOf } from 'zod';

import { Signup } from '../auth/validations';
import useRegisterMutation from '../hooks/register-mutation';
import Button from './button';

interface SignUpProps {
    onSuccess?: () => void;
}

export const SignupForm: FC<SignUpProps> = (props: SignUpProps) => {
    const [isRegister, setIsRegister] = useState(false);

    const registerMutation = useRegisterMutation();

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
                const registerResult = await registerMutation.mutateAsync({
                    username: values.username,
                    password: values.password
                });

                if (registerResult.message == "Dieser Benutzername ist bereits vergeben") {
                    setIsRegister(false);
                    form.errors.username = registerResult.message;
                    return;
                } else if (registerResult.message == "Erfolgreich registriert") {
                    props.onSuccess?.();
                } else {
                    form.errors.passwordRepeat = registerResult.message;
                }
            }
            catch (error) {
                setIsRegister(false);
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
                <Link href="/login"><div className='text-fontwhite cursor-pointer'>Bereits registriert? Jetzt Anmelden</div></Link>
            </div>
        </form>
    )
}   