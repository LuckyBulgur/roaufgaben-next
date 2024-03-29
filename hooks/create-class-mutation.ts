import Cookies from 'js-cookie';
import getConfig from 'next/config';
import { useMutation } from 'react-query';

const { publicRuntimeConfig } = getConfig()

const createClassMutation = () => useMutation(async (data: { name: string }) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + Cookies.get("access_token"));
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