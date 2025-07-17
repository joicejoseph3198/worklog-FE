import {useAuth, useClerk } from "@clerk/clerk-react";
import axios from "axios";
import { createContext, useContext } from "react";

export const axiosContext = createContext(null);
export const useAxios = () => useContext(axiosContext);

export const AxiosProvider = ({ children }) => {
  const { getToken } = useAuth();
  const {signOut} = useClerk();

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/v1/api",
    headers: {
      "Content-Type": "application/json",
    },
  });

  axiosInstance.interceptors.request.use(
    async (config) => {
      // Check for custom flag
      // await axiosInstance.get("/public-endpoint", { public: true });
      if (config.public) {
        return config; 
      }
  
      const accessToken = await getToken();
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      const status = error.response ? error.response.status : null;

      if (status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          // Try to get a fresh token again
          const accessToken = await getToken();
          if (accessToken) {
            originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
            return axiosInstance(originalRequest);
          } else {
            // No token: session expired
            signOut();
            return Promise.reject(error);
          }
        } catch (refreshError) {
            signOut();
          console.error("Token refresh failed:", refreshError);
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );

  return (
    <axiosContext.Provider value={axiosInstance}>
      {children}
    </axiosContext.Provider>
  );
};
