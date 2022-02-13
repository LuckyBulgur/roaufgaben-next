import { SideSheet, Spinner } from 'evergreen-ui';
import { useFormik } from 'formik';
import { FC, useState } from 'react';
import { TypeOf } from 'zod';

import { ResetPassword } from '../auth/validations';
import useResetPasswordMutation from '../hooks/reset-password-mutation';
import Button from './button';

interface ResetPasswordProps {
    onSuccess?: () => void;
}

export const ResetPasswordForm: FC<ResetPasswordProps> = (props: ResetPasswordProps) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isShown, setIsShown] = useState(false);

    const resetPasswordMutation = useResetPasswordMutation();

    const form = useFormik<TypeOf<typeof ResetPassword>>({
        initialValues: {
            password: '',
        },
        validate(values) {
            try {
                ResetPassword.parse(values)
            } catch (error: any) {
                return error.formErrors.fieldErrors;
            }
        },
        async onSubmit(values) {
            if (isLoading) return;
            setIsLoading(true);

            try {
                const resetPasswordResult = await resetPasswordMutation.mutateAsync({
                    password: values.password
                });

                if (resetPasswordResult.message == "Passwort erfolgreich geändert") {
                    props.onSuccess?.();
                }
            }
            catch (error) {
                setIsLoading(false);
                console.log(error);
            }
        }
    });

    return (
        <>
            <SideSheet
                isShown={isShown}
                onCloseComplete={() => setIsShown(false)}
                preventBodyScrolling
            >
                <form className='px-5 bg-gradient-to-t to-[#101726] from-second pt-10 h-full w-full' onSubmit={form.handleSubmit}>
                    <div className="mb-5 flex flex-col">
                        <label className="text-authgreen">Neues Passwort</label>
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
                    <Button disabled={isLoading} className="bg-authgreen w-full text-myblue font-medium px-4 hover:bg-secgreen py-2 rounded-lg mt-5">{isLoading ? <Spinner marginX="auto" size={24}></Spinner> : "Passwort ändern"}</Button>
                </form>
            </SideSheet>
            <button className='w-max bg-authgreen text-myblue font-medium px-4 hover:bg-secgreen py-2 rounded-lg mt-12' onClick={() => setIsShown(true)}>Passwort Ändern</button>
        </>
    )
}   