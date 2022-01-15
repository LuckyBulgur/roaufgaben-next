import { useMutation } from "react-query";
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const createClassMutation = () => useMutation(async (data: { name: string, token: string }) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + data.token);
    const response = await fetch(`${publicRuntimeConfig.serverUrl}/class/create`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            name: data.name,
        }),
    });
    return await response.json()
});

export default createClassMutation;