import type { NextPage } from 'next';
import SideBar from '../components/SideBar';

const Dashboard: NextPage = () => {
    return (
        <div className="flex ">
            <SideBar />
        </div>
    )
}

export default Dashboard;