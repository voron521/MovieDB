import './Onerror.css';
import { Alert, Space } from 'antd';
// eslint-disable-next-line no-unused-vars
import React from 'react';

function Onerror() {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Alert
        message="Что-то пошло не так"
        description="Загрузка с сервера не удалась"
        type="warning"
        showIcon
        closable
      />
    </Space>
  );
}

export default Onerror;
