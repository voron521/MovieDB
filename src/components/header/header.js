import { Component } from 'react';

import './header.css';
import SearchForm from './SearchForm';
import TabChange from './TabChange';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabChangeNum: '1',
    };
  }

  componentDidUpdate(prevProps) {
    const { keyTabCHange } = this.props;
    if (prevProps.keyTabCHange !== keyTabCHange) {
      this.setState({
        tabChangeNum: keyTabCHange,
      });
    }
  }

  render() {
    const { TakeSeachName, tabCHange } = this.props;
    const { tabChangeNum } = this.state;
    return (
      <div className="header">
        <TabChange tabCHange={tabCHange} />
        {tabChangeNum === '1' ? <SearchForm TakeSeachName={TakeSeachName} /> : null}
      </div>
    );
  }
}
