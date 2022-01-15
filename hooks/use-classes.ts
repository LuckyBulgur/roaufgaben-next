import { useQuery } from "react-query";
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export const fetchClasses = async (token: string) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', 'Bearer ' + token);
  const data = await fetch(`${publicRuntimeConfig.serverUrl}/user/classes`, { headers });
  const json = await data.json();
  if (json.message == "Unauthorized") {
    return null;
  }
  return json;
}

const useClasses = (token: string) => useQuery(['classes'], () => fetchClasses(token))

export default useClasses;

