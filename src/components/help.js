import React from 'react';
import notification from "antd/es/notification";

import _ from 'lodash'
import moment from "moment";

export const openNotificationWithIcon = (type, message, description) => {
    return notification[type]({
        message: message,
        description: description
    });
};

export const errorCheck = (data, module) => {

    let isError = false;
    if (!data.data) {
        isError = true;
        openNotificationWithIcon('info', module, 'API Return Null');
        return isError;
    } else if (_.get(data.data[0], 'errorCode') != null) {
        if (data.data[0].errorCode === 'API_Error') {
            isError = true;
            openNotificationWithIcon('info', module + ' API Error', data.data[0].message);
            return isError;
        } else if (data.data[0].errorCode === 'APEX_ERROR') {
            isError = true;
            openNotificationWithIcon('info', module + ' APEX ERROR', data.data[0].message);
            return isError;
        }
    } else if (data.data.length === 0) {
        isError = true;
        openNotificationWithIcon('info', module, 'No UMA Found');
        return isError;
    }
}

export const asOfDate = () => {
    return moment().format('MMM YYYY')
}
