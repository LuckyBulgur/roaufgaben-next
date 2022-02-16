import { formatDistance } from 'date-fns';
import { de } from 'date-fns/locale';
import { NextPage } from 'next';

import Card, { CardItem } from '../components/card';
import { Subject } from '../enums/subject';
import useAllTasks from '../hooks/use-alltasks';
import useNewestTasks from '../hooks/use-newtasks';

const Dashboard: NextPage = () => {

    const newTasks = useNewestTasks();
    const tasks = useAllTasks();

    return (
        <div className="min-h-screen min-w-screen flex ml-16 dark:bg-gradient-to-t from-myblue to-second" >
            <div className='flex w-full items-center flex-col sm:flex-row'>
                <Card className='sm:ml-10 sm:w-30 w-64 md:w-[30%] mt-5 sm:mt-0' title='Neuste Aufgaben'>
                    {(newTasks && newTasks.isSuccess && newTasks.data?.length != 0) ? newTasks.data?.map((task: any, index: number) => (
                        (index < 3) &&
                        <CardItem key={index}>
                            <div className='flex flex-wrap text-2xl m-0 flex-col'>
                                <div className='font-semibold dark:text-authgreen'>{Subject[task.subject]}</div>
                                <div className='text-lg mt-1 text-gray-200'>{task.task}</div>
                                <div className='flex text-tiny pl-3 text-gray-200 pr-3 w-max mt-4 bg-gray-700 dark:bg-myblue rounded-lg'>
                                    {formatDistance(new Date(task.reg_date), new Date(), {
                                        addSuffix: true,
                                        locale: de
                                    })}
                                </div>
                            </div>
                        </CardItem>
                    )) : <CardItem><div className='text-center text-gray-200'>Keine Aufgaben vorhanden</div></CardItem>}
                </Card>
                <Card className='sm:ml-5 sm:w-30 w-64 mt-5 md:w-[70%] sm:mt-0 sm:mr-3' title='Dringende Aufgaben'>
                    {(tasks && tasks.isSuccess && tasks.data?.length != 0) ? tasks.data?.map((task: any, index: number) => (
                        (index < 3) &&
                        <CardItem key={index}>
                            <div className='flex flex-wrap text-2xl m-0 flex-col'>
                                <div className='font-semibold dark:text-authgreen'>{Subject[task.subject]}</div>
                                <div className='text-lg mt-1 text-gray-200'>{task.task}</div>
                                <div className='flex text-tiny pl-3 text-gray-200 pr-3 w-max mt-4 bg-gray-700 dark:bg-myblue rounded-lg'>
                                    {formatDistance(new Date(task.submission), new Date(), {
                                        addSuffix: true,
                                        locale: de
                                    })}
                                </div>
                            </div>
                        </CardItem>
                    )) : <CardItem><div className='text-center text-gray-200'>Keine Aufgaben vorhanden</div></CardItem>}
                </Card>
            </div>
        </div >
    )
}

export default Dashboard;