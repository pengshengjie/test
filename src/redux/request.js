import axios from "axios";
import { openNotificationWithIcon } from "@components/help";
import store from "@redux/store";

const instance = axios.create({
    // baseURL: store ? store.getState().Auth.domain : "",
    headers: {
        "Content-Type": "application/json",
    },
});

axios.interceptors.request.use = instance.interceptors.request.use;
axios.interceptors.response.use = instance.interceptors.response.use;
instance.interceptors.request.use(
    (config) => {
        // const sessionToken = store.getState().Auth.meta;
        const sessionToken = store.getState().Auth.meta;
        if (sessionToken) {
            // eslint-disable-next-line
            config.headers["Authorization"] = `Bearer ${sessionToken}`;
            config.baseURL =
                process.env.NODE_ENV === "development"
                    ? "https://api-dev.fintechautomation.com"
                    : store.getState().Auth.domain;
        }
        return config;
    },
    (err) => {
        console.error("interceptor error print", err.response.status);
        return Promise.reject(err);
    }
);

instance.interceptors.response.use(
    (response) => {
        if (response.status < 300) {
            response = response.data;
        } else {
            openNotificationWithIcon("error", response.data.errorMessage);
        }
        return response;
    },
    (err) => {
        openNotificationWithIcon("error", err.response);

        return Promise.reject(err);
    }
);

export default {
    async get(url, params, responseType) {
        return instance.get(url, { params: params });
    },
    async post(url, body, params) {
        return instance.post(url, body, { params: params });
    },
    async patch(url, body, params) {
        return instance.patch(url, body, { params: params });
    },
    async put(url, body, params) {
        return instance.put(url, body, { params: params });
    },
    async delete(url, params) {
        return instance.delete(url, { params: params });
    },
};
