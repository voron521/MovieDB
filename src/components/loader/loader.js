import './loader.css';
import { Spin } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { LoadingOutlined } from '@ant-design/icons';

function Loader() {
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

export default Loader;
