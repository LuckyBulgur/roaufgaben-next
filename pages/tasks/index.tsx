import { NextPage } from 'next';
import { useEffect } from 'react';

import TaskItem from '../../components/tasks-item';
import useAllTasks from '../../hooks/use-alltasks';

interface TasksPageProps {
    classId: string;
}

const Tasks: NextPage<TasksPageProps> = () => {

    const tasks = useAllTasks();

    return (
        <div className="min-h-screen min-w-screen flex flex-wrap bg-gradient-to-t ml-16 from-myblue to-second" >
            <div className="w-full mt-4" >
                {tasks && tasks.isSuccess && tasks.data?.map((task: any, index: number) => (
                    <TaskItem key={index} data={task}></TaskItem>
                ))}
            </div>
        </div >
    );
}

export default Tasks;