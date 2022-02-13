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
        <div className="min-h-screen min-w-screen flex bg-gradient-to-t ml-16 from-myblue to-second" >
            <div className='flex w-full items-center'>
                <Card className='ml-32' title='Neuste Aufgaben'>
                    {newTasks && newTasks.isSuccess && newTasks.data?.map((task: any, index: number) => (
                        <CardItem key={index}>
                            <div className='flex flex-wrap text-2xl m-0 flex-col'>
                                <div className='font-semibold text-authgreen'>{Subject[task.subject]}</div>
                                <div className='text-lg mt-1 text-gray-200'>{task.task}</div>
                                <div className='flex text-tiny pl-3 text-gray-200 pr-3 w-max mt-4 bg-myblue rounded-lg'>
                                    {formatDistance(new Date(task.reg_date), new Date(), {
                                        addSuffix: true,
                                        locale: de
                                    })}
                                </div>
                            </div>
                        </CardItem>
                    ))}
                </Card>

                <Card className='ml-20 w-3/4 mr-4' title='Dringende Aufgaben'>
                    {tasks && tasks.isSuccess && tasks.data?.map((task: any, index: number) => (
                        <CardItem key={index}>
                            <div className='flex flex-wrap text-2xl m-0 flex-col'>
                                <div className='font-semibold text-authgreen'>{Subject[task.subject]}</div>
                                <div className='text-lg mt-1 text-gray-200'>{task.task}</div>
                                <div className='flex text-tiny pl-3 text-gray-200 pr-3 w-max mt-4 bg-myblue rounded-lg'>
                                    {formatDistance(new Date(task.submission), new Date(), {
                                        addSuffix: true,
                                        locale: de
                                    })}
                                </div>
                            </div>
                        </CardItem>
                    ))}
                </Card>
            </div>
        </div >
    )
}

export default Dashboard;