import { Component } from 'react';
import './Isonline.css';
import { Alert, Space } from 'antd';

export default class Isonline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOnline: navigator.onLine,
    };
  }

  componentDidMount() {
    window.addEventListener('online', this.updateNetworkStatus);
    window.addEventListener('offline', this.updateNetworkStatus);
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.updateNetworkStatus);
    window.removeEventListener('offline', this.updateNetworkStatus);
  }

  updateNetworkStatus = () => {
    this.setState({ isOnline: navigator.onLine });
  };

  render() {
    const { isOnline } = this.state;
    return (
      <div className={`${isOnline ? 'hidden' : 'isonline'}`}>
        {isOnline ? null : (
          <Space direction="vertical" style={{ width: '100%', marginTop: '40%' }}>
            <Alert
              message="Что-то пошло не так"
              description="У вас нет подключение к интернету"
              type="warning"
              showIcon
              closable
            />
          </Space>
        )}
      </div>
    );
  }
}
