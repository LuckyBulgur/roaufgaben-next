import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { CreateClassForm } from '../../components/create-class-form';


const CreateClass: NextPage = () => {

    const router = useRouter();

    return (
        <div className="min-h-screen min-w-screen flex bg-gradient-to-t items-center justify-center ml-16 from-myblue to-second" >
            <div className="bg-myblue bg-opacity-20 backdrop-blur-xl p-7 rounded-xl">
                <CreateClassForm onSuccess={() => router.push('/classes')}></CreateClassForm>
            </div>
        </div >
    );
}

export default CreateClass;