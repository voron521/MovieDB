import { Component } from 'react';
import './SearchForm.css';

export default class SearchForm extends Component {
  static Debounce = (fn, debounceTime) => {
    let timeout;
    return (value) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        fn(value);
      }, debounceTime);
    };
  };

  constructor(props) {
    super(props);
    this.state = { label: '' };
    this.debouncedOnChange = SearchForm.Debounce(this.onLableChange, 400);
  }

  static onSubmit(event) {
    event.preventDefault();
  }

  onLableChange = (value) => {
    const { TakeSeachName } = this.props;
    const { label } = this.state;
    this.setState({ label: value }, () => {
      TakeSeachName(label);
    });
  };

  handleInputChange = (event) => {
    const { value } = event.target;
    this.setState({ label: value });
    this.debouncedOnChange(value);
  };

  render() {
    const { label } = this.state;
    return (
      <form onSubmit={SearchForm.onSubmit} className="input-form">
        <input className="input-search" placeholder="Type to search" onChange={this.handleInputChange} value={label} />
      </form>
    );
  }
}
