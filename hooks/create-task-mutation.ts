import { useMutation } from "react-query";
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const createTaskMutation = () => useMutation(async (data: { subject: string, task: string, submission: string, token: string, classId: string }) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + data.token);
    const response = await fetch(`${publicRuntimeConfig.serverUrl}/tasks/create/${data.classId}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            subject: parseInt(data.subject),
            task: data.task,
            submission: data.submission
        }),
    });
    return await response.json()
});

export default createTaskMutation;