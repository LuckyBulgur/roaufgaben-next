import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FaPlus } from 'react-icons/fa';

import ClassItem from '../../components/class-item';
import useClasses from '../../hooks/use-classes';

const Classes: NextPage = () => {

    const classes = useClasses();
    const router = useRouter();

    return (
        <div className="min-h-screen min-w-screen flex ml-16 dark:bg-gradient-to-t from-myblue to-second" >
            <div className="w-full mt-4" >
                {classes && classes.isSuccess && classes.data?.map((_class: any, index: number) => (
                    <ClassItem key={index} data={_class}></ClassItem>
                ))}
                <div onClick={() => router.push('/classes/create')} className="w-auto flex justify-center items-center mr-2 h-20 mt-4 rounded-xl bg-gray-400 dark:bg-myblue b backdrop-blur-xl bg-opacity-70 dark:bg-opacity-40 hover:border-green-600 hover:cursor-pointer border-2 dark:text-fontwhite text-gray-800 ml-4" >
                    <FaPlus></FaPlus>
                </div>
            </div >
        </div >
    );
}

export default Classes;