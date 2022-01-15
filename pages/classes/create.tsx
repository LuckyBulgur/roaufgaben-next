import { NextPage } from "next";
import { CreateClassForm } from "../../components/create-class-form";
import TaskList from "../../components/tasks-list";


const CreateClass: NextPage = () => {

    return (
        <div className="min-h-screen min-w-screen flex bg-gradient-to-t items-center justify-center ml-16 from-myblue to-second" >
            <div className="bg-myblue bg-opacity-20 backdrop-blur-xl p-7 rounded-xl">
                <CreateClassForm onSuccess={() => window.location.assign('/classes')}></CreateClassForm>
            </div>
        </div >
    );
}

export default CreateClass;