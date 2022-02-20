import { formatDistance } from 'date-fns';
import { de } from 'date-fns/locale';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';

interface ClassProps {
    data: {
        id: string;
        name: string;
        creator: {
            username: string;
            reg_date: string;
        }
        reg_date: string;
    }
}

const ClassItem: FC<ClassProps> = (props: ClassProps) => {
    return (
        <Link href={'/tasks/' + props.data.id} passHref>
            <div className="mt-4 dark:bg-myblue bg-gray-400 dark:border-white border-gray-500  dark:bg-opacity-50 shadow-lg p-3 text-fontwhite font-sans text-xl w-auto ml-4 mr-2 h-34 rounded-2xl hover:dark:border-green-700 hover:border-green-500 border-2 hover:cursor-pointer" key={props.data.id}>
                <div className="font-medium dark:text-authgreen text-gray-600 text-2xl ml-2 mt-2 font-sans">Klasse {props.data.name}</div>
                <div className="text-xs ml-2 dark:text-fontwhite text-gray-800 font-sans">Erstellt {formatDistance(new Date(props.data.reg_date), new Date(), {
                    addSuffix: true,
                    locale: de
                })}</div>
                <div className="flex justify-end">
                    <div className="text-xs ml-2 mt-4 dark:text-fontwhite text-gray-800 mr-2 font-sans">Erstellt von {props.data.creator.username}</div>
                </div>
            </div>
        </Link>
    );
}

export default ClassItem;