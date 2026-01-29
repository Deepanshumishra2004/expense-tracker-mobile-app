import { getToken } from "../utils/token";
import { api } from "./client";

api.interceptors.request.use(async (config)=>{

    const token = await getToken();

    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})