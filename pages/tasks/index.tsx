import { NextPage } from 'next';
import { useEffect } from 'react';

import Card from '../../components/card';
import TaskItem from '../../components/tasks-item';
import useAllTasks from '../../hooks/use-all-tasks';

interface TasksPageProps {
    classId: string;
}

const Tasks: NextPage<TasksPageProps> = () => {

    const tasks = useAllTasks();

    return (
        <div className="min-h-screen min-w-screen flex ml-16 dark:bg-gradient-to-t from-myblue to-second" >
            <Card className='sm:ml-10 w-full mr-3 mt-5 mb-10' title='Aufgaben'>
                {(tasks && tasks.isSuccess && tasks.data?.length != 0) ? tasks.data?.map((task: any, index: number) => (
                    <TaskItem key={index} data={task}></TaskItem>
                )) :
                    <div className='flex justify-center items-center h-screen w-full'>
                        <div className="text-fontwhite">Keine Aufgaben vorhanden</div>
                    </div>
                }
            </Card>
        </div >
    );
}

export default Tasks;