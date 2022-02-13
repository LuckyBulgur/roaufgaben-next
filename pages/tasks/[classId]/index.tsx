import { NextPage } from 'next';
import Link from 'next/link';
import { useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';

import TaskItem from '../../../components/tasks-item';
import useTasks from '../../../hooks/use-tasks';

interface TasksPageProps {
    classId: string;
}

const Tasks: NextPage<TasksPageProps> = ({ classId }) => {

    const tasks = useTasks(classId);

    return (
        <div className="min-h-screen min-w-screen flex flex-wrap bg-gradient-to-t ml-16 from-myblue to-second" >
            <div className="w-full mt-4" >
                {tasks && tasks.isSuccess && tasks.data?.map((task: any, index: number) => (
                    <TaskItem key={index} data={task}></TaskItem>
                ))}
                <Link href={`/tasks/${classId}/create`} passHref>
                    <div className="w-auto flex justify-center items-center mr-2 h-20 mt-4 rounded-xl bg-myblue backdrop-blur-xl bg-opacity-40 hover:border-green-600 hover:cursor-pointer border-2 text-fontwhite ml-4" >
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