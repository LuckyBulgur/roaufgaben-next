import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Card from '../../../components/card';
import joinClassMutation from '../../../hooks/join-class-mutation';

interface JoinPageProps {
    classUUID: string;
}

const Join: NextPage<JoinPageProps> = ({ classUUID }) => {

    const [error, setError] = useState<string | null>(null);
    const useJoinClass = joinClassMutation();
    const router = useRouter();

    const joinClass = async () => {
        if (error) return;
        const joinClassResult = await useJoinClass.mutateAsync(classUUID);

        if (joinClassResult.message == "Erfolgreich beigetreten") {
            router.push('/class/' + joinClassResult.classId);
        } else {
            setError(joinClassResult.message);
        }
    }


    return (
        <div className="min-h-screen min-w-screen flex flex-wrap bg-gradient-to-t ml-16 from-myblue to-second" >
            <div className='flex justify-center items-center w-full'>
                <Card title='Klasse beitreten'>
                    <button onClick={joinClass} className='w-max bg-authgreen text-myblue font-medium px-4 hover:bg-secgreen py-2 rounded-lg'>{error ?? "Dieser Klasse beitreten"}</button>
                </Card>
            </div >
        </div >
    );
}

Join.getInitialProps = ({ query }) => {
    return {
        classUUID: query.classUUID as string
    }
}

export default Join;