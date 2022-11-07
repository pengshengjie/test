import axios from 'axios';
import notification from "antd/es/notification";

// axios.interceptors.response.use(null, error => {
//     const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;
//     if (expectedError) {
//         notification['error']({
//             message: 'Unexpected Error',
//             description: error.message
//         });
//     }
//
//     return Promise.reject(error)
// })

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};

export const jsforceResponse = (result, successMessage, openSuccess, openFailed, errorMessage) => {
    if (!result) {
        notification['error']({
            message: 'Error',
            description: 'Null'
        });
        return [];
    } else if (result.error || result.errorCode) {
        notification['error']({
            message: result.name,
            description: result.message
        });
        return [];
    } else if (result.message) {
        notification['error']({
            message: 'Connection Error',
            description: result.message
        });
        return [];

    } else {
        if (openSuccess) {
            notification['success']({
                message: successMessage,
                description: ''
            });
        }
        return result;
    }
}



