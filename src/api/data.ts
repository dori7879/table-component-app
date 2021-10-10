import axios, { AxiosResponse } from "axios";
import { IUser } from "../components/Table/interface";

export const usersAPI = {
  getUsers(): Promise<AxiosResponse<Array<IUser>>> {
    return axios.get("https://jsonplaceholder.typicode.com/users");
  },
  getUser(id: number) {
    return axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
  },
};
