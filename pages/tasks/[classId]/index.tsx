import { NextPage } from 'next';
import getConfig from 'next/config';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';

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
        <div className="min-h-screen min-w-screen flex flex-wrap bg-gradient-to-t ml-16 from-myblue to-second" >
            <div className="w-full mt-4" >
                <div className="flex justify-center text-fontwhite text-3xl font-semibold items-center">
                    {classes && classes.isSuccess && classes.data?.find((c: any) => c.id == classId)?.name}
                </div>
                {tasks && tasks.isSuccess && tasks.data?.map((task: any, index: number) => (
                    <TaskItem key={index} data={task}></TaskItem>
                ))}
                <Link href={`/tasks/${classId}/create`} passHref>
                    <div className="w-auto flex justify-center items-center mr-2 h-20 mt-4 rounded-xl bg-myblue backdrop-blur-xl bg-opacity-40 hover:border-green-600 hover:cursor-pointer border-2 text-fontwhite ml-4" >
                        <FaPlus></FaPlus>
                    </div>
                </Link>
                {classes && classes.isSuccess &&
                    <div className='absolute bottom-5 right-5'>
                        <div className="overflow-hidden rounded-lg w-max transform transition hover:scale-110 relative">
                            <button
                                onClick={() => { copyLink(`https://roaufgaben.de/join/${classes.data?.find((c: any) => c.id == classId)?.link}`) }}
                                type="button"
                                className="px-3 py-2 text-base bg-green-800 rounded-xl text-fontwhite">
                                {(copied) ? "Link kopiert!" : "Einladungslink kopieren"}
                            </button>
                        </div>
                    </div>
                }
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