import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import createAxiosInstance from '../axiosConfig/AxiosConfig';

export const useAxiosInstance = () => {
  const navigate = useNavigate();
  
  const axiosInstance = useMemo(() => {
    return createAxiosInstance(navigate);
  }, [navigate]);

  return axiosInstance;
};