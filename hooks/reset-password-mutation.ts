import Cookies from 'js-cookie';
import getConfig from 'next/config';
import { useMutation } from 'react-query';

const { publicRuntimeConfig } = getConfig()

const resetPasswordMutation = () => useMutation(async (data: { password: string }) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + Cookies.get("access_token"));
    const response = await fetch(`${publicRuntimeConfig.serverUrl}/user/change-password`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            password: data.password
        }),
    });
    return await response.json()
});

export default resetPasswordMutation;