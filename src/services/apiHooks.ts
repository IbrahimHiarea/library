import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { AxiosError, type AxiosRequestConfig, type AxiosResponse } from "axios";

import axiosInstance from "./axiosInstance";

interface IUseGetAllProps<T> {
  url: string;
  options?: UseQueryOptions<T[], AxiosError>;
  axiosConfig?: AxiosRequestConfig;
}

// Generic GET All Hook
export function useGetAll<T>({
  url,
  options,
  axiosConfig,
}: IUseGetAllProps<T>) {
  const response = useQuery<T[], AxiosError>({
    queryKey: [url],
    queryFn: async () => {
      const res: AxiosResponse<T[]> = await axiosInstance.get<T[]>(
        url,
        axiosConfig
      );
      return res.data ?? res;
    },
    ...options,
    staleTime: 10 * 60 * 1000, // 10 minutes for this specific query
  });

  return response;
}

interface IUseGetByIdProps<T> {
  url: string;
  id: string;
  options?: UseQueryOptions<T, AxiosError>;
  axiosConfig?: AxiosRequestConfig;
}

// Generic GET By ID Hook
export function useGetById<T>({
  url,
  id,
  axiosConfig,
  options,
}: IUseGetByIdProps<T>) {
  const response = useQuery<T, AxiosError>({
    queryKey: [url, id],
    queryFn: async () => {
      const res: AxiosResponse<T> = await axiosInstance.get<T>(
        `${url}/${id}`,
        axiosConfig
      );

      return res.data ?? (res as any); // ? I have to go with as any otherwise I get ts error
    },
    enabled: !!id,
    ...options,
    staleTime: 10 * 60 * 1000, // 10 minutes for this specific query
  });
  return response;
}
