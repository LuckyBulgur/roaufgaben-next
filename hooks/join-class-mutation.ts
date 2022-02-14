import Cookies from 'js-cookie';
import getConfig from 'next/config';
import { useMutation } from 'react-query';

const { publicRuntimeConfig } = getConfig()

const joinClassMutation = () => useMutation(async (classUUID: string) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + Cookies.get("access_token"));
    const response = await fetch(`${publicRuntimeConfig.serverUrl}/user/join/${classUUID}`, {
        method: 'POST',
        headers
    });
    return await response.json()
});

export default joinClassMutation;