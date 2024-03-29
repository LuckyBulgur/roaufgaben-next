import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';

import { CreateClassForm } from '../../components/create-class-form';


const CreateClass: NextPage = () => {

    const router = useRouter();

    return (
        <div className={`min-h-screen min-w-screen flex dark:bg-gradient-to-t items-center justify-center ${!isMobile && "ml-16"} from-myblue to-second`}>
            <div className="dark:bg-myblue sm:dark:bg-opacity-20 sm:bg-opacity-20 dark:bg-opacity-0 bg-opacity-0 bg-gray-400 p-7 rounded-xl">
                <CreateClassForm onSuccess={() => router.push('/classes')}></CreateClassForm>
            </div>
        </div>
    );
}

export default CreateClass;