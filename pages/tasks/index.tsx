import { NextPage } from 'next';
import { useEffect } from 'react';

import TaskItem from '../../components/tasks-item';
import useAllTasks from '../../hooks/use-all-tasks';

interface TasksPageProps {
    classId: string;
}

const Tasks: NextPage<TasksPageProps> = () => {

    const tasks = useAllTasks();

    return (
        <div className="min-h-screen min-w-screen flex flex-col ml-16 dark:bg-gradient-to-t from-myblue to-second" >
            {(tasks && tasks.isSuccess && tasks.data?.length != 0) ? tasks.data?.map((task: any, index: number) => (
                <div className="w-full" key={index}>
                    <TaskItem data={task}></TaskItem>
                </div>
            )) :
                <div className='flex justify-center items-center h-screen w-full'>
                    <div className="text-fontwhite">Keine Aufgaben vorhanden</div>
                </div>
            }
        </div >
    );
}

export default Tasks;