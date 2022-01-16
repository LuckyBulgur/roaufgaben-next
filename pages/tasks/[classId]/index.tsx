import { Button } from "evergreen-ui";
import { NextPage } from "next";
import TaskList from "../../../components/tasks-list";

interface TasksPageProps {
    classId: string;
}

const Tasks: NextPage<TasksPageProps> = ({ classId }) => {

    return (
        <div className="min-h-screen min-w-screen flex flex-wrap bg-gradient-to-t ml-16 from-myblue to-second" >
            <TaskList classId={classId}></TaskList>
        </div >
    );
}

Tasks.getInitialProps = ({ query }) => {
    return {
        classId: query.classId as string
    }
}

export default Tasks;