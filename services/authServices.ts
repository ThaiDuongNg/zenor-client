import { IAccount, ResponseGenerator } from "../interfaces";
import axios, { AxiosResponse } from "axios";
import { baseURl, auth } from "constants/api";
import { isString } from "lodash";
import httpMethod from "./httpMethod";

const USER_STORAGE = "ZENOR_USER";

class AuthService {
  login(email: string, password: string): any {
    return axios.post(baseURl + auth.LOGIN, {
      email,
      password,
    });
  }

  resgister(body: IAccount): any {
    return axios.post(baseURl + auth.REGISTER, body);
  }

  getProfile(): any {
    return httpMethod.get(auth.PROFILE);
  }

  updateProfile(payload: any) {
    return httpMethod.put(baseURl + auth.PROFILE, payload);
  }

  saveUserToStorage(data?: any) {
    window.localStorage.setItem(USER_STORAGE, JSON.stringify(data));
  }

  getUserInStorage() {
    const user = window.localStorage.getItem(USER_STORAGE);
    if (user && isString(user)) {
      return JSON.parse(user);
    }

    return null;
  }

  clearUser() {
    window.localStorage.removeItem(USER_STORAGE);
    window.location.reload();
  }
}

export default new AuthService();
