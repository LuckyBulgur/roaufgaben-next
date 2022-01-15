import { useQuery } from "react-query";
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export const fetchTasks = async (token: string, classId: string) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    const data = await fetch(`${publicRuntimeConfig.serverUrl}/class/tasks/` + classId, { headers });
    const json = await data.json();
    if (json.message == "Unauthorized") {
        return null;
    }
    return json;
}

const useTasks = (token: string, classId: string) => useQuery(['tasks'], () => fetchTasks(token, classId))

export default useTasks;

