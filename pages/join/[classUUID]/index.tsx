import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

import Card from '../../../components/card';
import joinClassMutation from '../../../hooks/join-class-mutation';
import useClassByUUID from '../../../hooks/use-class-uuid';

interface JoinPageProps {
    classUUID: string;
}

const Join: NextPage<JoinPageProps> = ({ classUUID }) => {

    const [error, setError] = useState<string | null>(null);
    const useJoinClass = joinClassMutation();
    const classByUUID = useClassByUUID(classUUID);
    const router = useRouter();

    const joinClass = async () => {
        if (error) return;
        const joinClassResult = await useJoinClass.mutateAsync(classUUID);

        if (joinClassResult.message == "Erfolgreich beigetreten") {
            router.push('/tasks/' + joinClassResult.classId);
        } else {
            setError(joinClassResult.message);
        }
    }


    return (
        <div className={`min-h-screen min-w-screen flex flex-wrap dark:bg-gradient-to-t ${!isMobile && "ml-16"} from-myblue to-second`} >
            <div className='flex justify-center items-center w-full'>
                {classByUUID && classByUUID.isSuccess && classByUUID.data &&
                    <Card title={`Klasse ${classByUUID.data.name}`}>
                        <div className='flex justify-center'>
                            <button onClick={joinClass} className='w-max bg-authgreen text-myblue font-medium px-4 hover:bg-secgreen py-2 rounded-lg'>{error ?? `Klasse beitreten`}</button>
                        </div>
                    </Card>
                }
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