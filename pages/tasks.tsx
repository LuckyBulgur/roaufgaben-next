import { NextPage } from "next";
import { Title } from "../components/nav";

const Tasks: NextPage = () => {
    return (
        <div className="min-h-screen min-w-screen flex justify-center items-center bg-center bg-gradient-to-t from-myblue to-second" >
            <div className="bg-myblue bg-opacity-40 h-screen w-screen sm:w-auto sm:h-auto backdrop-blur-xl p-7 rounded-xl flex flex-col justify-center">
                <Title>Aufgaben</Title>
            </div>
        </div >
    );
}

export default Tasks;