import Cookies from 'js-cookie';
import getConfig from 'next/config';
import { useQuery } from 'react-query';

const { publicRuntimeConfig } = getConfig()

export const fetchClassByUUID = async (uuid: string) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + Cookies.get("access_token"));
    const data = await fetch(`${publicRuntimeConfig.serverUrl}/class/` + uuid, { headers });
    const json = await data.json();
    if (json.message == "Unauthorized") {
        return null;
    }
    return json;
}

const useClassByUUID = (uuid: string) => useQuery(['classbyuuid'], () => fetchClassByUUID(uuid))

export default useClassByUUID;

