import React from 'react';
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;

export const Spinner = () => (
    <Spin indicator={antIcon} className={'spin'}/>
)
