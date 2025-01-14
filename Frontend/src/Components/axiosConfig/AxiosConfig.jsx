import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Créer une instance personnaliser du axios
const createAxiosInstance = (navigate) => {
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:8090'
  });
 //dans ce block de code on intercepte chaque request 
  axiosInstance.interceptors.request.use(
    //config ici refere au requette
    (config) => {
        //ce block de code recupere les token de session et l'injecter dans le header du requette (config)
      const token = sessionStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      // on retourne la nouvelle requette pour qu'il continue son chemain vers l'api
      return config;
    },
    // ici on gère les erreurs qui peut etre apparaitre lors de l'interception
    (error) => {
      return Promise.reject(error);
    }
  );

  //maintenent on intercepte les reponse de l'api
  axiosInstance.interceptors.response.use(
    //ici on gère les reponse de l'api si auncun probleme est present , dans ce cas on va sauf retourner la repense comme elle est
    (response) => {
      return response;
    },
    //ici on gère les erreurs qui peut etre apparaitre lors de la repense du api
    (error) => {
      if (error.response) {
        if (error.response.status === 500 || error.response.status === 401) {
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('expirationLimit');
          navigate('/Signin');
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default createAxiosInstance;