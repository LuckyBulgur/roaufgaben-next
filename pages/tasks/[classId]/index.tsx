import { NextPage } from 'next';
import getConfig from 'next/config';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaPlus, FaUserPlus } from 'react-icons/fa';

import TaskItem from '../../../components/tasks-item';
import useClasses from '../../../hooks/use-classes';
import useTasks from '../../../hooks/use-tasks';

interface TasksPageProps {
    classId: string;
}

const Tasks: NextPage<TasksPageProps> = ({ classId }) => {

    const [copied, setCopied] = useState(false);
    const { publicRuntimeConfig } = getConfig()

    const tasks = useTasks(classId);
    const classes = useClasses();

    useEffect(() => {
        if (!copied) return;

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }, [copied]);

    const copyLink = (link: string) => {
        if (copied) return;
        navigator.clipboard.writeText(link);
        setCopied(true);
    }

    return (
        <div className="min-h-screen min-w-screen flex flex-wrap ml-16 dark:bg-gradient-to-t from-myblue to-second" >
            <div className="w-full mt-4" >
                <div className="flex justify-center  dark:text-fontwhite text-3xl font-semibold items-center">
                    {classes && classes.isSuccess && classes.data?.find((c: any) => c.id == classId)?.name}
                </div>
                {classes && classes.isSuccess && classes.data?.find((c: any) => c.id == classId)?.link &&
                    <div className='ml-5'>
                        <button
                            onClick={() => { copyLink(`https://roaufgaben.de/join/${classes.data?.find((c: any) => c.id == classId)?.link}`) }}
                            type="button"
                            className="px-3 py-2 text-base bg-green-800 rounded-xl text-fontwhite">
                            {<div className='flex flex-row'><FaUserPlus></FaUserPlus><h1 className='ml-1 text-sm'>{(!copied) ? "Einladungslink kopieren" : "Link Kopiert"}</h1></div>}
                        </button>
                    </div>
                }
                {tasks && tasks.isSuccess && tasks.data?.map((task: any, index: number) => (
                    <TaskItem key={index} data={task}></TaskItem>
                ))}
                <Link href={`/tasks/${classId}/create`} passHref>
                    <div className="w-auto dark:text-fontwhite text-gray-800 flex justify-center items-center mr-2 h-20 mt-4 rounded-xl bg-gray-400 dark:bg-myblue backdrop-blur-xl bg-opacity-70 dark:bg-opacity-40 hover:border-green-600 hover:cursor-pointer border-2 ml-4" >
                        <FaPlus></FaPlus>
                    </div>
                </Link>
            </div>
        </div >
    );
}

Tasks.getInitialProps = ({ query }) => {
    return {
        classId: query.classId as string
    }
}

export default Tasks;