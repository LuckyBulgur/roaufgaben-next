import { formatDistance } from 'date-fns';
import { de } from 'date-fns/locale';
import { NextPage } from 'next';
import Img from 'next/image';
import { isMobile } from 'react-device-detect';
import { FaWifi } from 'react-icons/fa';
import parser from 'ua-parser-js';

import Card, { CardItem } from '../components/card';
import { SignOut } from '../components/sign-out';
import { OperationSystems } from '../constants/os';
import useSessions from '../hooks/use-sessions';

const Settings: NextPage = () => {

    const sessions = useSessions();

    const getBrowserName = (userAgent: string, lowerCase?: boolean) => {
        const browserName = parser(userAgent).browser.name;
        return (lowerCase) ? browserName?.toLowerCase() : browserName;
    }

    const getOS = (userAgent: string, logo?: boolean) => {
        const os = parser(userAgent).os;

        for (let item of OperationSystems) {
            if (item[0] == os.name) {
                if (logo) {
                    return item[1];
                }
            }
        }
        return os.name;
    }

    return (
        <div className={`min-h-screen flex min-w-screen ${!isMobile && "ml-16"} bg-center dark:bg-gradient-to-t from-myblue to-second`} >

            <div className="flex w-full justify-center items-center flex-col">
                <Card className='sm:ml-10 dark:bg-opacity-0 sm:w-96 w-80 md:w-[50%] mt-5' title='Letzten 4 Anmeldungen'>
                    {(sessions && sessions.isSuccess && sessions.data?.length != 0) ? sessions.data?.map((session: any, index: number) => (
                        (index < 4) &&
                        <CardItem key={index}>
                            <div className='flex flex-wrap text-2xl m-0'>
                                <div className='w-full items-center flex flex-row'>
                                    <Img height={58} width={58} alt="Browser" src={`https://cdnjs.cloudflare.com/ajax/libs/browser-logos/70.4.1/${getBrowserName(session.userAgent, true)}/${getBrowserName(session.userAgent, true)}.png`}></Img>
                                    <div className='font-semibold dark:text-authgreen ml-2'>{getBrowserName(session.userAgent)}</div>
                                    <div className='flex w-full justify-end items-center'>
                                        <Img height={42} width={42} alt="OS" src={`https://raw.githubusercontent.com/EgoistDeveloper/operating-system-logos/master/src/128x128/${getOS(session.userAgent, true)}.png`}></Img>
                                    </div>
                                </div>
                                <div className='flex w-full flex-col mt-2'>
                                    <div className='flex ml-1 items-center flex-col sm:flex-row'>
                                        <FaWifi></FaWifi>
                                        <div className='text-sm lg:text-lg mt-1 ml-1 text-gray-200'>{session.ip}</div>
                                        <div className='mt-1 ml-1 text-sm lg:text-lg text-gray-200'>{session.location}</div>
                                    </div>
                                    <div className='flex text-tiny pl-3 text-gray-200 pr-3 w-max mt-4 bg-gray-700 dark:bg-myblue rounded-lg'>
                                        {formatDistance(new Date(session.reg_date), new Date(), {
                                            addSuffix: true,
                                            locale: de
                                        })}
                                    </div>
                                </div>
                            </div>
                        </CardItem>
                    )) : <CardItem><div className='text-center text-gray-200'>Keine Anmeldungen vorhanden</div></CardItem>}
                </Card>
                <SignOut className='mt-2 pb-20'></SignOut>
            </div>
        </div >
    );
}

export default Settings;