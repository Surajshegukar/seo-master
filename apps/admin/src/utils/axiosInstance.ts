
import axios, {
  AxiosInstance,
} from "axios";
import 'dotenv/config';

const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/api2",
  withCredentials: true,
});

export default instance;