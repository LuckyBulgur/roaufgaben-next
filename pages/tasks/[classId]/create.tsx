import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { CreateTaskForm } from '../../../components/create-task-form';

interface TasksPageProps {
    classId: string;
}

const CreateTask: NextPage<TasksPageProps> = ({ classId }) => {

    const router = useRouter();

    return (
        <div className="min-h-screen min-w-screen flex dark:bg-gradient-to-t items-center justify-center ml-16 from-myblue to-second" >
            <div className="dark:bg-myblue bg-gray-400 dark:bg-opacity-20 backdrop-blur-xl p-7 rounded-xl">
                <CreateTaskForm onSuccess={() => router.push('/tasks/' + classId)} classId={classId}></CreateTaskForm>
            </div>
        </div >
    );
}

CreateTask.getInitialProps = ({ query }) => {
    return {
        classId: query.classId as string
    }
}

export default CreateTask;