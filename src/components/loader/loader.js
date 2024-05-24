import { Component } from 'react';

import './loader.css';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default class Loader extends Component {
  render() {
    return (
      <Spin
        style={{
          margin: '50%',
        }}
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 24,
            }}
            spin
          />
        }
      />
    );
  }
}
