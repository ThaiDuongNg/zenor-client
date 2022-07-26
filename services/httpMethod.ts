import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { cloneDeep } from "lodash";
import { baseURl } from "../constants/api";
import authServices from "./authServices";

class Services {
  axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: baseURl,
      timeout: 60000,

      headers: {
        "Content-Type": "application/json",
        // 'Access-Control-Allow-Origin' : '*',
      },
    });
    //
    //! Interceptor request
    this.axios.interceptors.request.use(
      function (config: any) {
        const user = authServices.getUserInStorage();
        //attach token to header to every request
        if (user) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }

        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    //! Interceptor response
    this.axios.interceptors.response.use(
      function (config: any) {
        const newConfig: AxiosResponse<any> = cloneDeep(config);
        // console.log(config, 'newConfig');
        newConfig.data = config?.data?.data;
        return newConfig;
      },
      function (error) {
        console.log(error, "err");

        return Promise.reject(error);
      }
    );
  }

  attachTokenToHeader(token: string) {
    this.axios.interceptors.request.use(
      function (config: any) {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      function (error: any) {
        return Promise.reject(error);
      }
    );
  }

  get(url: string, config?: AxiosRequestConfig) {
    return this.axios.get(url, config);
  }

  post(url: string, data: any, config?: AxiosRequestConfig) {
    return this.axios.post(url, data, config);
  }

  delete(url: string, config?: AxiosRequestConfig) {
    return this.axios.delete(url, config);
  }

  put(url: string, data: any, config?: AxiosRequestConfig) {
    return this.axios.put(url, data, config);
  }
}

export default new Services();
