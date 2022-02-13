import { Spinner } from 'evergreen-ui';
import { useFormik } from 'formik';
import { FC, useState } from 'react';
import { TypeOf } from 'zod';

import { Class } from '../auth/validations';
import useCreateClassMutation from '../hooks/create-class-mutation';
import Button from './button';

interface CreateClassProps {
    onSuccess?: () => void;
}

export const CreateClassForm: FC<CreateClassProps> = (props: CreateClassProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const createClassMutation = useCreateClassMutation();

    const form = useFormik<TypeOf<typeof Class>>({
        initialValues: {
            name: '',
        },
        validate(values) {
            try {
                Class.parse(values)
            } catch (error: any) {
                return error.formErrors.fieldErrors;
            }
        },
        async onSubmit(values) {
            if (isLoading) return;
            setIsLoading(true);
            try {

                const createClassResult = await createClassMutation.mutateAsync({
                    name: values.name
                });

                const { message } = createClassResult;

                if (message == 'Class created') {
                    props.onSuccess?.();
                } else {
                    form.errors.name = message;
                    setIsLoading(false);
                }
            }
            catch (error) {
                setIsLoading(true);
                console.log(error);
            }
        }
    });

    return (
        <form onSubmit={form.handleSubmit}>
            <div className="mb-1">
                <label className="text-authgreen">Name</label>
                <input
                    className="w-full bg-mygray p-2 px-3 rounded-lg text-fontwhite"
                    height={50}
                    width={'100%'}
                    name="name"
                    placeholder="Name"
                    id="name"
                    autoComplete="current-name"
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                ></input>
                {form.touched.name && form.errors.name && (
                    <p className='text-red mt-1'>{form.errors.name}</p>
                )}
            </div>
            <Button disabled={isLoading} className="bg-authgreen text-myblue font-medium px-4 w-full hover:bg-secgreen py-2 rounded-lg mt-5">{isLoading ? <Spinner marginX="auto" size={24}></Spinner> : "Klasse erstellen"}</Button>
        </form>
    )
}   