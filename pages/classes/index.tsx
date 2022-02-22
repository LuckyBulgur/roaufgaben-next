import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FaPlus } from 'react-icons/fa';

import Card from '../../components/card';
import ClassItem from '../../components/class-item';
import Tooltip from '../../components/tooltip';
import useClasses from '../../hooks/use-classes';

const Classes: NextPage = () => {

    const classes = useClasses();
    const router = useRouter();

    return (
        <div className="min-h-screen min-w-screen flex ml-16 dark:bg-gradient-to-t from-myblue to-second" >
            <Card className='sm:ml-10 w-full mr-3 mt-5 mb-10' title='Klassen'>
                {(classes && classes.isSuccess && classes.data?.length != 0) && classes.data?.map((_class: any, index: number) => (
                    <Tooltip text="Klasse ansehen">
                        <ClassItem key={index} data={_class}></ClassItem>
                    </Tooltip>
                ))}
                <Tooltip text="Klasse erstellen">
                    <div onClick={() => router.push('/classes/create')} className="flex justify-center items-center mt-4 dark:bg-myblue bg-gray-400 dark:bg-opacity-50 shadow-lg p-3 text-fontwhite font-sans text-xl w-auto ml-4 mr-2 h-16 rounded-xl hover:dark:border-green-700 hover:border-green-500 border-2 dark:border-white border-gray-500 hover:cursor-pointer" >
                        <FaPlus className='text-gray-600 dark:text-fontwhite'></FaPlus>
                    </div>
                </Tooltip>
            </Card>
        </div >
    );
}

export default Classes;