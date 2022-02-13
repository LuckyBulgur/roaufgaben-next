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
            <div className="w-auto mr-2 h-24 mt-4 rounded-xl bg-myblue backdrop-blur-xl bg-opacity-40 hover:border-green-600 hover:cursor-pointer border-2 text-fontwhite ml-4" key={props.data.id}>
                <div className="font-medium text-2xl ml-2 mt-2 font-sans">Klasse {props.data.name}</div>
                <div className="text-xs ml-2 font-sans">Erstellt {formatDistance(new Date(props.data.reg_date), new Date(), {
                    addSuffix: true,
                    locale: de
                })}</div>
                <div className="flex justify-end">
                    <div className="text-xs ml-2 mt-4 mr-2 font-sans">Erstellt von {props.data.creator.username}</div>
                </div>
            </div>
        </Link>
    );
}

export default ClassItem;