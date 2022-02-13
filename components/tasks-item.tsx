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
        <div className="w-auto mr-2 h-34 mt-4 rounded-xl bg-myblue backdrop-blur-xl bg-opacity-40 hover:border-green-600 hover:cursor-pointer border-2 text-fontwhite ml-4" key={props.data.id}>
            <div className="font-medium text-2xl ml-2 mt-2 font-sans">Fach: {Subject[props.data.subject]}</div>
            <div className="font-medium text-2xl ml-2 font-sans">Aufgabe: {props.data.task}</div>
            <div className="text-xs ml-2 mb-0 font-sans">Fällig {formatDistance(new Date(props.data.submission), new Date(), {
                addSuffix: true,
                locale: de
            })}</div>
            <div className="flex justify-end">
                <div className="text-xs ml-2 mt-4 mr-2 font-sans">Erstellt von {props.data.author.username}</div>
            </div>
        </div>
    );
}

export default TaskItem;