import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

export async function callApi<TResponse>(
  url     : string,
  config? : AxiosRequestConfig,
): Promise<AxiosResponse<TResponse>> {
  return axios<TResponse>({
    ...config,
    baseURL : 'https://dummyjson.com/products',
    method  : 'GET',
    url,
  });
}


