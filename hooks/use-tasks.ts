import Cookies from 'js-cookie';
import getConfig from 'next/config';
import { useQuery } from 'react-query';

const { publicRuntimeConfig } = getConfig()

export const fetchTasks = async (classId: string) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + Cookies.get("access_token"));
    const data = await fetch(`${publicRuntimeConfig.serverUrl}/class/tasks/` + classId, { headers });
    const json = await data.json();
    if (json.message == "Unauthorized") {
        return null;
    }
    return json;
}

const useTasks = (classId: string) => useQuery(['tasks'], () => fetchTasks(classId))

export default useTasks;

