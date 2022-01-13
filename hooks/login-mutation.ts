import { useMutation } from "react-query";
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const loginMutation = () => useMutation(async (data: { username: string, password: string }) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const response = await fetch(`${publicRuntimeConfig.serverUrl}/auth/login`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            username: data.username,
            password: data.password
        }),
    });
    return await response.json()
});

export default loginMutation;