import { Component } from 'react';
import './TabChange.css';
import { Tabs } from 'antd';

const items = [
  {
    key: '1',
    label: 'Seacrh',
  },
  {
    key: '2',
    label: 'Rated',
  },
];

export default class TabChange extends Component {
  onChange = (key) => {
    const { tabCHange } = this.props;
    tabCHange(key);
  };

  render() {
    return (
      <div className="TabChange">
        <Tabs defaultActiveKey={1} items={items} onChange={this.onChange} />
      </div>
    );
  }
}
