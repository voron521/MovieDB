import { Component } from 'react';
import './SearchForm.css';

export default class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = { label: '' };
    this.debouncedOnChange = this.Debounce(this.onLableChange, 400);
  }

  onSubmit(event) {
    event.preventDefault();
  }

  Debounce = (fn, debounceTime) => {
    let timeout;
    return (value) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        fn(value);
      }, debounceTime);
    };
  };

  onLableChange = (value) => {
    const { TakeSeachName } = this.props
    console.log('Input changed:', value);
    this.setState({ label: value }, () => {
      console.log('State updated:', this.state.label);
      TakeSeachName(this.state.label)

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
      <form onSubmit={this.onSubmit} className="input-form">
        <input
          className="input-search"
          placeholder="Type to search"
          onChange={this.handleInputChange}
          value={label}
        />
      </form>
    );
  }
}