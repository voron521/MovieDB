import { Component } from 'react';

import './Onerror.css';
import { Alert, Space } from 'antd';

export default class Onerror extends Component {
  render() {
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
}
