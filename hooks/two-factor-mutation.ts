import { useMutation } from "react-query";
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const twoFactorMutation = () => useMutation(async (data: { username: string, password: string, twoFactor: string }) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const response = await fetch(`${publicRuntimeConfig.serverUrl}/auth/verify`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            username: data.username,
            password: data.password,
            twoFactor: data.twoFactor
        }),
    });
    return await response.json()
});

export default twoFactorMutation;