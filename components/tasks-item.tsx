import { formatDistance } from 'date-fns';
import { de } from 'date-fns/locale';
import { FC, useEffect, useState } from 'react';

import { Subject } from '../enums/subject';

interface TaskProps {
    data: {
        id: string;
        subject: number;
        task: string;
        submission: string;
        author: {
            username: string;
            reg_date: string;
        };
        reg_date: string;
    }
}

const TaskItem: FC<TaskProps> = (props: TaskProps) => {
    return (
        <div className="mt-4 dark:bg-myblue bg-gray-400 dark:border-white border-gray-500  dark:bg-opacity-50 border-2 shadow-lg p-3 text-fontwhite font-sans text-xl w-auto ml-4 mr-2 h-34 rounded-2xl hover:cursor-pointer" key={props.data.id}>
            <div className="font-medium dark:text-fontwhite text-gray-800 text-2xl ml-2 mt-2 font-sans">Fach: {Subject[props.data.subject]}</div>
            <div className="font-medium dark:text-fontwhite text-gray-800 text-2xl ml-2 font-sans">Aufgabe: {props.data.task}</div>
            <div className="text-xs ml-2 dark:text-fontwhite text-gray-800 font-sans">Fällig {formatDistance(new Date(props.data.submission), new Date(), {
                addSuffix: true,
                locale: de
            })}</div>
            <div className="flex justify-end">
                <div className="text-xs ml-2 dark:text-fontwhite text-gray-800 mt-4 mr-2 font-sans">Erstellt von {props.data.author.username}</div>
            </div>
        </div>
    );
}

export default TaskItem;