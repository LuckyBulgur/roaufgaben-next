import { Spinner } from 'evergreen-ui';
import { useFormik } from 'formik';
import { FC, useState } from 'react';
import { TypeOf } from 'zod';

import { Task } from '../auth/validations';
import { Subject } from '../enums/subject';
import useCreateTaskMutation from '../hooks/create-task-mutation';
import Button from './button';


interface CreateTaskProps {
    onSuccess?: () => void;
    classId?: string;
}

export const CreateTaskForm: FC<CreateTaskProps> = (props: CreateTaskProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const createTaskMutation = useCreateTaskMutation();

    const form = useFormik<TypeOf<typeof Task>>({
        initialValues: {
            subject: '0',
            task: '',
            submission: '',
        },
        validate(values) {
            if (values.submission) {
                values.submission = new Date(values.submission).toISOString();
            }
            try {
                Task.parse(values)
            } catch (error: any) {
                return error.formErrors.fieldErrors;
            }
        },
        async onSubmit(values) {
            if (isLoading) return;
            setIsLoading(true);
            try {
                const createTaskResult = await createTaskMutation.mutateAsync({
                    subject: values.subject,
                    task: values.task,
                    submission: values.submission,
                    classId: props.classId as string
                });

                const { message } = createTaskResult;

                if (message == 'Task created') {
                    props.onSuccess?.();
                } else {
                    form.errors.submission = message;
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
            <div className="mb-5">
                <label className="dark:text-authgreen text-fontwhite">Fach</label>
                <select
                    className="w-full bg-mygray p-2 px-3 rounded-lg text-fontwhite"
                    placeholder="Fach"
                    id="subject"
                    name="subject"
                    autoComplete="subject"
                    autoFocus
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                >
                    {Object.values(Subject).map((subject: any, index: number) => (
                        (isNaN(subject)) && <option key={index} value={index}>{subject}</option>
                    ))}
                </select>
                {form.touched.subject && form.errors.subject && (
                    <p className='text-red mt-1'>{form.errors.subject}</p>
                )}
            </div>
            <div className="mb-5">
                <label className="dark:text-authgreen text-fontwhite">Aufgabe</label>
                <input
                    className="w-full bg-mygray p-2 px-3 rounded-lg text-fontwhite"
                    height={50}
                    width={'100%'}
                    name="task"
                    placeholder="Aufgabe"
                    id="task"
                    autoComplete="current-task"
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                ></input>
                {form.touched.task && form.errors.task && (
                    <p className='text-red mt-1'>{form.errors.task}</p>
                )}
            </div>
            <div className="mb-5">
                <label className="dark:text-authgreen text-fontwhite">Abgabe Termin</label>
                <input
                    className="w-full bg-mygray p-2 px-3 rounded-lg text-fontwhite"
                    height={50}
                    width={'100%'}
                    name="submission"
                    placeholder="Abgabe Termin"
                    type="datetime-local"
                    id="submission"
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                ></input>
                {form.touched.submission && form.errors.submission && (
                    <p className='text-red mt-1'>{form.errors.submission}</p>
                )}
            </div>
            <Button disabled={isLoading} className="bg-authgreen text-myblue font-medium px-4 w-full hover:bg-secgreen py-2 rounded-lg mt-5">{isLoading ? <Spinner marginX="auto" size={24}></Spinner> : "Aufgabe erstellen"}</Button>
        </form>
    )
}   