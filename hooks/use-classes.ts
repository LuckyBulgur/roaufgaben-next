import Cookies from 'js-cookie';
import getConfig from 'next/config';
import { useQuery } from 'react-query';

const { publicRuntimeConfig } = getConfig()

export const fetchClasses = async () => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', 'Bearer ' + Cookies.get("access_token"));
  const data = await fetch(`${publicRuntimeConfig.serverUrl}/user/classes`, { headers });
  const json = await data.json();
  if (json.message == "Unauthorized") {
    return null;
  }
  return json;
}

const useClasses = () => useQuery(['classes'], () => fetchClasses())

export default useClasses;

