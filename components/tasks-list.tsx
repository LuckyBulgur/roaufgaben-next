import { FC, useEffect, useState } from "react";
import useTasks from "../hooks/use-tasks";
import { format, formatDistance } from "date-fns";
import { de } from "date-fns/locale";
import { FaPlus } from "react-icons/fa";
import { Subject } from '../enums/subject'

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

interface TaskListProps {
    classId: string;
}

const TaskList: FC<TaskListProps> = ({ classId }) => {

    let tasks: any;

    if (typeof window !== 'undefined') {
        tasks = useTasks(localStorage.getItem('authtoken') as string, classId);
    }

    return (
        <div className="w-full mt-4" >
            {tasks && tasks.isSuccess && tasks.data?.map((task: any, index: number) => (
                <TaskItem key={index} data={task}></TaskItem>
            ))}
            <div onClick={() => window.location.assign('/tasks/' + classId + "/create")} className="w-auto flex justify-center items-center mr-2 h-20 mt-4 rounded-xl bg-myblue backdrop-blur-xl bg-opacity-40 hover:border-green-600 hover:cursor-pointer border-2 text-fontwhite ml-4" >
                <FaPlus></FaPlus>
            </div>
        </div >
    );

}

export default TaskList;