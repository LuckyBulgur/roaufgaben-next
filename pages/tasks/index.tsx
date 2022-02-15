import { NextPage } from 'next';
import { useEffect } from 'react';

import TaskItem from '../../components/tasks-item';
import useAllTasks from '../../hooks/use-alltasks';

interface TasksPageProps {
    classId: string;
}

const Tasks: NextPage<TasksPageProps> = () => {

    const tasks = useAllTasks();
    console.log(tasks)

    return (
        <div className="min-h-screen min-w-screen flex flex-wrap bg-gradient-to-t ml-16 from-myblue to-second" >
            {(tasks && tasks.isSuccess && tasks.data?.length != 0) ? tasks.data?.map((task: any, index: number) => (
                <div className="w-full mt-4" key={index}>
                    <TaskItem key={index} data={task}></TaskItem>
                </div>
            )) :
                <div className='flex justify-center items-center w-full'>
                    <div className="text-fontwhite">Keine Aufgaben vorhanden</div>
                </div>
            }
        </div >
    );
}

export default Tasks;