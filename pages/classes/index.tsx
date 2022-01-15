import { NextPage } from "next";
import { useEffect } from "react";
import { Title } from "../../components/nav";
import ClassList from '../../components/class-list';
import useClasses from "../../hooks/use-classes";

const Classes: NextPage = () => {
    return (
        <div className="min-h-screen min-w-screen flex bg-gradient-to-t ml-16 from-myblue to-second" >
            <ClassList></ClassList>
        </div >
    );
}

export default Classes;