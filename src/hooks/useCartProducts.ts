import {
  useState,
  useEffect,
}                   from 'react';
import useSWR, {
  Fetcher,
  SWRResponse,
}                   from 'swr';
import { map }      from 'lodash';
import { callApi }  from '../apiCaller';
import { IProduct } from '../typings';

export const cartFetcher: Fetcher<IProduct[], number[]> = async (ids) => !ids.length
  ? []
  : Promise.all(map<number, Promise<IProduct>>(ids, async (id) => {
    const { data } = await callApi<IProduct>(`/${id}`);

    return data;
  }));

export const useCartProducts = (): SWRResponse<IProduct[]> => {
  const [cartProductsIds, setCartProductsIds] = useState<number[]>([]);

  useEffect(() => {
    const storageIds: number[] = JSON.parse(localStorage.getItem('cart') ?? '[]');

    setCartProductsIds(storageIds);
  }, []);

  return useSWR<IProduct[]>(cartProductsIds, cartFetcher);
};
