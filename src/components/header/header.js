import { Component } from 'react';

import './header.css';
import SearchForm from './SearchForm'


export default class Header extends Component {


  render() {
    const { TakeSeachName } = this.props
    return (
      <div className='header'>
        ШАПКА ПРИЛОЖУХИ
        <SearchForm TakeSeachName={TakeSeachName} />

      </div>
    );
  }
}
